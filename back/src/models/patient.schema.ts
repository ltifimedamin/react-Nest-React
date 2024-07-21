import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Patient extends Document {
    @Prop({required:true})
    nom:string;
    @Prop({required:true})
    prenom:string;
    @Prop({ required: true, type: Date })
    ddn: Date;
    @Prop({required:true})
    genre:string;
    @Prop({required:true,unique:true})
    email:string;
    @Prop({required:true,unique:true})
    address:string;
    @Prop({required:true,unique:true})
    dmi:string;
    @Prop({required:true,unique:true})
    cin:string;
    @Prop({ required: true, type: Number, match: /^[0-9]{8}$/, message: 'The phone number must be exactly 8 digits long' })
    tel: number;
    @Prop({required:true,unique:true})
    securiteSociale:string;
    @Prop({required:true,unique:true})
    autre:string;
    @Prop({required:true,unique:true})
    nationalite:string;
 


}
export const PatientSchema =SchemaFactory.createForClass(Patient)