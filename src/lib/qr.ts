// QR version 10, error correction L, byte mode, mask 0.
export function qrMatrix(text: string): boolean[][] | null {
 const bytes = new TextEncoder().encode(text); if(bytes.length>271)return null;
 const bits: number[]=[]; const push=(n:number,count:number)=>{for(let i=count-1;i>=0;i--)bits.push((n>>>i)&1);};
 push(4,4);push(bytes.length,16);bytes.forEach(b=>push(b,8));push(0,Math.min(4,2192-bits.length));while(bits.length%8)bits.push(0);
 const data:number[]=[];for(let i=0;i<bits.length;i+=8)data.push(bits.slice(i,i+8).reduce((n,b)=>(n<<1)|b,0));for(let i=0;data.length<274;i++)data.push(i%2?17:236);
 const multiply=(a:number,b:number)=>{let n=0;for(let i=0;i<8;i++){if(b&1)n^=a;b>>>=1;a<<=1;if(a&256)a^=285;}return n;};
 let poly=[1];let root=1;for(let i=0;i<18;i++){const next=Array(poly.length+1).fill(0) as number[];poly.forEach((p,j)=>{next[j]^=p;next[j+1]^=multiply(p,root);});poly=next;root=multiply(root,2);}
 const blocks:number[][]=[];const corrections:number[][]=[];let offset=0;for(let i=0;i<4;i++){const n=i<2?68:69;const block=data.slice(offset,offset+n);offset+=n;blocks.push(block);const rem=[...block,...Array(18).fill(0)] as number[];for(let j=0;j<n;j++){const factor=rem[j];for(let k=0;k<poly.length;k++)rem[j+k]^=multiply(poly[k],factor);}corrections.push(rem.slice(n));}
 const codewords:number[]=[];for(let i=0;i<69;i++)for(const block of blocks)if(i<block.length)codewords.push(block[i]);for(let i=0;i<18;i++)for(const block of corrections)codewords.push(block[i]);
 const size=57;const matrix=Array.from({length:size},()=>Array<boolean>(size).fill(false));const reserved=Array.from({length:size},()=>Array<boolean>(size).fill(false));
 const set=(x:number,y:number,dark:boolean)=>{if(x>=0&&x<size&&y>=0&&y<size){matrix[y][x]=dark;reserved[y][x]=true;}};
 for(let i=0;i<size;i++){set(6,i,i%2===0);set(i,6,i%2===0);}
 for(const [cx,cy] of [[3,3],[size-4,3],[3,size-4]])for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const d=Math.max(Math.abs(dx),Math.abs(dy));set(cx+dx,cy+dy,d!==2&&d!==4);}
 for(const x of [6,28,50])for(const y of [6,28,50]){if((x===6&&y===6)||(x===6&&y===50)||(x===50&&y===6))continue;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(x+dx,y+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1);}
 let remainder=8;for(let i=0;i<10;i++)remainder=(remainder<<1)^((remainder>>>9)*0x537);const format=((8<<10)|remainder)^0x5412;const bit=(n:number,i:number)=>((n>>>i)&1)!==0;
 for(let i=0;i<=5;i++)set(8,i,bit(format,i));set(8,7,bit(format,6));set(8,8,bit(format,7));set(7,8,bit(format,8));for(let i=9;i<15;i++)set(14-i,8,bit(format,i));for(let i=0;i<8;i++)set(size-1-i,8,bit(format,i));for(let i=8;i<15;i++)set(8,size-15+i,bit(format,i));set(8,size-8,true);
 remainder=10;for(let i=0;i<12;i++)remainder=(remainder<<1)^((remainder>>>11)*0x1f25);const version=(10<<12)|remainder;for(let i=0;i<18;i++){const a=size-11+i%3;const b=Math.floor(i/3);set(a,b,bit(version,i));set(b,a,bit(version,i));}
 let index=0;for(let right=size-1;right>=1;right-=2){if(right===6)right=5;const upward=((right+1)&2)===0;for(let vertical=0;vertical<size;vertical++){const y=upward?size-1-vertical:vertical;for(let j=0;j<2;j++){const x=right-j;if(reserved[y][x])continue;const dark=index<codewords.length*8&&bit(codewords[index>>>3],7-(index&7));matrix[y][x]=dark!==((x+y)%2===0);index++;}}}
 return matrix;
}
export function qrSvg(matrix: boolean[][]): string { const size=matrix.length+8; const cells=matrix.flatMap((row,y)=>row.map((dark,x)=>dark?'<rect x="'+(x+4)+'" y="'+(y+4)+'" width="1" height="1"/>':'')).join('');return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" width="520" height="520"><rect width="'+size+'" height="'+size+'" fill="white"/><g fill="#202B25">'+cells+'</g></svg>'; }
