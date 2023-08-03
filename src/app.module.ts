import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PostModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ]
})
export class AppModule {}
