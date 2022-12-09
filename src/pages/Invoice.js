import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Invoice({data,totalPrice}) {
  
  return (
    <div>
      <table>
  <tr>
    <th>Name</th>
    <th>Sale Price</th>
    <th>Quantity</th>
    <th>Total Price</th>
  </tr>
  {data.map=(e)=>{
return  <tr>
<td>{//e. product_name
console.log(e)
}</td>
<td>{e.sale_price}</td>
<td>{e.purchase_quantity}</td>
<td>{e.totalPrice}</td>
</tr>
  }}
 
 
</table>
<p>Total Price:{totalPrice}</p>
    </div>
  )
}
