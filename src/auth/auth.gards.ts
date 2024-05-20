import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthGard  implements CanActivate{
    constructor (private  jwtService : JwtService){}

    async canActivate(data : ExecutionContext) : Promise<boolean>{
        const REQUEST = data.switchToHttp().getRequest();
        const Token = this.extractTokenFromHeader(REQUEST);

        // console.log('Token', Token);
        
        if(!Token) throw new UnauthorizedException();
  try {
      const Payload =await this.jwtService.verifyAsync(Token , { secret : process.env.JWT_SECRET_KEY});
      //  console.log('Payload',Payload); 
      REQUEST.user =Payload;
  } catch(error) {
    // console.log('error',error);
    
    throw new UnauthorizedException();
  }
        
  return true;
    }
    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}
