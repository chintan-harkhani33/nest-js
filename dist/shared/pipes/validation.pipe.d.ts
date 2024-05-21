import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
interface ParseDateOptions {
    fromTimestamp?: boolean;
    fromDate?: string;
}
export declare class AVCVALIDATEIn implements PipeTransform {
    private fromTimestamp;
    private fromDate;
    constructor(options: ParseDateOptions);
    transform(value: string | number, metadata: ArgumentMetadata): string | number | Date;
    private converTime;
}
export {};
