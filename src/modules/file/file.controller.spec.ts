import { Test, TestingModule } from "@nestjs/testing";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

describe("FileController", () => {
  let controller: FileController;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: {
            getFile: jest.fn((filename: string) => {
              return "Method not implemented.";
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
    fileService = module.get<FileService>(FileService);
  });

  it('should return "Method not implemented." for getFile method', () => {
    const filename = "example.txt";
    expect(controller.getFile(filename)).toBe("Method not implemented.");
  });
});
