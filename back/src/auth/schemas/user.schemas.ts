import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    // @Prop({required:true})
    // name:string;
    @Prop({required:true,unique:true})
    email:string;
    @Prop({required:true})
    password:string;
    @Prop({required:true})
    nom:string;
    @Prop({required:true})
    prenom:string;
    @Prop({required:true})
    role:string;
    @Prop({ required: true, type: Number, match: /^[0-9]{8}$/, message: 'The phone number must be exactly 8 digits long' })
    tel: number;
    @Prop({ required: true, type: Date })
    ddn: Date;
    @Prop({required:true})
    genre:string;
    @Prop({required:true})
    image:string;
    @Prop({required:true})
    address:string;
   


}
export const UserSchema =SchemaFactory.createForClass(User)