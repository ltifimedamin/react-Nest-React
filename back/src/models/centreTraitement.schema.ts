import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CentreTraitement extends Document {
    @Prop({required:true})
    nom:string;
    @Prop({required:true})
    localisation:string;
    @Prop({required:true,unique:true})
    email:string;
    @Prop({required:true})
    numTel:string;
}
export const CentreTraitementSchema =SchemaFactory.createForClass(CentreTraitement)