import { createParamDecorator } from "@nestjs/common";
import { Users } from "./user.entity";

export const GetUser = createParamDecorator((data, req): Users => {
    return req.user;
})