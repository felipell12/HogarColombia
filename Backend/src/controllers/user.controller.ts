// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {authenticate, TokenService} from '@loopback/authentication';
import {
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
  SchemaObject
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Credentials, User} from '../models';
import {UserRepository} from '../repositories';
import {UserProfileSchema} from './specs/user-controller.specs';
import fetch from 'cross-fetch';
import IsEmail from 'isemail';
import { promises } from 'dns';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 2,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  urlMensajeria: string = 'http://127.0.0.1:5000'

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};

  }
  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, 'password'),
    );

    await this.userRepository.userCredentials(savedUser.id).create({password});

    let destino = savedUser.email.toString();
    let asunto = "Registro Hogar Colombia MinTic";
    let contenido = `Hola, su registro a Hogar Colombia ha sido exitoso. Su nombre de usuario es: ${destino} y su contraseña es ${newUserRequest.password}.`;

    // Notificación al usuario, consumo del servicio de sypder (python)
    fetch(`${this.urlMensajeria}/envio-correo?correo_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
    .then((data:any) => {
    console.log(data)
    })
  
    return savedUser;
  }

  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @authenticate.skip()
  @get('/usersAll/')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: false}),
        },
      },
    },
  }) 
  async findAll(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
      return this.userRepository.find(filter);
  }


@get('/users/')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: false}),
        },
      },
    },
  }) 
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<boolean> {
    let email = (await this.userRepository.findOne(filter))?.email;
    if (email != null) {
      return true;
    }else{
      return false;
    }
  }



  @authenticate.skip()
  @get('/users/email')
  @response(200, {
    description: 'User model instances',
    content: {
      'application/json': {
        schema: {
          'x-ts-type': User,
        },
      },
    },
  }) 
  async findByEmail(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User | null> {
    return this.userRepository.findOne(filter);
  }

  @patch('/user/{id}')
  @response(204, {
    description: 'user PATCH success',
  })
  // @authenticate('jwkt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: NewUserRequest,
  ): Promise<User | void> {
    const password = await hash(user.password, await genSalt());
    const savedUser = await this.userRepository.updateById(id,_.omit(user,"password"));
    if (user.password != null || user.password != ""){
      await this.userRepository.userCredentials(user.id).patch({password});

      let destino = user.email;
      let asunto = "Cambio de Contraseña en Colombia MinTic";
      let contenido = `Hola, el cambio de contraseña ha sido exitoso. Su nueva contraseña es ${user.password}.`;

      // Notificación al usuario, consumo del servicio de sypder (python)
      fetch(`${this.urlMensajeria}/envio-correo?correo_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data:any) => {
      console.log(data)
      })
    }

    return savedUser;
  }
}