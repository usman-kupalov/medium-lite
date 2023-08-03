export class BadRequestException extends Error {
  type: string;

  constructor(message?: string) {
    super();
    this.type = 'form';
    this.message = message ?? 'Bad request';
  }
}

export class NotFoundException extends Error {
  type: string;

  constructor() {
    super();
    this.type = 'simple';
    this.message = 'Not found';
  }
}

export class ForBiddenException extends Error {
  type: string;

  constructor() {
    super();
    this.type = 'simple';
    this.message = 'Forbidden';
  }
}

export class UnauthorizedException extends Error {
  type: string;

  constructor() {
    super();
    this.type = 'simple';
    this.message = 'Unauthorized';
  }
}

export class InternalServerException extends Error {
  type: string;

  constructor() {
    super();
    this.type = 'simple';
    this.message = 'Internal Server error';
  }
}