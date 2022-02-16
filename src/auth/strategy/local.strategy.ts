import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<any> {
        
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new HttpException('Invalid Credentials', HttpStatus.NOT_FOUND);
        }
        return user; // what we return here will be available in request object as (req.user).
    }
}