import {request} from "./request"
export function _goodDetail(id){
    return request({
        url:'/api/public/v1/goods/detail',
        data:{
            goods_id:id
        }
    })
}

export class Good{
    constructor(id,name,pic,price,num,selected=true){
        this.goods_id=id;
        this.name=name;
        this.pc=pic;
        this.price=price;
        this.num=num;
        this.selected=selected;
    }
}