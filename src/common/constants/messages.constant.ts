export const MESSAGES = {
  AUTH: {
    COMMON: {
      CURRENT_PASSWORD: {
        REQURIED: "현재 비밀번호를 입력해 주세요.",
        NOT_MACHTED_WITH_PASSWORD: "현재 비밀번호와 기존 비밀번호가 일치하지 않습니다.",
      },
      NEW_PASSWORD: {
        REQURIED: "새로운 비밀번호를 입력해 주세요.",
        NEW_PASSWORD_EQUAL_CURRENT_PASSWORD: "현재 비밀번호와 새로운 비밀번호는 같을 수 없습니다.",
      },
      UNAUTHORIZED: "인증 정보가 유효하지 않습니다.",
      JWT: {
        NO_TOKEN: "인증 정보가 없습니다.",
        NOT_SUPPORTED_TYPE: "지원하지 않는 인증 방식입니다.",
        EXPIRED: "인증 정보가 만료되었습니다.",
        NO_USER: "인증 정보와 일치하는 사용자가 없습니다.",
        INVALID: "인증 정보가 유효하지 않습니다.",
      },
    },
    SIGN_UP: {
      EMAIL: {
        DUPLICATED: "이메일이 이미 존재합니다.",
        FAIL: "메일 전송에 실패했습니다.",
        SUCCEED: "메일 전송에 성공했습니다.",
        VERIFICATION_CODE: {
          INCONSISTENT: "발송된 인증 코드와 다릅니다.",
          EXPIRED: "메일 인증이 만료되었습니다.",
          SUCCEED: "메일 인증이 완료되었습니다.",
        },
      },
      SUCCEED: "회원가입에 성공했습니다.",
    },
    SIGN_IN: {
      EMAIL: {
        NOT_FOUND: "이메일이 존재하지 않습니다.",
      },
      PASSWORD: {
        INCONSISTENT: "비밀번호가 일치하지 않습니다.",
      },
      SUCCEED: "로그인에 성공했습니다.",
    },
    SIGN_OUT: {
      SUCCEED: "로그 아웃에 성공했습니다.",
    },
    REISSUE_TOKEN: {
      SUCCEED: "토큰 재발급에 성공했습니다.",
    },
    PASSPORT: {
      COMMON: {
        FAIL: "로그인에 실패했습니다.",
      },
      NAVER: {
        SUCCEED: "네이버 로그인에 성공했습니다.",
      },
    },
  },
  USERS: {
    READ_ME: {
      SUCCEED: "내 정보 조회에 성공했습니다.",
    },
    UPDATE_ME: {
      EMAIL: {
        DUPLICATED: "이메일이 이미 존재합니다.",
      },
      PASSWORD: {
        CURRENT_PASSWORD_REQUIRED: "현재 비밀번호를 입력해 주세요.",
        CURRENT_PASSWORD_INCONSISTENT: "현재 비밀번호가 일치하지 않습니다.",
        NEW_PASSWORD_NOT_EQUAL_CURRENT_PASSWORD: "현재 비밀번호와 새로운 비밀번호는 같을 수 없습니다.",
      },
      SUCCEED: "내 정보 수정에 성공했습니다.",
    },
    COMMON: {
      NOT_FOUND: "유저가 존재하지 않습니다.",
    },
    POINT: {
      NOT_ENOUGH_POINT: "포인트가 충분하지 않습니다.",
    },
  },
  FILES: {
    CREATE: {
      UPLOAD_SUCCEED: "파일이 성공적으로 업로드되었습니다.",
    },
  },
  CARD: {
    NOT_CARD: {
      CARD_NOT_FOUND: "존재하지 않는 카드입니다.",
    },
  },
  NOT_INPUT: "값을 입력해주십시오",
  NOT_INPUT_STRING: "문자열을 입력해주세요",
  NOT_INPUT_NUMBER: "숫자를 입력해주세요",
  BOARD: {
    NOT_LIST_IN_COLOR: "존재하지 않는 색깔입니다",
  },
  CARD_COMMENTS: {},
  CARDS: {},
  FILE: {},
  LIST: {},
};
