import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_ate: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findUserByToken(token: string): Promise<UserToken | undefined> {
    const findUserToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return findUserToken;
  }
}

export default FakeUserTokensRepository;
