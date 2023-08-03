import { BadRequestException, ForBiddenException, InternalServerException, NotFoundException, UnauthorizedException } from './exceptions';

export const exceptions = {
  500: InternalServerException,
  404: NotFoundException,
  403: ForBiddenException,
  401: UnauthorizedException,
  400: BadRequestException
}