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
        this.goods_name=name;
        this.pic=pic;
        this.goods_price=price;
        this.num=num;
        this.selected=selected;
    }
}

/**商品搜索 */
export function _Search(keyword){
    return request({
        url:'/api/public/v1/goods/qsearch',
        data:{
            query:keyword
        }
    })
}