import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { GenerateBoardDto } from "./board.generate.dto";

export declare class ModifyBoardDto extends PickType(GenerateBoardDto, [
  "title",
  "content",
  "color",
] as const) {}
