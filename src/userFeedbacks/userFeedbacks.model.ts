// import { Prisma } from '@prisma/client';
// import { Users } from 'src/users/users.model';

// export class UserFeedbacks implements Prisma.UserFeedbacksCreateInput {
//   // check UserFeedbacksCreateInput
//   id: number;
//   targetUserId: number;
//   sourceUserId: number;
//   type: string;
//   isActive: boolean;
//   targetUser?: Users;
//   sourceUser?: Users;
// }

export class UserFeedbacks {
  id: number;
  targetUserId: number;
  sourceUserId: number;
  type: string;
  isActive: boolean;
}
