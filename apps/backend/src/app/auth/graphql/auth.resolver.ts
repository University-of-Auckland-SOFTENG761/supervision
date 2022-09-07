import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@supervision/auth/auth.service';
import { TokenModel } from '@supervision/auth/graphql/token.model';
import { AuthGuard, SupervisorGuard } from '@supervision/auth/guards';
import { CurrentUser } from '@supervision/shared';
import { UserEntity, UserModel, UserService } from '@supervision/users';
import { CreateUserDto } from '@supervision/users/graphql/dto/createUser.dto';

@Resolver(() => TokenModel)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenModel)
  async authorizationCodeGrant(
    @Args('code') code: string
  ): Promise<TokenModel> {
    const signInToken = await this.authService.authorizationCodeGrant(code);
    return {
      accessToken: signInToken.access_token,
      idToken: signInToken.id_token,
      expiresIn: signInToken.expires_in,
      tokenType: signInToken.token_type,
      refreshToken: signInToken.refresh_token,
    };
  }
}
