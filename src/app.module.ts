import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';
import { ArtistsModule } from './artists/artists.module';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import { CarpoolModule } from './carpool/carpool.module';

@Module({
  imports: [
    ProductsModule, 
    UsersModule,
    GenresModule,
    ArtistsModule,
    PostsModule,
    EventsModule,
    CarpoolModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, { useFindAndModify: false }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
