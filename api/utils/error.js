// 自定义错误类
export class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
    }
}

// 创建错误的便捷函数
export const createError = (statusCode, message) => {
    return new CustomError(statusCode, message);
};

// 常用错误类型
export const ErrorTypes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};
