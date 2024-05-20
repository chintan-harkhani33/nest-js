import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Optional,
} from '@nestjs/common';

interface ParseDateOptions{
    fromTimestamp?: boolean;
    fromDate?: string;
}
@Injectable()
export class AVCVALIDATEIn implements PipeTransform {
    private fromTimestamp: boolean;
    private fromDate: string;
    constructor(@Optional() options :ParseDateOptions){
         this.fromTimestamp = options?.fromTimestamp !== undefined ? options.fromTimestamp :true;
         this.fromDate = options?.fromDate || 'Invalid date';
    }
  transform(value: string | number, metadata: ArgumentMetadata) {
    const { data: isKeyGiven } = metadata;

    // console.log(isKeyGiven ,value);
    

    if (isKeyGiven) {
        value = value;
    }else{
        value = value['timestamp'];
    }
    const date = this.fromTimestamp
    ? this.converTime(value)
    : new Date(value);

    console.log(date);
    
    if (!date || isNaN(+date)){
        const errorMessage = isKeyGiven ? `${isKeyGiven} is valid date` : this.fromDate;

        throw new BadRequestException(errorMessage);
    }

  
  const { metatype } = metadata;

  switch (metatype) {
    case String:
      return date.toUTCString();

    case Date:
      return date;

    case Number:
      return date.getTime();

    default:
      return date.toISOString();
  }
}
    
    
    
  
  //   transform(value: any, metadata: ArgumentMetadata) {
  //     console.log("hiii" , value);

  //     return value;

  private converTime(timestamp: string | number) {
    timestamp = +timestamp;

    const Issecounds = !(timestamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);

    return Issecounds ? new Date(timestamp * 1000) : new Date(timestamp);
  }
}


// @Injectable()
