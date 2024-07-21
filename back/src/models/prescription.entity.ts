import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Prescription extends Document {
    @Prop({ required: true, type: String })
    technique: String;
    @Prop({ required: true, type: String })
    remarque: String;
    @Prop({ required: true, type: String })
    doseSeance: String;
    @Prop({ required: true, type: String })
    volume: String;
    @Prop({ required: true, type: String })
    doseTotale: String;
    @Prop({ required: true, type: Boolean })
    etat: Boolean;
    @Prop({ required: true, type: Date })
    date: Date;
}
export const MachineSchema =SchemaFactory.createForClass(Prescription)