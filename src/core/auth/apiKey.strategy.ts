import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IApiKeyAuth } from '@waha/core/auth/auth';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private auth: IApiKeyAuth) {
    super({ header: 'X-Api-Key', prefix: '' }, true, (apikey, done) => {
      const isValid = this.auth.isValid(apikey);
      // FIX: Use correct passport callback signature
      return done(null, isValid ? apikey : false);
    });
  }

  validate(apikey: string, done: (error: any, user?: any) => void): void {
    const isValid = this.auth.isValid(apikey);
    // FIX: Use correct passport callback signature
    return done(null, isValid ? apikey : false);
  }
}
