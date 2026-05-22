import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IReqUser } from 'src/commons/interfaces/req';

@Controller('msg')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: IReqUser) {
    return this.messengerService.findAllByUser(req.user.id);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() data: CreateMessengerDto, @Req() req: IReqUser) {
    return this.messengerService.create(data, req.user.id);
  }
}
