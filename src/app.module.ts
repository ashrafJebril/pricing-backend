/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './price/price.module';
import { DatabaseModule } from './database.module';
import { UploadModule } from './upload/upload.module'; // Import the UploadModule

@Module({
  imports: [
    PriceModule,
    DatabaseModule,
    UploadModule, // Add UploadModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
