import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@supervision/auth/auth.service';
import { TokenModel } from '@supervision/auth/graphql/token.model';

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
