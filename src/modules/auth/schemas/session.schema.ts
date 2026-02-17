import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: true, collection: 'sessions' })
export class Session {
  @Prop({ required: true })
  documentNumber!: string;

  @Prop({ required: true })
  accessToken!: string;

  @Prop()
  refreshToken?: string;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop()
  userAgent?: string;

  @Prop()
  ipAddress?: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

// TTL index to auto-delete expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
