import { Request, Response } from "express";
import userService from '../../../services/auth/user';
import token from '../../../services/auth/token';

export const login = async (request: Request, response: Response) => {
  
  const {
    username,
    password 
  } = request.body

  const result = await userService.findByName(username);
    
  if(result){
    const user = {
      username:username,
      password:password
    }

    if (username === user.username && password === user.password) {
      
      // Create JWT and send it to user
      const jwt = token.sign(user.username)

      if (jwt) {
        return response.status(200).json({
          userName: user.username,
          token:jwt
        });
        
      } else {
        return response.status(500).json({msg:"Internal server error"});
      }
      
    }
  }

  return response.status(422).json({msg:"Invalid username or password"});
};

export const guest = (request: Request, response: Response) => {
  return response.status(200).json({msg:"Guest success"});
};

export const auth = (request: Request, response: Response) => {
  return response.status(200).json({msg:"Auth success"});
}