import { UpdateMemberInfoDto } from "./member.update.dto";

import { PickType } from "@nestjs/mapped-types";

export class UpdateMembernicknameDto extends PickType(UpdateMemberInfoDto, [
  "targetUserId",
  "nickname",
]) {}
