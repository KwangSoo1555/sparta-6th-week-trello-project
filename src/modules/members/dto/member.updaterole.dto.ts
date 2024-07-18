import { UpdateMemberInfoDto } from "./member.update.dto";

import { PickType } from "@nestjs/mapped-types";

export class UpdateMemberRoleDto extends PickType(UpdateMemberInfoDto, [
  "targetUserId",
  "memberRole",
]) {}
