(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();function o0(i){return new Promise((t,e)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>e(new Error(`掩膜图加载失败: ${i}`)),n.src=i})}async function l0(i,t,{gamma:e=1.35,floor:n=.04}={}){const r=await o0(i),a=r.naturalWidth,s=r.naturalHeight,l=document.createElement("canvas");l.width=a,l.height=s;const o=l.getContext("2d",{willReadFrequently:!0});o.drawImage(r,0,0);const c=o.getImageData(0,0,a,s).data,h=a*s,p=new Float32Array(h);let d=0;for(let u=0;u<h;u++){let f=c[u*4]/255;f=f<n?0:Math.pow((f-n)/(1-n),e),d+=f,p[u]=d}const m=new Float32Array(t*2),_=new Float32Array(t),w=a/s;for(let u=0;u<t;u++){const f=Math.random()*d;let E=0,M=h-1;for(;E<M;){const b=E+M>>1;p[b]<f?E=b+1:M=b}const S=E,O=S%a,C=S/a|0;m[u*2]=O/a-.5,m[u*2+1]=.5-C/s,_[u]=c[S*4]/255}return{pts:m,bright:_,aspect:w}}async function c0(i,t,e){const n=[];for(const r of i)n.push(await l0(r,t,e));return n}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const os="169",f0=0,vs=1,u0=2,Eo=1,h0=2,Ke=3,_n=0,_e=1,Ze=2,mn=0,ii=1,vr=2,ys=3,Ms=4,d0=5,Pn=100,p0=101,m0=102,g0=103,_0=104,x0=200,v0=201,y0=202,M0=203,ha=204,da=205,w0=206,S0=207,E0=208,T0=209,b0=210,A0=211,R0=212,C0=213,P0=214,pa=0,ma=1,ga=2,oi=3,_a=4,xa=5,va=6,ya=7,To=0,L0=1,D0=2,gn=0,I0=1,U0=2,N0=3,F0=4,O0=5,B0=6,z0=7,bo=300,li=301,ci=302,Ma=303,wa=304,Tr=306,Sa=1e3,Dn=1001,Ea=1002,Re=1003,H0=1004,Bi=1005,Ue=1006,Ir=1007,In=1008,en=1009,Ao=1010,Ro=1011,Pi=1012,ls=1013,Nn=1014,Je=1015,Li=1016,cs=1017,fs=1018,fi=1020,Co=35902,Po=1021,Lo=1022,Fe=1023,Do=1024,Io=1025,ri=1026,ui=1027,Uo=1028,us=1029,No=1030,hs=1031,ds=1033,ur=33776,hr=33777,dr=33778,pr=33779,Ta=35840,ba=35841,Aa=35842,Ra=35843,Ca=36196,Pa=37492,La=37496,Da=37808,Ia=37809,Ua=37810,Na=37811,Fa=37812,Oa=37813,Ba=37814,za=37815,Ha=37816,Ga=37817,Va=37818,ka=37819,Wa=37820,Xa=37821,mr=36492,qa=36494,Ya=36495,Fo=36283,$a=36284,Ka=36285,Za=36286,G0=3200,V0=3201,k0=0,W0=1,dn="",ze="srgb",xn="srgb-linear",ps="display-p3",br="display-p3-linear",yr="linear",Qt="srgb",Mr="rec709",wr="p3",Hn=7680,ws=519,X0=512,q0=513,Y0=514,Oo=515,$0=516,K0=517,Z0=518,j0=519,Ss=35044,Es="300 es",Qe=2e3,Sr=2001;class di{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,t);t.target=null}}}const ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ur=Math.PI/180,ja=180/Math.PI;function Di(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ue[i&255]+ue[i>>8&255]+ue[i>>16&255]+ue[i>>24&255]+"-"+ue[t&255]+ue[t>>8&255]+"-"+ue[t>>16&15|64]+ue[t>>24&255]+"-"+ue[e&63|128]+ue[e>>8&255]+"-"+ue[e>>16&255]+ue[e>>24&255]+ue[n&255]+ue[n>>8&255]+ue[n>>16&255]+ue[n>>24&255]).toLowerCase()}function ge(i,t,e){return Math.max(t,Math.min(e,i))}function J0(i,t){return(i%t+t)%t}function Nr(i,t,e){return(1-e)*i+e*t}function Mi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Kt{constructor(t=0,e=0){Kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),a=this.x-t.x,s=this.y-t.y;return this.x=a*n-s*r+t.x,this.y=a*r+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,r,a,s,l,o,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,s,l,o,c)}set(t,e,n,r,a,s,l,o,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=l,h[3]=e,h[4]=a,h[5]=o,h[6]=n,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,s=n[0],l=n[3],o=n[6],c=n[1],h=n[4],p=n[7],d=n[2],m=n[5],_=n[8],w=r[0],u=r[3],f=r[6],E=r[1],M=r[4],S=r[7],O=r[2],C=r[5],b=r[8];return a[0]=s*w+l*E+o*O,a[3]=s*u+l*M+o*C,a[6]=s*f+l*S+o*b,a[1]=c*w+h*E+p*O,a[4]=c*u+h*M+p*C,a[7]=c*f+h*S+p*b,a[2]=d*w+m*E+_*O,a[5]=d*u+m*M+_*C,a[8]=d*f+m*S+_*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],s=t[4],l=t[5],o=t[6],c=t[7],h=t[8];return e*s*h-e*l*c-n*a*h+n*l*o+r*a*c-r*s*o}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],s=t[4],l=t[5],o=t[6],c=t[7],h=t[8],p=h*s-l*c,d=l*o-h*a,m=c*a-s*o,_=e*p+n*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/_;return t[0]=p*w,t[1]=(r*c-h*n)*w,t[2]=(l*n-r*s)*w,t[3]=d*w,t[4]=(h*e-r*o)*w,t[5]=(r*a-l*e)*w,t[6]=m*w,t[7]=(n*o-c*e)*w,t[8]=(s*e-n*a)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,a,s,l){const o=Math.cos(a),c=Math.sin(a);return this.set(n*o,n*c,-n*(o*s+c*l)+s+t,-r*c,r*o,-r*(-c*s+o*l)+l+e,0,0,1),this}scale(t,e){return this.premultiply(Fr.makeScale(t,e)),this}rotate(t){return this.premultiply(Fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fr=new Ot;function Bo(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Er(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Q0(){const i=Er("canvas");return i.style.display="block",i}const Ts={};function gr(i){i in Ts||(Ts[i]=!0,console.warn(i))}function tl(i,t,e){return new Promise(function(n,r){function a(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:n()}}setTimeout(a,e)})}function el(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function nl(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const bs=new Ot().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),As=new Ot().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),wi={[xn]:{transfer:yr,primaries:Mr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[ze]:{transfer:Qt,primaries:Mr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[br]:{transfer:yr,primaries:wr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(As),fromReference:i=>i.applyMatrix3(bs)},[ps]:{transfer:Qt,primaries:wr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(As),fromReference:i=>i.applyMatrix3(bs).convertLinearToSRGB()}},il=new Set([xn,br]),Yt={enabled:!0,_workingColorSpace:xn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!il.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=wi[t].toReference,r=wi[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return wi[i].primaries},getTransfer:function(i){return i===dn?yr:wi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(wi[t].luminanceCoefficients)}};function ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Or(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Gn;class rl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Gn===void 0&&(Gn=Er("canvas")),Gn.width=t.width,Gn.height=t.height;const n=Gn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Gn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Er("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=ai(a[s]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ai(e[n]/255)*255):e[n]=ai(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let al=0;class zo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:al++}),this.uuid=Di(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,l=r.length;s<l;s++)r[s].isDataTexture?a.push(Br(r[s].image)):a.push(Br(r[s]))}else a=Br(r);n.url=a}return e||(t.images[this.uuid]=n),n}}function Br(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sl=0;class xe extends di{constructor(t=xe.DEFAULT_IMAGE,e=xe.DEFAULT_MAPPING,n=Dn,r=Dn,a=Ue,s=In,l=Fe,o=en,c=xe.DEFAULT_ANISOTROPY,h=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sl++}),this.uuid=Di(),this.name="",this.source=new zo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Kt(0,0),this.repeat=new Kt(1,1),this.center=new Kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sa:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case Ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sa:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case Ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xe.DEFAULT_IMAGE=null;xe.DEFAULT_MAPPING=bo;xe.DEFAULT_ANISOTROPY=1;class ne{constructor(t=0,e=0,n=0,r=1){ne.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*e+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*e+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*e+s[7]*n+s[11]*r+s[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,a;const o=t.elements,c=o[0],h=o[4],p=o[8],d=o[1],m=o[5],_=o[9],w=o[2],u=o[6],f=o[10];if(Math.abs(h-d)<.01&&Math.abs(p-w)<.01&&Math.abs(_-u)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+w)<.1&&Math.abs(_+u)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,S=(m+1)/2,O=(f+1)/2,C=(h+d)/4,b=(p+w)/4,L=(_+u)/4;return M>S&&M>O?M<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(M),r=C/n,a=b/n):S>O?S<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),n=C/r,a=L/r):O<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(O),n=b/a,r=L/a),this.set(n,r,a,e),this}let E=Math.sqrt((u-_)*(u-_)+(p-w)*(p-w)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(u-_)/E,this.y=(p-w)/E,this.z=(d-h)/E,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ol extends di{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ue,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new xe(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let l=0;l<s;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new zo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends ol{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ho extends xe{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Re,this.minFilter=Re,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ll extends xe{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Re,this.minFilter=Re,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ii{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,a,s,l){let o=n[r+0],c=n[r+1],h=n[r+2],p=n[r+3];const d=a[s+0],m=a[s+1],_=a[s+2],w=a[s+3];if(l===0){t[e+0]=o,t[e+1]=c,t[e+2]=h,t[e+3]=p;return}if(l===1){t[e+0]=d,t[e+1]=m,t[e+2]=_,t[e+3]=w;return}if(p!==w||o!==d||c!==m||h!==_){let u=1-l;const f=o*d+c*m+h*_+p*w,E=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const O=Math.sqrt(M),C=Math.atan2(O,f*E);u=Math.sin(u*C)/O,l=Math.sin(l*C)/O}const S=l*E;if(o=o*u+d*S,c=c*u+m*S,h=h*u+_*S,p=p*u+w*S,u===1-l){const O=1/Math.sqrt(o*o+c*c+h*h+p*p);o*=O,c*=O,h*=O,p*=O}}t[e]=o,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,r,a,s){const l=n[r],o=n[r+1],c=n[r+2],h=n[r+3],p=a[s],d=a[s+1],m=a[s+2],_=a[s+3];return t[e]=l*_+h*p+o*m-c*d,t[e+1]=o*_+h*d+c*p-l*m,t[e+2]=c*_+h*m+l*d-o*p,t[e+3]=h*_-l*p-o*d-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,a=t._z,s=t._order,l=Math.cos,o=Math.sin,c=l(n/2),h=l(r/2),p=l(a/2),d=o(n/2),m=o(r/2),_=o(a/2);switch(s){case"XYZ":this._x=d*h*p+c*m*_,this._y=c*m*p-d*h*_,this._z=c*h*_+d*m*p,this._w=c*h*p-d*m*_;break;case"YXZ":this._x=d*h*p+c*m*_,this._y=c*m*p-d*h*_,this._z=c*h*_-d*m*p,this._w=c*h*p+d*m*_;break;case"ZXY":this._x=d*h*p-c*m*_,this._y=c*m*p+d*h*_,this._z=c*h*_+d*m*p,this._w=c*h*p-d*m*_;break;case"ZYX":this._x=d*h*p-c*m*_,this._y=c*m*p+d*h*_,this._z=c*h*_-d*m*p,this._w=c*h*p+d*m*_;break;case"YZX":this._x=d*h*p+c*m*_,this._y=c*m*p+d*h*_,this._z=c*h*_-d*m*p,this._w=c*h*p-d*m*_;break;case"XZY":this._x=d*h*p-c*m*_,this._y=c*m*p-d*h*_,this._z=c*h*_+d*m*p,this._w=c*h*p+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],a=e[8],s=e[1],l=e[5],o=e[9],c=e[2],h=e[6],p=e[10],d=n+l+p;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-o)*m,this._y=(a-c)*m,this._z=(s-r)*m}else if(n>l&&n>p){const m=2*Math.sqrt(1+n-l-p);this._w=(h-o)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(a+c)/m}else if(l>p){const m=2*Math.sqrt(1+l-n-p);this._w=(a-c)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(o+h)/m}else{const m=2*Math.sqrt(1+p-n-l);this._w=(s-r)/m,this._x=(a+c)/m,this._y=(o+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,a=t._z,s=t._w,l=e._x,o=e._y,c=e._z,h=e._w;return this._x=n*h+s*l+r*c-a*o,this._y=r*h+s*o+a*l-n*c,this._z=a*h+s*c+n*o-r*l,this._w=s*h-n*l-r*o-a*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,a=this._z,s=this._w;let l=s*t._w+n*t._x+r*t._y+a*t._z;if(l<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,l=-l):this.copy(t),l>=1)return this._w=s,this._x=n,this._y=r,this._z=a,this;const o=1-l*l;if(o<=Number.EPSILON){const m=1-e;return this._w=m*s+e*this._w,this._x=m*n+e*this._x,this._y=m*r+e*this._y,this._z=m*a+e*this._z,this.normalize(),this}const c=Math.sqrt(o),h=Math.atan2(c,l),p=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=s*p+this._w*d,this._x=n*p+this._x*d,this._y=r*p+this._y*d,this._z=a*p+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(t=0,e=0,n=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rs.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rs.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*r,this.y=a[1]*e+a[4]*n+a[7]*r,this.z=a[2]*e+a[5]*n+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=t.elements,s=1/(a[3]*e+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*e+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*e+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,a=t.x,s=t.y,l=t.z,o=t.w,c=2*(s*r-l*n),h=2*(l*e-a*r),p=2*(a*n-s*e);return this.x=e+o*c+s*p-l*h,this.y=n+o*h+l*c-a*p,this.z=r+o*p+a*h-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r,this.y=a[1]*e+a[5]*n+a[9]*r,this.z=a[2]*e+a[6]*n+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,a=t.z,s=e.x,l=e.y,o=e.z;return this.x=r*o-a*l,this.y=a*s-n*o,this.z=n*l-r*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zr.copy(this).projectOnVector(t),this.sub(zr)}reflect(t){return this.sub(zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zr=new H,Rs=new Ii;class Ui{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Le.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Le.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Le.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let s=0,l=a.count;s<l;s++)t.isMesh===!0?t.getVertexPosition(s,Le):Le.fromBufferAttribute(a,s),Le.applyMatrix4(t.matrixWorld),this.expandByPoint(Le);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zi.copy(n.boundingBox)),zi.applyMatrix4(t.matrixWorld),this.union(zi)}const r=t.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Le),Le.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Si),Hi.subVectors(this.max,Si),Vn.subVectors(t.a,Si),kn.subVectors(t.b,Si),Wn.subVectors(t.c,Si),sn.subVectors(kn,Vn),on.subVectors(Wn,kn),Mn.subVectors(Vn,Wn);let e=[0,-sn.z,sn.y,0,-on.z,on.y,0,-Mn.z,Mn.y,sn.z,0,-sn.x,on.z,0,-on.x,Mn.z,0,-Mn.x,-sn.y,sn.x,0,-on.y,on.x,0,-Mn.y,Mn.x,0];return!Hr(e,Vn,kn,Wn,Hi)||(e=[1,0,0,0,1,0,0,0,1],!Hr(e,Vn,kn,Wn,Hi))?!1:(Gi.crossVectors(sn,on),e=[Gi.x,Gi.y,Gi.z],Hr(e,Vn,kn,Wn,Hi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Le).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Le).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(We[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),We[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),We[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),We[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),We[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),We[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),We[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),We[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(We),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const We=[new H,new H,new H,new H,new H,new H,new H,new H],Le=new H,zi=new Ui,Vn=new H,kn=new H,Wn=new H,sn=new H,on=new H,Mn=new H,Si=new H,Hi=new H,Gi=new H,wn=new H;function Hr(i,t,e,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){wn.fromArray(i,a);const l=r.x*Math.abs(wn.x)+r.y*Math.abs(wn.y)+r.z*Math.abs(wn.z),o=t.dot(wn),c=e.dot(wn),h=n.dot(wn);if(Math.max(-Math.max(o,c,h),Math.min(o,c,h))>l)return!1}return!0}const cl=new Ui,Ei=new H,Gr=new H;class Ar{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):cl.setFromPoints(t).getCenter(n);let r=0;for(let a=0,s=t.length;a<s;a++)r=Math.max(r,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ei.subVectors(t,this.center);const e=Ei.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Ei,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ei.copy(t.center).add(Gr)),this.expandByPoint(Ei.copy(t.center).sub(Gr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Xe=new H,Vr=new H,Vi=new H,ln=new H,kr=new H,ki=new H,Wr=new H;class Go{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xe)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Xe.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Xe.copy(this.origin).addScaledVector(this.direction,e),Xe.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Vr.copy(t).add(e).multiplyScalar(.5),Vi.copy(e).sub(t).normalize(),ln.copy(this.origin).sub(Vr);const a=t.distanceTo(e)*.5,s=-this.direction.dot(Vi),l=ln.dot(this.direction),o=-ln.dot(Vi),c=ln.lengthSq(),h=Math.abs(1-s*s);let p,d,m,_;if(h>0)if(p=s*o-l,d=s*l-o,_=a*h,p>=0)if(d>=-_)if(d<=_){const w=1/h;p*=w,d*=w,m=p*(p+s*d+2*l)+d*(s*p+d+2*o)+c}else d=a,p=Math.max(0,-(s*d+l)),m=-p*p+d*(d+2*o)+c;else d=-a,p=Math.max(0,-(s*d+l)),m=-p*p+d*(d+2*o)+c;else d<=-_?(p=Math.max(0,-(-s*a+l)),d=p>0?-a:Math.min(Math.max(-a,-o),a),m=-p*p+d*(d+2*o)+c):d<=_?(p=0,d=Math.min(Math.max(-a,-o),a),m=d*(d+2*o)+c):(p=Math.max(0,-(s*a+l)),d=p>0?a:Math.min(Math.max(-a,-o),a),m=-p*p+d*(d+2*o)+c);else d=s>0?-a:a,p=Math.max(0,-(s*d+l)),m=-p*p+d*(d+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Vr).addScaledVector(Vi,d),m}intersectSphere(t,e){Xe.subVectors(t.center,this.origin);const n=Xe.dot(this.direction),r=Xe.dot(Xe)-n*n,a=t.radius*t.radius;if(r>a)return null;const s=Math.sqrt(a-r),l=n-s,o=n+s;return o<0?null:l<0?this.at(o,e):this.at(l,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,a,s,l,o;const c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),h>=0?(a=(t.min.y-d.y)*h,s=(t.max.y-d.y)*h):(a=(t.max.y-d.y)*h,s=(t.min.y-d.y)*h),n>s||a>r||((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),p>=0?(l=(t.min.z-d.z)*p,o=(t.max.z-d.z)*p):(l=(t.max.z-d.z)*p,o=(t.min.z-d.z)*p),n>o||l>r)||((l>n||n!==n)&&(n=l),(o<r||r!==r)&&(r=o),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Xe)!==null}intersectTriangle(t,e,n,r,a){kr.subVectors(e,t),ki.subVectors(n,t),Wr.crossVectors(kr,ki);let s=this.direction.dot(Wr),l;if(s>0){if(r)return null;l=1}else if(s<0)l=-1,s=-s;else return null;ln.subVectors(this.origin,t);const o=l*this.direction.dot(ki.crossVectors(ln,ki));if(o<0)return null;const c=l*this.direction.dot(kr.cross(ln));if(c<0||o+c>s)return null;const h=-l*ln.dot(Wr);return h<0?null:this.at(h/s,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,r,a,s,l,o,c,h,p,d,m,_,w,u){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,s,l,o,c,h,p,d,m,_,w,u)}set(t,e,n,r,a,s,l,o,c,h,p,d,m,_,w,u){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=r,f[1]=a,f[5]=s,f[9]=l,f[13]=o,f[2]=c,f[6]=h,f[10]=p,f[14]=d,f[3]=m,f[7]=_,f[11]=w,f[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Xn.setFromMatrixColumn(t,0).length(),a=1/Xn.setFromMatrixColumn(t,1).length(),s=1/Xn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,a=t.z,s=Math.cos(n),l=Math.sin(n),o=Math.cos(r),c=Math.sin(r),h=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){const d=s*h,m=s*p,_=l*h,w=l*p;e[0]=o*h,e[4]=-o*p,e[8]=c,e[1]=m+_*c,e[5]=d-w*c,e[9]=-l*o,e[2]=w-d*c,e[6]=_+m*c,e[10]=s*o}else if(t.order==="YXZ"){const d=o*h,m=o*p,_=c*h,w=c*p;e[0]=d+w*l,e[4]=_*l-m,e[8]=s*c,e[1]=s*p,e[5]=s*h,e[9]=-l,e[2]=m*l-_,e[6]=w+d*l,e[10]=s*o}else if(t.order==="ZXY"){const d=o*h,m=o*p,_=c*h,w=c*p;e[0]=d-w*l,e[4]=-s*p,e[8]=_+m*l,e[1]=m+_*l,e[5]=s*h,e[9]=w-d*l,e[2]=-s*c,e[6]=l,e[10]=s*o}else if(t.order==="ZYX"){const d=s*h,m=s*p,_=l*h,w=l*p;e[0]=o*h,e[4]=_*c-m,e[8]=d*c+w,e[1]=o*p,e[5]=w*c+d,e[9]=m*c-_,e[2]=-c,e[6]=l*o,e[10]=s*o}else if(t.order==="YZX"){const d=s*o,m=s*c,_=l*o,w=l*c;e[0]=o*h,e[4]=w-d*p,e[8]=_*p+m,e[1]=p,e[5]=s*h,e[9]=-l*h,e[2]=-c*h,e[6]=m*p+_,e[10]=d-w*p}else if(t.order==="XZY"){const d=s*o,m=s*c,_=l*o,w=l*c;e[0]=o*h,e[4]=-p,e[8]=c*h,e[1]=d*p+w,e[5]=s*h,e[9]=m*p-_,e[2]=_*p-m,e[6]=l*h,e[10]=w*p+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fl,t,ul)}lookAt(t,e,n){const r=this.elements;return Se.subVectors(t,e),Se.lengthSq()===0&&(Se.z=1),Se.normalize(),cn.crossVectors(n,Se),cn.lengthSq()===0&&(Math.abs(n.z)===1?Se.x+=1e-4:Se.z+=1e-4,Se.normalize(),cn.crossVectors(n,Se)),cn.normalize(),Wi.crossVectors(Se,cn),r[0]=cn.x,r[4]=Wi.x,r[8]=Se.x,r[1]=cn.y,r[5]=Wi.y,r[9]=Se.y,r[2]=cn.z,r[6]=Wi.z,r[10]=Se.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,s=n[0],l=n[4],o=n[8],c=n[12],h=n[1],p=n[5],d=n[9],m=n[13],_=n[2],w=n[6],u=n[10],f=n[14],E=n[3],M=n[7],S=n[11],O=n[15],C=r[0],b=r[4],L=r[8],et=r[12],g=r[1],y=r[5],V=r[9],G=r[13],Y=r[2],K=r[6],X=r[10],P=r[14],U=r[3],N=r[7],j=r[11],q=r[15];return a[0]=s*C+l*g+o*Y+c*U,a[4]=s*b+l*y+o*K+c*N,a[8]=s*L+l*V+o*X+c*j,a[12]=s*et+l*G+o*P+c*q,a[1]=h*C+p*g+d*Y+m*U,a[5]=h*b+p*y+d*K+m*N,a[9]=h*L+p*V+d*X+m*j,a[13]=h*et+p*G+d*P+m*q,a[2]=_*C+w*g+u*Y+f*U,a[6]=_*b+w*y+u*K+f*N,a[10]=_*L+w*V+u*X+f*j,a[14]=_*et+w*G+u*P+f*q,a[3]=E*C+M*g+S*Y+O*U,a[7]=E*b+M*y+S*K+O*N,a[11]=E*L+M*V+S*X+O*j,a[15]=E*et+M*G+S*P+O*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],a=t[12],s=t[1],l=t[5],o=t[9],c=t[13],h=t[2],p=t[6],d=t[10],m=t[14],_=t[3],w=t[7],u=t[11],f=t[15];return _*(+a*o*p-r*c*p-a*l*d+n*c*d+r*l*m-n*o*m)+w*(+e*o*m-e*c*d+a*s*d-r*s*m+r*c*h-a*o*h)+u*(+e*c*p-e*l*m-a*s*p+n*s*m+a*l*h-n*c*h)+f*(-r*l*h-e*o*p+e*l*d+r*s*p-n*s*d+n*o*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],s=t[4],l=t[5],o=t[6],c=t[7],h=t[8],p=t[9],d=t[10],m=t[11],_=t[12],w=t[13],u=t[14],f=t[15],E=p*u*c-w*d*c+w*o*m-l*u*m-p*o*f+l*d*f,M=_*d*c-h*u*c-_*o*m+s*u*m+h*o*f-s*d*f,S=h*w*c-_*p*c+_*l*m-s*w*m-h*l*f+s*p*f,O=_*p*o-h*w*o-_*l*d+s*w*d+h*l*u-s*p*u,C=e*E+n*M+r*S+a*O;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/C;return t[0]=E*b,t[1]=(w*d*a-p*u*a-w*r*m+n*u*m+p*r*f-n*d*f)*b,t[2]=(l*u*a-w*o*a+w*r*c-n*u*c-l*r*f+n*o*f)*b,t[3]=(p*o*a-l*d*a-p*r*c+n*d*c+l*r*m-n*o*m)*b,t[4]=M*b,t[5]=(h*u*a-_*d*a+_*r*m-e*u*m-h*r*f+e*d*f)*b,t[6]=(_*o*a-s*u*a-_*r*c+e*u*c+s*r*f-e*o*f)*b,t[7]=(s*d*a-h*o*a+h*r*c-e*d*c-s*r*m+e*o*m)*b,t[8]=S*b,t[9]=(_*p*a-h*w*a-_*n*m+e*w*m+h*n*f-e*p*f)*b,t[10]=(s*w*a-_*l*a+_*n*c-e*w*c-s*n*f+e*l*f)*b,t[11]=(h*l*a-s*p*a-h*n*c+e*p*c+s*n*m-e*l*m)*b,t[12]=O*b,t[13]=(h*w*r-_*p*r+_*n*d-e*w*d-h*n*u+e*p*u)*b,t[14]=(_*l*r-s*w*r-_*n*o+e*w*o+s*n*u-e*l*u)*b,t[15]=(s*p*r-h*l*r+h*n*o-e*p*o-s*n*d+e*l*d)*b,this}scale(t){const e=this.elements,n=t.x,r=t.y,a=t.z;return e[0]*=n,e[4]*=r,e[8]*=a,e[1]*=n,e[5]*=r,e[9]*=a,e[2]*=n,e[6]*=r,e[10]*=a,e[3]*=n,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),a=1-n,s=t.x,l=t.y,o=t.z,c=a*s,h=a*l;return this.set(c*s+n,c*l-r*o,c*o+r*l,0,c*l+r*o,h*l+n,h*o-r*s,0,c*o-r*l,h*o+r*s,a*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,a,s){return this.set(1,n,a,0,t,1,s,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,a=e._x,s=e._y,l=e._z,o=e._w,c=a+a,h=s+s,p=l+l,d=a*c,m=a*h,_=a*p,w=s*h,u=s*p,f=l*p,E=o*c,M=o*h,S=o*p,O=n.x,C=n.y,b=n.z;return r[0]=(1-(w+f))*O,r[1]=(m+S)*O,r[2]=(_-M)*O,r[3]=0,r[4]=(m-S)*C,r[5]=(1-(d+f))*C,r[6]=(u+E)*C,r[7]=0,r[8]=(_+M)*b,r[9]=(u-E)*b,r[10]=(1-(d+w))*b,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let a=Xn.set(r[0],r[1],r[2]).length();const s=Xn.set(r[4],r[5],r[6]).length(),l=Xn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],De.copy(this);const c=1/a,h=1/s,p=1/l;return De.elements[0]*=c,De.elements[1]*=c,De.elements[2]*=c,De.elements[4]*=h,De.elements[5]*=h,De.elements[6]*=h,De.elements[8]*=p,De.elements[9]*=p,De.elements[10]*=p,e.setFromRotationMatrix(De),n.x=a,n.y=s,n.z=l,this}makePerspective(t,e,n,r,a,s,l=Qe){const o=this.elements,c=2*a/(e-t),h=2*a/(n-r),p=(e+t)/(e-t),d=(n+r)/(n-r);let m,_;if(l===Qe)m=-(s+a)/(s-a),_=-2*s*a/(s-a);else if(l===Sr)m=-s/(s-a),_=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return o[0]=c,o[4]=0,o[8]=p,o[12]=0,o[1]=0,o[5]=h,o[9]=d,o[13]=0,o[2]=0,o[6]=0,o[10]=m,o[14]=_,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,r,a,s,l=Qe){const o=this.elements,c=1/(e-t),h=1/(n-r),p=1/(s-a),d=(e+t)*c,m=(n+r)*h;let _,w;if(l===Qe)_=(s+a)*p,w=-2*p;else if(l===Sr)_=a*p,w=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return o[0]=2*c,o[4]=0,o[8]=0,o[12]=-d,o[1]=0,o[5]=2*h,o[9]=0,o[13]=-m,o[2]=0,o[6]=0,o[10]=w,o[14]=-_,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Xn=new H,De=new ie,fl=new H(0,0,0),ul=new H(1,1,1),cn=new H,Wi=new H,Se=new H,Cs=new ie,Ps=new Ii;class nn{constructor(t=0,e=0,n=0,r=nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,a=r[0],s=r[4],l=r[8],o=r[1],c=r[5],h=r[9],p=r[2],d=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(o,a));break;case"ZYX":this._y=Math.asin(-ge(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(o,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-ge(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Cs.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cs,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ps.setFromEuler(this),this.setFromQuaternion(Ps,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nn.DEFAULT_ORDER="XYZ";class Vo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hl=0;const Ls=new H,qn=new Ii,qe=new ie,Xi=new H,Ti=new H,dl=new H,pl=new Ii,Ds=new H(1,0,0),Is=new H(0,1,0),Us=new H(0,0,1),Ns={type:"added"},ml={type:"removed"},Yn={type:"childadded",child:null},Xr={type:"childremoved",child:null};class ve extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hl++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new H,e=new nn,n=new Ii,r=new H(1,1,1);function a(){n.setFromEuler(e,!1)}function s(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ie},normalMatrix:{value:new Ot}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qn.setFromAxisAngle(t,e),this.quaternion.multiply(qn),this}rotateOnWorldAxis(t,e){return qn.setFromAxisAngle(t,e),this.quaternion.premultiply(qn),this}rotateX(t){return this.rotateOnAxis(Ds,t)}rotateY(t){return this.rotateOnAxis(Is,t)}rotateZ(t){return this.rotateOnAxis(Us,t)}translateOnAxis(t,e){return Ls.copy(t).applyQuaternion(this.quaternion),this.position.add(Ls.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ds,t)}translateY(t){return this.translateOnAxis(Is,t)}translateZ(t){return this.translateOnAxis(Us,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qe.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xi.copy(t):Xi.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ti.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qe.lookAt(Ti,Xi,this.up):qe.lookAt(Xi,Ti,this.up),this.quaternion.setFromRotationMatrix(qe),r&&(qe.extractRotation(r.matrixWorld),qn.setFromRotationMatrix(qe),this.quaternion.premultiply(qn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ns),Yn.child=t,this.dispatchEvent(Yn),Yn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ml),Xr.child=t,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qe.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qe.multiply(t.parent.matrixWorld)),t.applyMatrix4(qe),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ns),Yn.child=t,this.dispatchEvent(Yn),Yn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,t,dl),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,pl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const o=l.shapes;if(Array.isArray(o))for(let c=0,h=o.length;c<h;c++){const p=o[c];a(t.shapes,p)}else a(t.shapes,o)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(a(t.materials,this.material[o]));r.material=l}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const o=this.animations[l];r.animations.push(a(t.animations,o))}}if(e){const l=s(t.geometries),o=s(t.materials),c=s(t.textures),h=s(t.images),p=s(t.shapes),d=s(t.skeletons),m=s(t.animations),_=s(t.nodes);l.length>0&&(n.geometries=l),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=r,n;function s(l){const o=[];for(const c in l){const h=l[c];delete h.metadata,o.push(h)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ve.DEFAULT_UP=new H(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ie=new H,Ye=new H,qr=new H,$e=new H,$n=new H,Kn=new H,Fs=new H,Yr=new H,$r=new H,Kr=new H,Zr=new ne,jr=new ne,Jr=new ne;class Ne{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Ie.subVectors(t,e),r.cross(Ie);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,n,r,a){Ie.subVectors(r,e),Ye.subVectors(n,e),qr.subVectors(t,e);const s=Ie.dot(Ie),l=Ie.dot(Ye),o=Ie.dot(qr),c=Ye.dot(Ye),h=Ye.dot(qr),p=s*c-l*l;if(p===0)return a.set(0,0,0),null;const d=1/p,m=(c*o-l*h)*d,_=(s*h-l*o)*d;return a.set(1-m-_,_,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,$e)===null?!1:$e.x>=0&&$e.y>=0&&$e.x+$e.y<=1}static getInterpolation(t,e,n,r,a,s,l,o){return this.getBarycoord(t,e,n,r,$e)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(a,$e.x),o.addScaledVector(s,$e.y),o.addScaledVector(l,$e.z),o)}static getInterpolatedAttribute(t,e,n,r,a,s){return Zr.setScalar(0),jr.setScalar(0),Jr.setScalar(0),Zr.fromBufferAttribute(t,e),jr.fromBufferAttribute(t,n),Jr.fromBufferAttribute(t,r),s.setScalar(0),s.addScaledVector(Zr,a.x),s.addScaledVector(jr,a.y),s.addScaledVector(Jr,a.z),s}static isFrontFacing(t,e,n,r){return Ie.subVectors(n,e),Ye.subVectors(t,e),Ie.cross(Ye).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ie.subVectors(this.c,this.b),Ye.subVectors(this.a,this.b),Ie.cross(Ye).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ne.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ne.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,a){return Ne.getInterpolation(t,this.a,this.b,this.c,e,n,r,a)}containsPoint(t){return Ne.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ne.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,a=this.c;let s,l;$n.subVectors(r,n),Kn.subVectors(a,n),Yr.subVectors(t,n);const o=$n.dot(Yr),c=Kn.dot(Yr);if(o<=0&&c<=0)return e.copy(n);$r.subVectors(t,r);const h=$n.dot($r),p=Kn.dot($r);if(h>=0&&p<=h)return e.copy(r);const d=o*p-h*c;if(d<=0&&o>=0&&h<=0)return s=o/(o-h),e.copy(n).addScaledVector($n,s);Kr.subVectors(t,a);const m=$n.dot(Kr),_=Kn.dot(Kr);if(_>=0&&m<=_)return e.copy(a);const w=m*c-o*_;if(w<=0&&c>=0&&_<=0)return l=c/(c-_),e.copy(n).addScaledVector(Kn,l);const u=h*_-m*p;if(u<=0&&p-h>=0&&m-_>=0)return Fs.subVectors(a,r),l=(p-h)/(p-h+(m-_)),e.copy(r).addScaledVector(Fs,l);const f=1/(u+w+d);return s=w*f,l=d*f,e.copy(n).addScaledVector($n,s).addScaledVector(Kn,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ko={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fn={h:0,s:0,l:0},qi={h:0,s:0,l:0};function Qr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Yt.workingColorSpace){if(t=J0(t,1),e=ge(e,0,1),n=ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,s=2*n-a;this.r=Qr(s,a,t+1/3),this.g=Qr(s,a,t),this.b=Qr(s,a,t-1/3)}return Yt.toWorkingColorSpace(this,r),this}setStyle(t,e=ze){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const s=r[1],l=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){const n=ko[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ai(t.r),this.g=ai(t.g),this.b=ai(t.b),this}copyLinearToSRGB(t){return this.r=Or(t.r),this.g=Or(t.g),this.b=Or(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return Yt.fromWorkingColorSpace(he.copy(this),t),Math.round(ge(he.r*255,0,255))*65536+Math.round(ge(he.g*255,0,255))*256+Math.round(ge(he.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(he.copy(this),e);const n=he.r,r=he.g,a=he.b,s=Math.max(n,r,a),l=Math.min(n,r,a);let o,c;const h=(l+s)/2;if(l===s)o=0,c=0;else{const p=s-l;switch(c=h<=.5?p/(s+l):p/(2-s-l),s){case n:o=(r-a)/p+(r<a?6:0);break;case r:o=(a-n)/p+2;break;case a:o=(n-r)/p+4;break}o/=6}return t.h=o,t.s=c,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(he.copy(this),e),t.r=he.r,t.g=he.g,t.b=he.b,t}getStyle(t=ze){Yt.fromWorkingColorSpace(he.copy(this),t);const e=he.r,n=he.g,r=he.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(fn),this.setHSL(fn.h+t,fn.s+e,fn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(fn),t.getHSL(qi);const n=Nr(fn.h,qi.h,e),r=Nr(fn.s,qi.s,e),a=Nr(fn.l,qi.l,e);return this.setHSL(n,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*r,this.g=a[1]*e+a[4]*n+a[7]*r,this.b=a[2]*e+a[5]*n+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const he=new kt;kt.NAMES=ko;let gl=0;class Ni extends di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gl++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=ii,this.side=_n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ha,this.blendDst=da,this.blendEquation=Pn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ws,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hn,this.stencilZFail=Hn,this.stencilZPass=Hn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ii&&(n.blending=this.blending),this.side!==_n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ha&&(n.blendSrc=this.blendSrc),this.blendDst!==da&&(n.blendDst=this.blendDst),this.blendEquation!==Pn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ws&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const s=[];for(const l in a){const o=a[l];delete o.metadata,s.push(o)}return s}if(e){const a=r(t.textures),s=r(t.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Wo extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=To,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const re=new H,Yi=new Kt;class jt{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ss,this.updateRanges=[],this.gpuType=Je,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Yi.fromBufferAttribute(this,e),Yi.applyMatrix3(t),this.setXY(e,Yi.x,Yi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.applyMatrix3(t),this.setXYZ(e,re.x,re.y,re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.applyMatrix4(t),this.setXYZ(e,re.x,re.y,re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.applyNormalMatrix(t),this.setXYZ(e,re.x,re.y,re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.transformDirection(t),this.setXYZ(e,re.x,re.y,re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Mi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mi(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mi(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mi(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,a){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),r=me(r,this.array),a=me(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ss&&(t.usage=this.usage),t}}class Xo extends jt{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qo extends jt{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Un extends jt{constructor(t,e,n){super(new Float32Array(t),e,n)}}let _l=0;const be=new ie,ta=new ve,Zn=new H,Ee=new Ui,bi=new Ui,ce=new H;class Ve extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_l++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bo(t)?qo:Xo)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ot().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return be.makeRotationFromQuaternion(t),this.applyMatrix4(be),this}rotateX(t){return be.makeRotationX(t),this.applyMatrix4(be),this}rotateY(t){return be.makeRotationY(t),this.applyMatrix4(be),this}rotateZ(t){return be.makeRotationZ(t),this.applyMatrix4(be),this}translate(t,e,n){return be.makeTranslation(t,e,n),this.applyMatrix4(be),this}scale(t,e,n){return be.makeScale(t,e,n),this.applyMatrix4(be),this}lookAt(t){return ta.lookAt(t),ta.updateMatrix(),this.applyMatrix4(ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zn).negate(),this.translate(Zn.x,Zn.y,Zn.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];e.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Un(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const a=e[n];Ee.setFromBufferAttribute(a),this.morphTargetsRelative?(ce.addVectors(this.boundingBox.min,Ee.min),this.boundingBox.expandByPoint(ce),ce.addVectors(this.boundingBox.max,Ee.max),this.boundingBox.expandByPoint(ce)):(this.boundingBox.expandByPoint(Ee.min),this.boundingBox.expandByPoint(Ee.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ar);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const n=this.boundingSphere.center;if(Ee.setFromBufferAttribute(t),e)for(let a=0,s=e.length;a<s;a++){const l=e[a];bi.setFromBufferAttribute(l),this.morphTargetsRelative?(ce.addVectors(Ee.min,bi.min),Ee.expandByPoint(ce),ce.addVectors(Ee.max,bi.max),Ee.expandByPoint(ce)):(Ee.expandByPoint(bi.min),Ee.expandByPoint(bi.max))}Ee.getCenter(n);let r=0;for(let a=0,s=t.count;a<s;a++)ce.fromBufferAttribute(t,a),r=Math.max(r,n.distanceToSquared(ce));if(e)for(let a=0,s=e.length;a<s;a++){const l=e[a],o=this.morphTargetsRelative;for(let c=0,h=l.count;c<h;c++)ce.fromBufferAttribute(l,c),o&&(Zn.fromBufferAttribute(t,c),ce.add(Zn)),r=Math.max(r,n.distanceToSquared(ce))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),l=[],o=[];for(let L=0;L<n.count;L++)l[L]=new H,o[L]=new H;const c=new H,h=new H,p=new H,d=new Kt,m=new Kt,_=new Kt,w=new H,u=new H;function f(L,et,g){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,et),p.fromBufferAttribute(n,g),d.fromBufferAttribute(a,L),m.fromBufferAttribute(a,et),_.fromBufferAttribute(a,g),h.sub(c),p.sub(c),m.sub(d),_.sub(d);const y=1/(m.x*_.y-_.x*m.y);isFinite(y)&&(w.copy(h).multiplyScalar(_.y).addScaledVector(p,-m.y).multiplyScalar(y),u.copy(p).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(y),l[L].add(w),l[et].add(w),l[g].add(w),o[L].add(u),o[et].add(u),o[g].add(u))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let L=0,et=E.length;L<et;++L){const g=E[L],y=g.start,V=g.count;for(let G=y,Y=y+V;G<Y;G+=3)f(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const M=new H,S=new H,O=new H,C=new H;function b(L){O.fromBufferAttribute(r,L),C.copy(O);const et=l[L];M.copy(et),M.sub(O.multiplyScalar(O.dot(et))).normalize(),S.crossVectors(C,et);const y=S.dot(o[L])<0?-1:1;s.setXYZW(L,M.x,M.y,M.z,y)}for(let L=0,et=E.length;L<et;++L){const g=E[L],y=g.start,V=g.count;for(let G=y,Y=y+V;G<Y;G+=3)b(t.getX(G+0)),b(t.getX(G+1)),b(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const r=new H,a=new H,s=new H,l=new H,o=new H,c=new H,h=new H,p=new H;if(t)for(let d=0,m=t.count;d<m;d+=3){const _=t.getX(d+0),w=t.getX(d+1),u=t.getX(d+2);r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,w),s.fromBufferAttribute(e,u),h.subVectors(s,a),p.subVectors(r,a),h.cross(p),l.fromBufferAttribute(n,_),o.fromBufferAttribute(n,w),c.fromBufferAttribute(n,u),l.add(h),o.add(h),c.add(h),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(w,o.x,o.y,o.z),n.setXYZ(u,c.x,c.y,c.z)}else for(let d=0,m=e.count;d<m;d+=3)r.fromBufferAttribute(e,d+0),a.fromBufferAttribute(e,d+1),s.fromBufferAttribute(e,d+2),h.subVectors(s,a),p.subVectors(r,a),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ce.fromBufferAttribute(t,e),ce.normalize(),t.setXYZ(e,ce.x,ce.y,ce.z)}toNonIndexed(){function t(l,o){const c=l.array,h=l.itemSize,p=l.normalized,d=new c.constructor(o.length*h);let m=0,_=0;for(let w=0,u=o.length;w<u;w++){l.isInterleavedBufferAttribute?m=o[w]*l.data.stride+l.offset:m=o[w]*h;for(let f=0;f<h;f++)d[_++]=c[m++]}return new jt(d,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,n=this.index.array,r=this.attributes;for(const l in r){const o=r[l],c=t(o,n);e.setAttribute(l,c)}const a=this.morphAttributes;for(const l in a){const o=[],c=a[l];for(let h=0,p=c.length;h<p;h++){const d=c[h],m=t(d,n);o.push(m)}e.morphAttributes[l]=o}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let l=0,o=s.length;l<o;l++){const c=s[l];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const c in o)o[c]!==void 0&&(t[c]=o[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const o in n){const c=n[o];t.data.attributes[o]=c.toJSON(t.data)}const r={};let a=!1;for(const o in this.morphAttributes){const c=this.morphAttributes[o],h=[];for(let p=0,d=c.length;p<d;p++){const m=c[p];h.push(m.toJSON(t.data))}h.length>0&&(r[o]=h,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const l=this.boundingSphere;return l!==null&&(t.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const a=t.morphAttributes;for(const c in a){const h=[],p=a[c];for(let d=0,m=p.length;d<m;d++)h.push(p[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,h=s.length;c<h;c++){const p=s[c];this.addGroup(p.start,p.count,p.materialIndex)}const l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());const o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Os=new ie,Sn=new Go,$i=new Ar,Bs=new H,Ki=new H,Zi=new H,ji=new H,ea=new H,Ji=new H,zs=new H,Qi=new H;class tn extends ve{constructor(t=new Ve,e=new Wo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const l=this.morphTargetInfluences;if(a&&l){Ji.set(0,0,0);for(let o=0,c=a.length;o<c;o++){const h=l[o],p=a[o];h!==0&&(ea.fromBufferAttribute(p,t),s?Ji.addScaledVector(ea,h):Ji.addScaledVector(ea.sub(e),h))}e.add(Ji)}return e}raycast(t,e){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$i.copy(n.boundingSphere),$i.applyMatrix4(a),Sn.copy(t.ray).recast(t.near),!($i.containsPoint(Sn.origin)===!1&&(Sn.intersectSphere($i,Bs)===null||Sn.origin.distanceToSquared(Bs)>(t.far-t.near)**2))&&(Os.copy(a).invert(),Sn.copy(t.ray).applyMatrix4(Os),!(n.boundingBox!==null&&Sn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Sn)))}_computeIntersections(t,e,n){let r;const a=this.geometry,s=this.material,l=a.index,o=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,p=a.attributes.normal,d=a.groups,m=a.drawRange;if(l!==null)if(Array.isArray(s))for(let _=0,w=d.length;_<w;_++){const u=d[_],f=s[u.materialIndex],E=Math.max(u.start,m.start),M=Math.min(l.count,Math.min(u.start+u.count,m.start+m.count));for(let S=E,O=M;S<O;S+=3){const C=l.getX(S),b=l.getX(S+1),L=l.getX(S+2);r=tr(this,f,t,n,c,h,p,C,b,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=u.materialIndex,e.push(r))}}else{const _=Math.max(0,m.start),w=Math.min(l.count,m.start+m.count);for(let u=_,f=w;u<f;u+=3){const E=l.getX(u),M=l.getX(u+1),S=l.getX(u+2);r=tr(this,s,t,n,c,h,p,E,M,S),r&&(r.faceIndex=Math.floor(u/3),e.push(r))}}else if(o!==void 0)if(Array.isArray(s))for(let _=0,w=d.length;_<w;_++){const u=d[_],f=s[u.materialIndex],E=Math.max(u.start,m.start),M=Math.min(o.count,Math.min(u.start+u.count,m.start+m.count));for(let S=E,O=M;S<O;S+=3){const C=S,b=S+1,L=S+2;r=tr(this,f,t,n,c,h,p,C,b,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=u.materialIndex,e.push(r))}}else{const _=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let u=_,f=w;u<f;u+=3){const E=u,M=u+1,S=u+2;r=tr(this,s,t,n,c,h,p,E,M,S),r&&(r.faceIndex=Math.floor(u/3),e.push(r))}}}}function xl(i,t,e,n,r,a,s,l){let o;if(t.side===_e?o=n.intersectTriangle(s,a,r,!0,l):o=n.intersectTriangle(r,a,s,t.side===_n,l),o===null)return null;Qi.copy(l),Qi.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Qi);return c<e.near||c>e.far?null:{distance:c,point:Qi.clone(),object:i}}function tr(i,t,e,n,r,a,s,l,o,c){i.getVertexPosition(l,Ki),i.getVertexPosition(o,Zi),i.getVertexPosition(c,ji);const h=xl(i,t,e,n,Ki,Zi,ji,zs);if(h){const p=new H;Ne.getBarycoord(zs,Ki,Zi,ji,p),r&&(h.uv=Ne.getInterpolatedAttribute(r,l,o,c,p,new Kt)),a&&(h.uv1=Ne.getInterpolatedAttribute(a,l,o,c,p,new Kt)),s&&(h.normal=Ne.getInterpolatedAttribute(s,l,o,c,p,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:l,b:o,c,normal:new H,materialIndex:0};Ne.getNormal(Ki,Zi,ji,d.normal),h.face=d,h.barycoord=p}return h}class Fi extends Ve{constructor(t=1,e=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const l=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const o=[],c=[],h=[],p=[];let d=0,m=0;_("z","y","x",-1,-1,n,e,t,s,a,0),_("z","y","x",1,-1,n,e,-t,s,a,1),_("x","z","y",1,1,t,n,e,r,s,2),_("x","z","y",1,-1,t,n,-e,r,s,3),_("x","y","z",1,-1,t,e,n,r,a,4),_("x","y","z",-1,-1,t,e,-n,r,a,5),this.setIndex(o),this.setAttribute("position",new Un(c,3)),this.setAttribute("normal",new Un(h,3)),this.setAttribute("uv",new Un(p,2));function _(w,u,f,E,M,S,O,C,b,L,et){const g=S/b,y=O/L,V=S/2,G=O/2,Y=C/2,K=b+1,X=L+1;let P=0,U=0;const N=new H;for(let j=0;j<X;j++){const q=j*y-G;for(let _t=0;_t<K;_t++){const Lt=_t*g-V;N[w]=Lt*E,N[u]=q*M,N[f]=Y,c.push(N.x,N.y,N.z),N[w]=0,N[u]=0,N[f]=C>0?1:-1,h.push(N.x,N.y,N.z),p.push(_t/b),p.push(1-j/L),P+=1}}for(let j=0;j<L;j++)for(let q=0;q<b;q++){const _t=d+q+K*j,Lt=d+q+K*(j+1),k=d+(q+1)+K*(j+1),J=d+(q+1)+K*j;o.push(_t,Lt,J),o.push(Lt,k,J),U+=6}l.addGroup(m,U,et),m+=U,d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function hi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function pe(i){const t={};for(let e=0;e<i.length;e++){const n=hi(i[e]);for(const r in n)t[r]=n[r]}return t}function vl(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yo(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const yl={clone:hi,merge:pe};var Ml=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ge extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ml,this.fragmentShader=wl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hi(t.uniforms),this.uniformsGroups=vl(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?e.uniforms[r]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[r]={type:"m4",value:s.toArray()}:e.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class $o extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Qe}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const un=new H,Hs=new Kt,Gs=new Kt;class Ae extends $o{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ja*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ur*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ja*2*Math.atan(Math.tan(Ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(un.x,un.y).multiplyScalar(-t/un.z),un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(un.x,un.y).multiplyScalar(-t/un.z)}getViewSize(t,e){return this.getViewBounds(t,Hs,Gs),e.subVectors(Gs,Hs)}setViewOffset(t,e,n,r,a,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ur*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,c=s.fullHeight;a+=s.offsetX*r/o,e-=s.offsetY*n/c,r*=s.width/o,n*=s.height/c}const l=this.filmOffset;l!==0&&(a+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const jn=-90,Jn=1;class Sl extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ae(jn,Jn,t,e);r.layers=this.layers,this.add(r);const a=new Ae(jn,Jn,t,e);a.layers=this.layers,this.add(a);const s=new Ae(jn,Jn,t,e);s.layers=this.layers,this.add(s);const l=new Ae(jn,Jn,t,e);l.layers=this.layers,this.add(l);const o=new Ae(jn,Jn,t,e);o.layers=this.layers,this.add(o);const c=new Ae(jn,Jn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,a,s,l,o]=e;for(const c of e)this.remove(c);if(t===Qe)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===Sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,s,l,o,c,h]=this.children,p=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,a),t.setRenderTarget(n,1,r),t.render(e,s),t.setRenderTarget(n,2,r),t.render(e,l),t.setRenderTarget(n,3,r),t.render(e,o),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=w,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(p,d,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ko extends xe{constructor(t,e,n,r,a,s,l,o,c,h){t=t!==void 0?t:[],e=e!==void 0?e:li,super(t,e,n,r,a,s,l,o,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class El extends Fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Ko(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ue}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Fi(5,5,5),a=new Ge({name:"CubemapFromEquirect",uniforms:hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_e,blending:mn});a.uniforms.tEquirect.value=e;const s=new tn(r,a),l=e.minFilter;return e.minFilter===In&&(e.minFilter=Ue),new Sl(1,10,this).update(t,s),e.minFilter=l,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,n,r){const a=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,n,r);t.setRenderTarget(a)}}const na=new H,Tl=new H,bl=new Ot;class Rn{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=na.subVectors(n,e).cross(Tl.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(na),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||bl.getNormalMatrix(t),r=this.coplanarPoint(na).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const En=new Ar,er=new H;class Zo{constructor(t=new Rn,e=new Rn,n=new Rn,r=new Rn,a=new Rn,s=new Rn){this.planes=[t,e,n,r,a,s]}set(t,e,n,r,a,s){const l=this.planes;return l[0].copy(t),l[1].copy(e),l[2].copy(n),l[3].copy(r),l[4].copy(a),l[5].copy(s),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qe){const n=this.planes,r=t.elements,a=r[0],s=r[1],l=r[2],o=r[3],c=r[4],h=r[5],p=r[6],d=r[7],m=r[8],_=r[9],w=r[10],u=r[11],f=r[12],E=r[13],M=r[14],S=r[15];if(n[0].setComponents(o-a,d-c,u-m,S-f).normalize(),n[1].setComponents(o+a,d+c,u+m,S+f).normalize(),n[2].setComponents(o+s,d+h,u+_,S+E).normalize(),n[3].setComponents(o-s,d-h,u-_,S-E).normalize(),n[4].setComponents(o-l,d-p,u-w,S-M).normalize(),e===Qe)n[5].setComponents(o+l,d+p,u+w,S+M).normalize();else if(e===Sr)n[5].setComponents(l,p,w,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),En.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),En.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(En)}intersectsSprite(t){return En.center.set(0,0,0),En.radius=.7071067811865476,En.applyMatrix4(t.matrixWorld),this.intersectsSphere(En)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(er.x=r.normal.x>0?t.max.x:t.min.x,er.y=r.normal.y>0?t.max.y:t.min.y,er.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(er)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jo(){let i=null,t=!1,e=null,n=null;function r(a,s){e(a,s),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){i=a}}}function Al(i){const t=new WeakMap;function e(l,o){const c=l.array,h=l.usage,p=c.byteLength,d=i.createBuffer();i.bindBuffer(o,d),i.bufferData(o,c,h),l.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:p}}function n(l,o,c){const h=o.array,p=o.updateRanges;if(i.bindBuffer(c,l),p.length===0)i.bufferSubData(c,0,h);else{p.sort((m,_)=>m.start-_.start);let d=0;for(let m=1;m<p.length;m++){const _=p[d],w=p[m];w.start<=_.start+_.count+1?_.count=Math.max(_.count,w.start+w.count-_.start):(++d,p[d]=w)}p.length=d+1;for(let m=0,_=p.length;m<_;m++){const w=p[m];i.bufferSubData(c,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}o.clearUpdateRanges()}o.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const o=t.get(l);o&&(i.deleteBuffer(o.buffer),t.delete(l))}function s(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=t.get(l);if(c===void 0)t.set(l,e(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,o),c.version=l.version}}return{get:r,remove:a,update:s}}class Rr extends Ve{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const a=t/2,s=e/2,l=Math.floor(n),o=Math.floor(r),c=l+1,h=o+1,p=t/l,d=e/o,m=[],_=[],w=[],u=[];for(let f=0;f<h;f++){const E=f*d-s;for(let M=0;M<c;M++){const S=M*p-a;_.push(S,-E,0),w.push(0,0,1),u.push(M/l),u.push(1-f/o)}}for(let f=0;f<o;f++)for(let E=0;E<l;E++){const M=E+c*f,S=E+c*(f+1),O=E+1+c*(f+1),C=E+1+c*f;m.push(M,S,C),m.push(S,O,C)}this.setIndex(m),this.setAttribute("position",new Un(_,3)),this.setAttribute("normal",new Un(w,3)),this.setAttribute("uv",new Un(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rr(t.width,t.height,t.widthSegments,t.heightSegments)}}var Rl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cl=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ll=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Il=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ul=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nl=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fl=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ol=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hl=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gl=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vl=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kl=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Wl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ql=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yl=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$l=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zl=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jl=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jl=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ql=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,tc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ec=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ic=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rc="gl_FragColor = linearToOutputTexel( gl_FragColor );",ac=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,oc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lc=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mc=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_c=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xc=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yc=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Mc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wc=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ec=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bc=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ac=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pc=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lc=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dc=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ic=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Oc=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gc=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kc=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wc=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xc=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qc=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$c=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kc=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zc=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jc=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qc=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ef=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,rf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,df=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_f=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ff=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Of=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Yf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Kf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eu=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,iu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ru=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,au=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,su=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ou=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:Rl,alphahash_pars_fragment:Cl,alphamap_fragment:Pl,alphamap_pars_fragment:Ll,alphatest_fragment:Dl,alphatest_pars_fragment:Il,aomap_fragment:Ul,aomap_pars_fragment:Nl,batching_pars_vertex:Fl,batching_vertex:Ol,begin_vertex:Bl,beginnormal_vertex:zl,bsdfs:Hl,iridescence_fragment:Gl,bumpmap_pars_fragment:Vl,clipping_planes_fragment:kl,clipping_planes_pars_fragment:Wl,clipping_planes_pars_vertex:Xl,clipping_planes_vertex:ql,color_fragment:Yl,color_pars_fragment:$l,color_pars_vertex:Kl,color_vertex:Zl,common:jl,cube_uv_reflection_fragment:Jl,defaultnormal_vertex:Ql,displacementmap_pars_vertex:tc,displacementmap_vertex:ec,emissivemap_fragment:nc,emissivemap_pars_fragment:ic,colorspace_fragment:rc,colorspace_pars_fragment:ac,envmap_fragment:sc,envmap_common_pars_fragment:oc,envmap_pars_fragment:lc,envmap_pars_vertex:cc,envmap_physical_pars_fragment:yc,envmap_vertex:fc,fog_vertex:uc,fog_pars_vertex:hc,fog_fragment:dc,fog_pars_fragment:pc,gradientmap_pars_fragment:mc,lightmap_pars_fragment:gc,lights_lambert_fragment:_c,lights_lambert_pars_fragment:xc,lights_pars_begin:vc,lights_toon_fragment:Mc,lights_toon_pars_fragment:wc,lights_phong_fragment:Sc,lights_phong_pars_fragment:Ec,lights_physical_fragment:Tc,lights_physical_pars_fragment:bc,lights_fragment_begin:Ac,lights_fragment_maps:Rc,lights_fragment_end:Cc,logdepthbuf_fragment:Pc,logdepthbuf_pars_fragment:Lc,logdepthbuf_pars_vertex:Dc,logdepthbuf_vertex:Ic,map_fragment:Uc,map_pars_fragment:Nc,map_particle_fragment:Fc,map_particle_pars_fragment:Oc,metalnessmap_fragment:Bc,metalnessmap_pars_fragment:zc,morphinstance_vertex:Hc,morphcolor_vertex:Gc,morphnormal_vertex:Vc,morphtarget_pars_vertex:kc,morphtarget_vertex:Wc,normal_fragment_begin:Xc,normal_fragment_maps:qc,normal_pars_fragment:Yc,normal_pars_vertex:$c,normal_vertex:Kc,normalmap_pars_fragment:Zc,clearcoat_normal_fragment_begin:jc,clearcoat_normal_fragment_maps:Jc,clearcoat_pars_fragment:Qc,iridescence_pars_fragment:tf,opaque_fragment:ef,packing:nf,premultiplied_alpha_fragment:rf,project_vertex:af,dithering_fragment:sf,dithering_pars_fragment:of,roughnessmap_fragment:lf,roughnessmap_pars_fragment:cf,shadowmap_pars_fragment:ff,shadowmap_pars_vertex:uf,shadowmap_vertex:hf,shadowmask_pars_fragment:df,skinbase_vertex:pf,skinning_pars_vertex:mf,skinning_vertex:gf,skinnormal_vertex:_f,specularmap_fragment:xf,specularmap_pars_fragment:vf,tonemapping_fragment:yf,tonemapping_pars_fragment:Mf,transmission_fragment:wf,transmission_pars_fragment:Sf,uv_pars_fragment:Ef,uv_pars_vertex:Tf,uv_vertex:bf,worldpos_vertex:Af,background_vert:Rf,background_frag:Cf,backgroundCube_vert:Pf,backgroundCube_frag:Lf,cube_vert:Df,cube_frag:If,depth_vert:Uf,depth_frag:Nf,distanceRGBA_vert:Ff,distanceRGBA_frag:Of,equirect_vert:Bf,equirect_frag:zf,linedashed_vert:Hf,linedashed_frag:Gf,meshbasic_vert:Vf,meshbasic_frag:kf,meshlambert_vert:Wf,meshlambert_frag:Xf,meshmatcap_vert:qf,meshmatcap_frag:Yf,meshnormal_vert:$f,meshnormal_frag:Kf,meshphong_vert:Zf,meshphong_frag:jf,meshphysical_vert:Jf,meshphysical_frag:Qf,meshtoon_vert:tu,meshtoon_frag:eu,points_vert:nu,points_frag:iu,shadow_vert:ru,shadow_frag:au,sprite_vert:su,sprite_frag:ou},ot={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new Kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},He={basic:{uniforms:pe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:pe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new kt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:pe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:pe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:pe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new kt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:pe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:pe([ot.points,ot.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:pe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:pe([ot.common,ot.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:pe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:pe([ot.sprite,ot.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:pe([ot.common,ot.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:pe([ot.lights,ot.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};He.physical={uniforms:pe([He.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const nr={r:0,b:0,g:0},Tn=new nn,lu=new ie;function cu(i,t,e,n,r,a,s){const l=new kt(0);let o=a===!0?0:1,c,h,p=null,d=0,m=null;function _(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function w(E){let M=!1;const S=_(E);S===null?f(l,o):S&&S.isColor&&(f(S,1),M=!0);const O=i.xr.getEnvironmentBlendMode();O==="additive"?n.buffers.color.setClear(0,0,0,1,s):O==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(E,M){const S=_(M);S&&(S.isCubeTexture||S.mapping===Tr)?(h===void 0&&(h=new tn(new Fi(1,1,1),new Ge({name:"BackgroundCubeMaterial",uniforms:hi(He.backgroundCube.uniforms),vertexShader:He.backgroundCube.vertexShader,fragmentShader:He.backgroundCube.fragmentShader,side:_e,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(O,C,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Tn.copy(M.backgroundRotation),Tn.x*=-1,Tn.y*=-1,Tn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Tn.y*=-1,Tn.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(lu.makeRotationFromEuler(Tn)),h.material.toneMapped=Yt.getTransfer(S.colorSpace)!==Qt,(p!==S||d!==S.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,p=S,d=S.version,m=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new tn(new Rr(2,2),new Ge({name:"BackgroundMaterial",uniforms:hi(He.background.uniforms),vertexShader:He.background.vertexShader,fragmentShader:He.background.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(S.colorSpace)!==Qt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(p!==S||d!==S.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,p=S,d=S.version,m=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function f(E,M){E.getRGB(nr,Yo(i)),n.buffers.color.setClear(nr.r,nr.g,nr.b,M,s)}return{getClearColor:function(){return l},setClearColor:function(E,M=1){l.set(E),o=M,f(l,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,f(l,o)},render:w,addToRenderList:u}}function fu(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let a=r,s=!1;function l(g,y,V,G,Y){let K=!1;const X=p(G,V,y);a!==X&&(a=X,c(a.object)),K=m(g,G,V,Y),K&&_(g,G,V,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(K||s)&&(s=!1,S(g,y,V,G),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function o(){return i.createVertexArray()}function c(g){return i.bindVertexArray(g)}function h(g){return i.deleteVertexArray(g)}function p(g,y,V){const G=V.wireframe===!0;let Y=n[g.id];Y===void 0&&(Y={},n[g.id]=Y);let K=Y[y.id];K===void 0&&(K={},Y[y.id]=K);let X=K[G];return X===void 0&&(X=d(o()),K[G]=X),X}function d(g){const y=[],V=[],G=[];for(let Y=0;Y<e;Y++)y[Y]=0,V[Y]=0,G[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:V,attributeDivisors:G,object:g,attributes:{},index:null}}function m(g,y,V,G){const Y=a.attributes,K=y.attributes;let X=0;const P=V.getAttributes();for(const U in P)if(P[U].location>=0){const j=Y[U];let q=K[U];if(q===void 0&&(U==="instanceMatrix"&&g.instanceMatrix&&(q=g.instanceMatrix),U==="instanceColor"&&g.instanceColor&&(q=g.instanceColor)),j===void 0||j.attribute!==q||q&&j.data!==q.data)return!0;X++}return a.attributesNum!==X||a.index!==G}function _(g,y,V,G){const Y={},K=y.attributes;let X=0;const P=V.getAttributes();for(const U in P)if(P[U].location>=0){let j=K[U];j===void 0&&(U==="instanceMatrix"&&g.instanceMatrix&&(j=g.instanceMatrix),U==="instanceColor"&&g.instanceColor&&(j=g.instanceColor));const q={};q.attribute=j,j&&j.data&&(q.data=j.data),Y[U]=q,X++}a.attributes=Y,a.attributesNum=X,a.index=G}function w(){const g=a.newAttributes;for(let y=0,V=g.length;y<V;y++)g[y]=0}function u(g){f(g,0)}function f(g,y){const V=a.newAttributes,G=a.enabledAttributes,Y=a.attributeDivisors;V[g]=1,G[g]===0&&(i.enableVertexAttribArray(g),G[g]=1),Y[g]!==y&&(i.vertexAttribDivisor(g,y),Y[g]=y)}function E(){const g=a.newAttributes,y=a.enabledAttributes;for(let V=0,G=y.length;V<G;V++)y[V]!==g[V]&&(i.disableVertexAttribArray(V),y[V]=0)}function M(g,y,V,G,Y,K,X){X===!0?i.vertexAttribIPointer(g,y,V,Y,K):i.vertexAttribPointer(g,y,V,G,Y,K)}function S(g,y,V,G){w();const Y=G.attributes,K=V.getAttributes(),X=y.defaultAttributeValues;for(const P in K){const U=K[P];if(U.location>=0){let N=Y[P];if(N===void 0&&(P==="instanceMatrix"&&g.instanceMatrix&&(N=g.instanceMatrix),P==="instanceColor"&&g.instanceColor&&(N=g.instanceColor)),N!==void 0){const j=N.normalized,q=N.itemSize,_t=t.get(N);if(_t===void 0)continue;const Lt=_t.buffer,k=_t.type,J=_t.bytesPerElement,st=k===i.INT||k===i.UNSIGNED_INT||N.gpuType===ls;if(N.isInterleavedBufferAttribute){const ut=N.data,Ct=ut.stride,bt=N.offset;if(ut.isInstancedInterleavedBuffer){for(let Bt=0;Bt<U.locationSize;Bt++)f(U.location+Bt,ut.meshPerAttribute);g.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Bt=0;Bt<U.locationSize;Bt++)u(U.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let Bt=0;Bt<U.locationSize;Bt++)M(U.location+Bt,q/U.locationSize,k,j,Ct*J,(bt+q/U.locationSize*Bt)*J,st)}else{if(N.isInstancedBufferAttribute){for(let ut=0;ut<U.locationSize;ut++)f(U.location+ut,N.meshPerAttribute);g.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let ut=0;ut<U.locationSize;ut++)u(U.location+ut);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let ut=0;ut<U.locationSize;ut++)M(U.location+ut,q/U.locationSize,k,j,q*J,q/U.locationSize*ut*J,st)}}else if(X!==void 0){const j=X[P];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(U.location,j);break;case 3:i.vertexAttrib3fv(U.location,j);break;case 4:i.vertexAttrib4fv(U.location,j);break;default:i.vertexAttrib1fv(U.location,j)}}}}E()}function O(){L();for(const g in n){const y=n[g];for(const V in y){const G=y[V];for(const Y in G)h(G[Y].object),delete G[Y];delete y[V]}delete n[g]}}function C(g){if(n[g.id]===void 0)return;const y=n[g.id];for(const V in y){const G=y[V];for(const Y in G)h(G[Y].object),delete G[Y];delete y[V]}delete n[g.id]}function b(g){for(const y in n){const V=n[y];if(V[g.id]===void 0)continue;const G=V[g.id];for(const Y in G)h(G[Y].object),delete G[Y];delete V[g.id]}}function L(){et(),s=!0,a!==r&&(a=r,c(a.object))}function et(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:L,resetDefaultState:et,dispose:O,releaseStatesOfGeometry:C,releaseStatesOfProgram:b,initAttributes:w,enableAttribute:u,disableUnusedAttributes:E}}function uu(i,t,e){let n;function r(c){n=c}function a(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function s(c,h,p){p!==0&&(i.drawArraysInstanced(n,c,h,p),e.update(h,n,p))}function l(c,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,p);let m=0;for(let _=0;_<p;_++)m+=h[_];e.update(m,n,1)}function o(c,h,p,d){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)s(c[_],h[_],d[_]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,p);let _=0;for(let w=0;w<p;w++)_+=h[w];for(let w=0;w<d.length;w++)e.update(_,n,d[w])}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=l,this.renderMultiDrawInstances=o}function hu(i,t,e,n){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(b){return!(b!==Fe&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(b){const L=b===Li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==en&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Je&&!L)}function o(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=o(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const p=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){const b=t.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),O=_>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:o,textureFormatReadable:s,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:_,maxTextureSize:w,maxCubemapSize:u,maxAttributes:f,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:S,vertexTextures:O,maxSamples:C}}function du(i){const t=this;let e=null,n=0,r=!1,a=!1;const s=new Rn,l=new Ot,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const m=p.length!==0||d||n!==0||r;return r=d,n=p.length,m},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,d){e=h(p,d,0)},this.setState=function(p,d,m){const _=p.clippingPlanes,w=p.clipIntersection,u=p.clipShadows,f=i.get(p);if(!r||_===null||_.length===0||a&&!u)a?h(null):c();else{const E=a?0:n,M=E*4;let S=f.clippingState||null;o.value=S,S=h(_,d,M,m);for(let O=0;O!==M;++O)S[O]=e[O];f.clippingState=S,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=E}};function c(){o.value!==e&&(o.value=e,o.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,d,m,_){const w=p!==null?p.length:0;let u=null;if(w!==0){if(u=o.value,_!==!0||u===null){const f=m+w*4,E=d.matrixWorldInverse;l.getNormalMatrix(E),(u===null||u.length<f)&&(u=new Float32Array(f));for(let M=0,S=m;M!==w;++M,S+=4)s.copy(p[M]).applyMatrix4(E,l),s.normal.toArray(u,S),u[S+3]=s.constant}o.value=u,o.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,u}}function pu(i){let t=new WeakMap;function e(s,l){return l===Ma?s.mapping=li:l===wa&&(s.mapping=ci),s}function n(s){if(s&&s.isTexture){const l=s.mapping;if(l===Ma||l===wa)if(t.has(s)){const o=t.get(s).texture;return e(o,s.mapping)}else{const o=s.image;if(o&&o.height>0){const c=new El(o.height);return c.fromEquirectangularTexture(i,s),t.set(s,c),s.addEventListener("dispose",r),e(c.texture,s.mapping)}else return null}}return s}function r(s){const l=s.target;l.removeEventListener("dispose",r);const o=t.get(l);o!==void 0&&(t.delete(l),o.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class mu extends $o{constructor(t=-1,e=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-t,s=n+t,l=r+e,o=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,l-=h*this.view.offsetY,o=l-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,l,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ei=4,Vs=[.125,.215,.35,.446,.526,.582],Ln=20,ia=new mu,ks=new kt;let ra=null,aa=0,sa=0,oa=!1;const Cn=(1+Math.sqrt(5))/2,Qn=1/Cn,Ws=[new H(-Cn,Qn,0),new H(Cn,Qn,0),new H(-Qn,0,Cn),new H(Qn,0,Cn),new H(0,Cn,-Qn),new H(0,Cn,Qn),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class Xs{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){ra=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$s(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ys(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ra,aa,sa),this._renderer.xr.enabled=oa,t.scissorTest=!1,ir(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===li||t.mapping===ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ra=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ue,minFilter:Ue,generateMipmaps:!1,type:Li,format:Fe,colorSpace:xn,depthBuffer:!1},r=qs(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qs(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gu(a)),this._blurMaterial=_u(a,t,e)}return r}_compileMaterial(t){const e=new tn(this._lodPlanes[0],t);this._renderer.compile(e,ia)}_sceneToCubeUV(t,e,n,r){const l=new Ae(90,1,e,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,d=h.toneMapping;h.getClearColor(ks),h.toneMapping=gn,h.autoClear=!1;const m=new Wo({name:"PMREM.Background",side:_e,depthWrite:!1,depthTest:!1}),_=new tn(new Fi,m);let w=!1;const u=t.background;u?u.isColor&&(m.color.copy(u),t.background=null,w=!0):(m.color.copy(ks),w=!0);for(let f=0;f<6;f++){const E=f%3;E===0?(l.up.set(0,o[f],0),l.lookAt(c[f],0,0)):E===1?(l.up.set(0,0,o[f]),l.lookAt(0,c[f],0)):(l.up.set(0,o[f],0),l.lookAt(0,0,c[f]));const M=this._cubeSize;ir(r,E*M,f>2?M:0,M,M),h.setRenderTarget(r),w&&h.render(_,l),h.render(t,l)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=p,t.background=u}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===li||t.mapping===ci;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$s()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ys());const a=r?this._cubemapMaterial:this._equirectMaterial,s=new tn(this._lodPlanes[0],a),l=a.uniforms;l.envMap.value=t;const o=this._cubeSize;ir(e,0,0,3*o,2*o),n.setRenderTarget(e),n.render(s,ia)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),l=Ws[(r-a-1)%Ws.length];this._blur(t,a-1,a,s,l)}e.autoClear=n}_blur(t,e,n,r,a){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,n,r,"latitudinal",a),this._halfBlur(s,t,n,n,r,"longitudinal",a)}_halfBlur(t,e,n,r,a,s,l){const o=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,p=new tn(this._lodPlanes[r],c),d=c.uniforms,m=this._sizeLods[n]-1,_=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*Ln-1),w=a/_,u=isFinite(a)?1+Math.floor(h*w):Ln;u>Ln&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${Ln}`);const f=[];let E=0;for(let b=0;b<Ln;++b){const L=b/w,et=Math.exp(-L*L/2);f.push(et),b===0?E+=et:b<u&&(E+=2*et)}for(let b=0;b<f.length;b++)f[b]=f[b]/E;d.envMap.value=t.texture,d.samples.value=u,d.weights.value=f,d.latitudinal.value=s==="latitudinal",l&&(d.poleAxis.value=l);const{_lodMax:M}=this;d.dTheta.value=_,d.mipInt.value=M-n;const S=this._sizeLods[r],O=3*S*(r>M-ei?r-M+ei:0),C=4*(this._cubeSize-S);ir(e,O,C,3*S,2*S),o.setRenderTarget(e),o.render(p,ia)}}function gu(i){const t=[],e=[],n=[];let r=i;const a=i-ei+1+Vs.length;for(let s=0;s<a;s++){const l=Math.pow(2,r);e.push(l);let o=1/l;s>i-ei?o=Vs[s-i+ei-1]:s===0&&(o=0),n.push(o);const c=1/(l-2),h=-c,p=1+c,d=[h,h,p,h,p,p,h,h,p,p,h,p],m=6,_=6,w=3,u=2,f=1,E=new Float32Array(w*_*m),M=new Float32Array(u*_*m),S=new Float32Array(f*_*m);for(let C=0;C<m;C++){const b=C%3*2/3-1,L=C>2?0:-1,et=[b,L,0,b+2/3,L,0,b+2/3,L+1,0,b,L,0,b+2/3,L+1,0,b,L+1,0];E.set(et,w*_*C),M.set(d,u*_*C);const g=[C,C,C,C,C,C];S.set(g,f*_*C)}const O=new Ve;O.setAttribute("position",new jt(E,w)),O.setAttribute("uv",new jt(M,u)),O.setAttribute("faceIndex",new jt(S,f)),t.push(O),r>ei&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function qs(i,t,e){const n=new Fn(i,t,e);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ir(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function _u(i,t,e){const n=new Float32Array(Ln),r=new H(0,1,0);return new Ge({name:"SphericalGaussianBlur",defines:{n:Ln,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Ys(){return new Ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function $s(){return new Ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function ms(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xu(i){let t=new WeakMap,e=null;function n(l){if(l&&l.isTexture){const o=l.mapping,c=o===Ma||o===wa,h=o===li||o===ci;if(c||h){let p=t.get(l);const d=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==d)return e===null&&(e=new Xs(i)),p=c?e.fromEquirectangular(l,p):e.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,t.set(l,p),p.texture;if(p!==void 0)return p.texture;{const m=l.image;return c&&m&&m.height>0||h&&m&&r(m)?(e===null&&(e=new Xs(i)),p=c?e.fromEquirectangular(l):e.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,t.set(l,p),l.addEventListener("dispose",a),p.texture):null}}}return l}function r(l){let o=0;const c=6;for(let h=0;h<c;h++)l[h]!==void 0&&o++;return o===c}function a(l){const o=l.target;o.removeEventListener("dispose",a);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:s}}function vu(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&gr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function yu(i,t,e,n){const r={},a=new WeakMap;function s(p){const d=p.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const w=d.morphAttributes[_];for(let u=0,f=w.length;u<f;u++)t.remove(w[u])}d.removeEventListener("dispose",s),delete r[d.id];const m=a.get(d);m&&(t.remove(m),a.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function l(p,d){return r[d.id]===!0||(d.addEventListener("dispose",s),r[d.id]=!0,e.memory.geometries++),d}function o(p){const d=p.attributes;for(const _ in d)t.update(d[_],i.ARRAY_BUFFER);const m=p.morphAttributes;for(const _ in m){const w=m[_];for(let u=0,f=w.length;u<f;u++)t.update(w[u],i.ARRAY_BUFFER)}}function c(p){const d=[],m=p.index,_=p.attributes.position;let w=0;if(m!==null){const E=m.array;w=m.version;for(let M=0,S=E.length;M<S;M+=3){const O=E[M+0],C=E[M+1],b=E[M+2];d.push(O,C,C,b,b,O)}}else if(_!==void 0){const E=_.array;w=_.version;for(let M=0,S=E.length/3-1;M<S;M+=3){const O=M+0,C=M+1,b=M+2;d.push(O,C,C,b,b,O)}}else return;const u=new(Bo(d)?qo:Xo)(d,1);u.version=w;const f=a.get(p);f&&t.remove(f),a.set(p,u)}function h(p){const d=a.get(p);if(d){const m=p.index;m!==null&&d.version<m.version&&c(p)}else c(p);return a.get(p)}return{get:l,update:o,getWireframeAttribute:h}}function Mu(i,t,e){let n;function r(d){n=d}let a,s;function l(d){a=d.type,s=d.bytesPerElement}function o(d,m){i.drawElements(n,m,a,d*s),e.update(m,n,1)}function c(d,m,_){_!==0&&(i.drawElementsInstanced(n,m,a,d*s,_),e.update(m,n,_))}function h(d,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,a,d,0,_);let u=0;for(let f=0;f<_;f++)u+=m[f];e.update(u,n,1)}function p(d,m,_,w){if(_===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let f=0;f<d.length;f++)c(d[f]/s,m[f],w[f]);else{u.multiDrawElementsInstancedWEBGL(n,m,0,a,d,0,w,0,_);let f=0;for(let E=0;E<_;E++)f+=m[E];for(let E=0;E<w.length;E++)e.update(f,n,w[E])}}this.setMode=r,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function wu(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,s,l){switch(e.calls++,s){case i.TRIANGLES:e.triangles+=l*(a/3);break;case i.LINES:e.lines+=l*(a/2);break;case i.LINE_STRIP:e.lines+=l*(a-1);break;case i.LINE_LOOP:e.lines+=l*a;break;case i.POINTS:e.points+=l*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Su(i,t,e){const n=new WeakMap,r=new ne;function a(s,l,o){const c=s.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=h!==void 0?h.length:0;let d=n.get(l);if(d===void 0||d.count!==p){let g=function(){L.dispose(),n.delete(l),l.removeEventListener("dispose",g)};var m=g;d!==void 0&&d.texture.dispose();const _=l.morphAttributes.position!==void 0,w=l.morphAttributes.normal!==void 0,u=l.morphAttributes.color!==void 0,f=l.morphAttributes.position||[],E=l.morphAttributes.normal||[],M=l.morphAttributes.color||[];let S=0;_===!0&&(S=1),w===!0&&(S=2),u===!0&&(S=3);let O=l.attributes.position.count*S,C=1;O>t.maxTextureSize&&(C=Math.ceil(O/t.maxTextureSize),O=t.maxTextureSize);const b=new Float32Array(O*C*4*p),L=new Ho(b,O,C,p);L.type=Je,L.needsUpdate=!0;const et=S*4;for(let y=0;y<p;y++){const V=f[y],G=E[y],Y=M[y],K=O*C*4*y;for(let X=0;X<V.count;X++){const P=X*et;_===!0&&(r.fromBufferAttribute(V,X),b[K+P+0]=r.x,b[K+P+1]=r.y,b[K+P+2]=r.z,b[K+P+3]=0),w===!0&&(r.fromBufferAttribute(G,X),b[K+P+4]=r.x,b[K+P+5]=r.y,b[K+P+6]=r.z,b[K+P+7]=0),u===!0&&(r.fromBufferAttribute(Y,X),b[K+P+8]=r.x,b[K+P+9]=r.y,b[K+P+10]=r.z,b[K+P+11]=Y.itemSize===4?r.w:1)}}d={count:p,texture:L,size:new Kt(O,C)},n.set(l,d),l.addEventListener("dispose",g)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,e);else{let _=0;for(let u=0;u<c.length;u++)_+=c[u];const w=l.morphTargetsRelative?1:1-_;o.getUniforms().setValue(i,"morphTargetBaseInfluence",w),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),o.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:a}}function Eu(i,t,e,n){let r=new WeakMap;function a(o){const c=n.render.frame,h=o.geometry,p=t.get(o,h);if(r.get(p)!==c&&(t.update(p),r.set(p,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",l)===!1&&o.addEventListener("dispose",l),r.get(o)!==c&&(e.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&e.update(o.instanceColor,i.ARRAY_BUFFER),r.set(o,c))),o.isSkinnedMesh){const d=o.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return p}function s(){r=new WeakMap}function l(o){const c=o.target;c.removeEventListener("dispose",l),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:a,dispose:s}}class Jo extends xe{constructor(t,e,n,r,a,s,l,o,c,h=ri){if(h!==ri&&h!==ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ri&&(n=Nn),n===void 0&&h===ui&&(n=fi),super(null,r,a,s,l,o,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=l!==void 0?l:Re,this.minFilter=o!==void 0?o:Re,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Qo=new xe,Ks=new Jo(1,1),t0=new Ho,e0=new ll,n0=new Ko,Zs=[],js=[],Js=new Float32Array(16),Qs=new Float32Array(9),to=new Float32Array(4);function pi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let a=Zs[r];if(a===void 0&&(a=new Float32Array(r),Zs[r]=a),t!==0){n.toArray(a,0);for(let s=1,l=0;s!==t;++s)l+=e,i[s].toArray(a,l)}return a}function oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Cr(i,t){let e=js[t];e===void 0&&(e=new Int32Array(t),js[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Tu(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2fv(this.addr,t),le(e,t)}}function Au(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(oe(e,t))return;i.uniform3fv(this.addr,t),le(e,t)}}function Ru(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4fv(this.addr,t),le(e,t)}}function Cu(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;to.set(n),i.uniformMatrix2fv(this.addr,!1,to),le(e,n)}}function Pu(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;Qs.set(n),i.uniformMatrix3fv(this.addr,!1,Qs),le(e,n)}}function Lu(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;Js.set(n),i.uniformMatrix4fv(this.addr,!1,Js),le(e,n)}}function Du(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Iu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2iv(this.addr,t),le(e,t)}}function Uu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3iv(this.addr,t),le(e,t)}}function Nu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4iv(this.addr,t),le(e,t)}}function Fu(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ou(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2uiv(this.addr,t),le(e,t)}}function Bu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3uiv(this.addr,t),le(e,t)}}function zu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4uiv(this.addr,t),le(e,t)}}function Hu(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let a;this.type===i.SAMPLER_2D_SHADOW?(Ks.compareFunction=Oo,a=Ks):a=Qo,e.setTexture2D(t||a,r)}function Gu(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||e0,r)}function Vu(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||n0,r)}function ku(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||t0,r)}function Wu(i){switch(i){case 5126:return Tu;case 35664:return bu;case 35665:return Au;case 35666:return Ru;case 35674:return Cu;case 35675:return Pu;case 35676:return Lu;case 5124:case 35670:return Du;case 35667:case 35671:return Iu;case 35668:case 35672:return Uu;case 35669:case 35673:return Nu;case 5125:return Fu;case 36294:return Ou;case 36295:return Bu;case 36296:return zu;case 35678:case 36198:case 36298:case 36306:case 35682:return Hu;case 35679:case 36299:case 36307:return Gu;case 35680:case 36300:case 36308:case 36293:return Vu;case 36289:case 36303:case 36311:case 36292:return ku}}function Xu(i,t){i.uniform1fv(this.addr,t)}function qu(i,t){const e=pi(t,this.size,2);i.uniform2fv(this.addr,e)}function Yu(i,t){const e=pi(t,this.size,3);i.uniform3fv(this.addr,e)}function $u(i,t){const e=pi(t,this.size,4);i.uniform4fv(this.addr,e)}function Ku(i,t){const e=pi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zu(i,t){const e=pi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ju(i,t){const e=pi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ju(i,t){i.uniform1iv(this.addr,t)}function Qu(i,t){i.uniform2iv(this.addr,t)}function th(i,t){i.uniform3iv(this.addr,t)}function eh(i,t){i.uniform4iv(this.addr,t)}function nh(i,t){i.uniform1uiv(this.addr,t)}function ih(i,t){i.uniform2uiv(this.addr,t)}function rh(i,t){i.uniform3uiv(this.addr,t)}function ah(i,t){i.uniform4uiv(this.addr,t)}function sh(i,t,e){const n=this.cache,r=t.length,a=Cr(e,r);oe(n,a)||(i.uniform1iv(this.addr,a),le(n,a));for(let s=0;s!==r;++s)e.setTexture2D(t[s]||Qo,a[s])}function oh(i,t,e){const n=this.cache,r=t.length,a=Cr(e,r);oe(n,a)||(i.uniform1iv(this.addr,a),le(n,a));for(let s=0;s!==r;++s)e.setTexture3D(t[s]||e0,a[s])}function lh(i,t,e){const n=this.cache,r=t.length,a=Cr(e,r);oe(n,a)||(i.uniform1iv(this.addr,a),le(n,a));for(let s=0;s!==r;++s)e.setTextureCube(t[s]||n0,a[s])}function ch(i,t,e){const n=this.cache,r=t.length,a=Cr(e,r);oe(n,a)||(i.uniform1iv(this.addr,a),le(n,a));for(let s=0;s!==r;++s)e.setTexture2DArray(t[s]||t0,a[s])}function fh(i){switch(i){case 5126:return Xu;case 35664:return qu;case 35665:return Yu;case 35666:return $u;case 35674:return Ku;case 35675:return Zu;case 35676:return ju;case 5124:case 35670:return Ju;case 35667:case 35671:return Qu;case 35668:case 35672:return th;case 35669:case 35673:return eh;case 5125:return nh;case 36294:return ih;case 36295:return rh;case 36296:return ah;case 35678:case 36198:case 36298:case 36306:case 35682:return sh;case 35679:case 36299:case 36307:return oh;case 35680:case 36300:case 36308:case 36293:return lh;case 36289:case 36303:case 36311:case 36292:return ch}}class uh{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wu(e.type)}}class hh{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fh(e.type)}}class dh{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const l=r[a];l.setValue(t,e[l.id],n)}}}const la=/(\w+)(\])?(\[|\.)?/g;function eo(i,t){i.seq.push(t),i.map[t.id]=t}function ph(i,t,e){const n=i.name,r=n.length;for(la.lastIndex=0;;){const a=la.exec(n),s=la.lastIndex;let l=a[1];const o=a[2]==="]",c=a[3];if(o&&(l=l|0),c===void 0||c==="["&&s+2===r){eo(e,c===void 0?new uh(l,i,t):new hh(l,i,t));break}else{let p=e.map[l];p===void 0&&(p=new dh(l),eo(e,p)),e=p}}}class _r{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=t.getActiveUniform(e,r),s=t.getUniformLocation(e,a.name);ph(a,s,this)}}setValue(t,e,n,r){const a=this.map[e];a!==void 0&&a.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let a=0,s=e.length;a!==s;++a){const l=e[a],o=n[l.id];o.needsUpdate!==!1&&l.setValue(t,o.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,a=t.length;r!==a;++r){const s=t[r];s.id in e&&n.push(s)}return n}}function no(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const mh=37297;let gh=0;function _h(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let s=r;s<a;s++){const l=s+1;n.push(`${l===t?">":" "} ${l}: ${e[s]}`)}return n.join(`
`)}function xh(i){const t=Yt.getPrimaries(Yt.workingColorSpace),e=Yt.getPrimaries(i);let n;switch(t===e?n="":t===wr&&e===Mr?n="LinearDisplayP3ToLinearSRGB":t===Mr&&e===wr&&(n="LinearSRGBToLinearDisplayP3"),i){case xn:case br:return[n,"LinearTransferOETF"];case ze:case ps:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function io(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const s=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+_h(i.getShaderSource(t),s)}else return r}function vh(i,t){const e=xh(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function yh(i,t){let e;switch(t){case I0:e="Linear";break;case U0:e="Reinhard";break;case N0:e="Cineon";break;case F0:e="ACESFilmic";break;case B0:e="AgX";break;case z0:e="Neutral";break;case O0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const rr=new H;function Mh(){Yt.getLuminanceCoefficients(rr);const i=rr.x.toFixed(4),t=rr.y.toFixed(4),e=rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wh(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ci).join(`
`)}function Sh(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Eh(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=i.getActiveAttrib(t,r),s=a.name;let l=1;a.type===i.FLOAT_MAT2&&(l=2),a.type===i.FLOAT_MAT3&&(l=3),a.type===i.FLOAT_MAT4&&(l=4),e[s]={type:a.type,location:i.getAttribLocation(t,s),locationSize:l}}return e}function Ci(i){return i!==""}function ro(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ao(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Th=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ja(i){return i.replace(Th,Ah)}const bh=new Map;function Ah(i,t){let e=Ft[t];if(e===void 0){const n=bh.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ja(e)}const Rh=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function so(i){return i.replace(Rh,Ch)}function Ch(i,t,e,n){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function oo(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ph(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Eo?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===h0?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ke&&(t="SHADOWMAP_TYPE_VSM"),t}function Lh(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case li:case ci:t="ENVMAP_TYPE_CUBE";break;case Tr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Dh(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ci:t="ENVMAP_MODE_REFRACTION";break}return t}function Ih(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case To:t="ENVMAP_BLENDING_MULTIPLY";break;case L0:t="ENVMAP_BLENDING_MIX";break;case D0:t="ENVMAP_BLENDING_ADD";break}return t}function Uh(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Nh(i,t,e,n){const r=i.getContext(),a=e.defines;let s=e.vertexShader,l=e.fragmentShader;const o=Ph(e),c=Lh(e),h=Dh(e),p=Ih(e),d=Uh(e),m=wh(e),_=Sh(a),w=r.createProgram();let u,f,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ci).join(`
`),u.length>0&&(u+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ci).join(`
`),f.length>0&&(f+=`
`)):(u=[oo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ci).join(`
`),f=[oo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gn?"#define TONE_MAPPING":"",e.toneMapping!==gn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==gn?yh("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,vh("linearToOutputTexel",e.outputColorSpace),Mh(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ci).join(`
`)),s=Ja(s),s=ro(s,e),s=ao(s,e),l=Ja(l),l=ro(l,e),l=ao(l,e),s=so(s),l=so(l),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,u=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,f=["#define varying in",e.glslVersion===Es?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Es?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=E+u+s,S=E+f+l,O=no(r,r.VERTEX_SHADER,M),C=no(r,r.FRAGMENT_SHADER,S);r.attachShader(w,O),r.attachShader(w,C),e.index0AttributeName!==void 0?r.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function b(y){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(w).trim(),G=r.getShaderInfoLog(O).trim(),Y=r.getShaderInfoLog(C).trim();let K=!0,X=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,w,O,C);else{const P=io(r,O,"vertex"),U=io(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+V+`
`+P+`
`+U)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(G===""||Y==="")&&(X=!1);X&&(y.diagnostics={runnable:K,programLog:V,vertexShader:{log:G,prefix:u},fragmentShader:{log:Y,prefix:f}})}r.deleteShader(O),r.deleteShader(C),L=new _r(r,w),et=Eh(r,w)}let L;this.getUniforms=function(){return L===void 0&&b(this),L};let et;this.getAttributes=function(){return et===void 0&&b(this),et};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=r.getProgramParameter(w,mh)),g},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gh++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=O,this.fragmentShader=C,this}let Fh=0;class Oh{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(n),s=this._getShaderCacheForMaterial(t);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Bh(t),e.set(t,n)),n}}class Bh{constructor(t){this.id=Fh++,this.code=t,this.usedTimes=0}}function zh(i,t,e,n,r,a,s){const l=new Vo,o=new Oh,c=new Set,h=[],p=r.logarithmicDepthBuffer,d=r.reverseDepthBuffer,m=r.vertexTextures;let _=r.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(g){return c.add(g),g===0?"uv":`uv${g}`}function f(g,y,V,G,Y){const K=G.fog,X=Y.geometry,P=g.isMeshStandardMaterial?G.environment:null,U=(g.isMeshStandardMaterial?e:t).get(g.envMap||P),N=U&&U.mapping===Tr?U.image.height:null,j=w[g.type];g.precision!==null&&(_=r.getMaxPrecision(g.precision),_!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",_,"instead."));const q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,_t=q!==void 0?q.length:0;let Lt=0;X.morphAttributes.position!==void 0&&(Lt=1),X.morphAttributes.normal!==void 0&&(Lt=2),X.morphAttributes.color!==void 0&&(Lt=3);let k,J,st,ut;if(j){const se=He[j];k=se.vertexShader,J=se.fragmentShader}else k=g.vertexShader,J=g.fragmentShader,o.update(g),st=o.getVertexShaderID(g),ut=o.getFragmentShaderID(g);const Ct=i.getRenderTarget(),bt=Y.isInstancedMesh===!0,Bt=Y.isBatchedMesh===!0,wt=!!g.map,Et=!!g.matcap,A=!!U,de=!!g.aoMap,Nt=!!g.lightMap,zt=!!g.bumpMap,Rt=!!g.normalMap,Wt=!!g.displacementMap,Pt=!!g.emissiveMap,T=!!g.metalnessMap,x=!!g.roughnessMap,F=g.anisotropy>0,Z=g.clearcoat>0,nt=g.dispersion>0,$=g.iridescence>0,xt=g.sheen>0,at=g.transmission>0,ht=F&&!!g.anisotropyMap,Gt=Z&&!!g.clearcoatMap,it=Z&&!!g.clearcoatNormalMap,mt=Z&&!!g.clearcoatRoughnessMap,vt=$&&!!g.iridescenceMap,tt=$&&!!g.iridescenceThicknessMap,dt=xt&&!!g.sheenColorMap,At=xt&&!!g.sheenRoughnessMap,gt=!!g.specularMap,Dt=!!g.specularColorMap,R=!!g.specularIntensityMap,ft=at&&!!g.transmissionMap,W=at&&!!g.thicknessMap,Q=!!g.gradientMap,lt=!!g.alphaMap,ct=g.alphaTest>0,Ht=!!g.alphaHash,Zt=!!g.extensions;let ae=gn;g.toneMapped&&(Ct===null||Ct.isXRRenderTarget===!0)&&(ae=i.toneMapping);const Vt={shaderID:j,shaderType:g.type,shaderName:g.name,vertexShader:k,fragmentShader:J,defines:g.defines,customVertexShaderID:st,customFragmentShaderID:ut,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:_,batching:Bt,batchingColor:Bt&&Y._colorsTexture!==null,instancing:bt,instancingColor:bt&&Y.instanceColor!==null,instancingMorph:bt&&Y.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Ct===null?i.outputColorSpace:Ct.isXRRenderTarget===!0?Ct.texture.colorSpace:xn,alphaToCoverage:!!g.alphaToCoverage,map:wt,matcap:Et,envMap:A,envMapMode:A&&U.mapping,envMapCubeUVHeight:N,aoMap:de,lightMap:Nt,bumpMap:zt,normalMap:Rt,displacementMap:m&&Wt,emissiveMap:Pt,normalMapObjectSpace:Rt&&g.normalMapType===W0,normalMapTangentSpace:Rt&&g.normalMapType===k0,metalnessMap:T,roughnessMap:x,anisotropy:F,anisotropyMap:ht,clearcoat:Z,clearcoatMap:Gt,clearcoatNormalMap:it,clearcoatRoughnessMap:mt,dispersion:nt,iridescence:$,iridescenceMap:vt,iridescenceThicknessMap:tt,sheen:xt,sheenColorMap:dt,sheenRoughnessMap:At,specularMap:gt,specularColorMap:Dt,specularIntensityMap:R,transmission:at,transmissionMap:ft,thicknessMap:W,gradientMap:Q,opaque:g.transparent===!1&&g.blending===ii&&g.alphaToCoverage===!1,alphaMap:lt,alphaTest:ct,alphaHash:Ht,combine:g.combine,mapUv:wt&&u(g.map.channel),aoMapUv:de&&u(g.aoMap.channel),lightMapUv:Nt&&u(g.lightMap.channel),bumpMapUv:zt&&u(g.bumpMap.channel),normalMapUv:Rt&&u(g.normalMap.channel),displacementMapUv:Wt&&u(g.displacementMap.channel),emissiveMapUv:Pt&&u(g.emissiveMap.channel),metalnessMapUv:T&&u(g.metalnessMap.channel),roughnessMapUv:x&&u(g.roughnessMap.channel),anisotropyMapUv:ht&&u(g.anisotropyMap.channel),clearcoatMapUv:Gt&&u(g.clearcoatMap.channel),clearcoatNormalMapUv:it&&u(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&u(g.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&u(g.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&u(g.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&u(g.sheenColorMap.channel),sheenRoughnessMapUv:At&&u(g.sheenRoughnessMap.channel),specularMapUv:gt&&u(g.specularMap.channel),specularColorMapUv:Dt&&u(g.specularColorMap.channel),specularIntensityMapUv:R&&u(g.specularIntensityMap.channel),transmissionMapUv:ft&&u(g.transmissionMap.channel),thicknessMapUv:W&&u(g.thicknessMap.channel),alphaMapUv:lt&&u(g.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Rt||F),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!X.attributes.uv&&(wt||lt),fog:!!K,useFog:g.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:d,skinning:Y.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Lt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&V.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:wt&&g.map.isVideoTexture===!0&&Yt.getTransfer(g.map.colorSpace)===Qt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Ze,flipSided:g.side===_e,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Zt&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&g.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Vt.vertexUv1s=c.has(1),Vt.vertexUv2s=c.has(2),Vt.vertexUv3s=c.has(3),c.clear(),Vt}function E(g){const y=[];if(g.shaderID?y.push(g.shaderID):(y.push(g.customVertexShaderID),y.push(g.customFragmentShaderID)),g.defines!==void 0)for(const V in g.defines)y.push(V),y.push(g.defines[V]);return g.isRawShaderMaterial===!1&&(M(y,g),S(y,g),y.push(i.outputColorSpace)),y.push(g.customProgramCacheKey),y.join()}function M(g,y){g.push(y.precision),g.push(y.outputColorSpace),g.push(y.envMapMode),g.push(y.envMapCubeUVHeight),g.push(y.mapUv),g.push(y.alphaMapUv),g.push(y.lightMapUv),g.push(y.aoMapUv),g.push(y.bumpMapUv),g.push(y.normalMapUv),g.push(y.displacementMapUv),g.push(y.emissiveMapUv),g.push(y.metalnessMapUv),g.push(y.roughnessMapUv),g.push(y.anisotropyMapUv),g.push(y.clearcoatMapUv),g.push(y.clearcoatNormalMapUv),g.push(y.clearcoatRoughnessMapUv),g.push(y.iridescenceMapUv),g.push(y.iridescenceThicknessMapUv),g.push(y.sheenColorMapUv),g.push(y.sheenRoughnessMapUv),g.push(y.specularMapUv),g.push(y.specularColorMapUv),g.push(y.specularIntensityMapUv),g.push(y.transmissionMapUv),g.push(y.thicknessMapUv),g.push(y.combine),g.push(y.fogExp2),g.push(y.sizeAttenuation),g.push(y.morphTargetsCount),g.push(y.morphAttributeCount),g.push(y.numDirLights),g.push(y.numPointLights),g.push(y.numSpotLights),g.push(y.numSpotLightMaps),g.push(y.numHemiLights),g.push(y.numRectAreaLights),g.push(y.numDirLightShadows),g.push(y.numPointLightShadows),g.push(y.numSpotLightShadows),g.push(y.numSpotLightShadowsWithMaps),g.push(y.numLightProbes),g.push(y.shadowMapType),g.push(y.toneMapping),g.push(y.numClippingPlanes),g.push(y.numClipIntersection),g.push(y.depthPacking)}function S(g,y){l.disableAll(),y.supportsVertexTextures&&l.enable(0),y.instancing&&l.enable(1),y.instancingColor&&l.enable(2),y.instancingMorph&&l.enable(3),y.matcap&&l.enable(4),y.envMap&&l.enable(5),y.normalMapObjectSpace&&l.enable(6),y.normalMapTangentSpace&&l.enable(7),y.clearcoat&&l.enable(8),y.iridescence&&l.enable(9),y.alphaTest&&l.enable(10),y.vertexColors&&l.enable(11),y.vertexAlphas&&l.enable(12),y.vertexUv1s&&l.enable(13),y.vertexUv2s&&l.enable(14),y.vertexUv3s&&l.enable(15),y.vertexTangents&&l.enable(16),y.anisotropy&&l.enable(17),y.alphaHash&&l.enable(18),y.batching&&l.enable(19),y.dispersion&&l.enable(20),y.batchingColor&&l.enable(21),g.push(l.mask),l.disableAll(),y.fog&&l.enable(0),y.useFog&&l.enable(1),y.flatShading&&l.enable(2),y.logarithmicDepthBuffer&&l.enable(3),y.reverseDepthBuffer&&l.enable(4),y.skinning&&l.enable(5),y.morphTargets&&l.enable(6),y.morphNormals&&l.enable(7),y.morphColors&&l.enable(8),y.premultipliedAlpha&&l.enable(9),y.shadowMapEnabled&&l.enable(10),y.doubleSided&&l.enable(11),y.flipSided&&l.enable(12),y.useDepthPacking&&l.enable(13),y.dithering&&l.enable(14),y.transmission&&l.enable(15),y.sheen&&l.enable(16),y.opaque&&l.enable(17),y.pointsUvs&&l.enable(18),y.decodeVideoTexture&&l.enable(19),y.alphaToCoverage&&l.enable(20),g.push(l.mask)}function O(g){const y=w[g.type];let V;if(y){const G=He[y];V=yl.clone(G.uniforms)}else V=g.uniforms;return V}function C(g,y){let V;for(let G=0,Y=h.length;G<Y;G++){const K=h[G];if(K.cacheKey===y){V=K,++V.usedTimes;break}}return V===void 0&&(V=new Nh(i,y,g,a),h.push(V)),V}function b(g){if(--g.usedTimes===0){const y=h.indexOf(g);h[y]=h[h.length-1],h.pop(),g.destroy()}}function L(g){o.remove(g)}function et(){o.dispose()}return{getParameters:f,getProgramCacheKey:E,getUniforms:O,acquireProgram:C,releaseProgram:b,releaseShaderCache:L,programs:h,dispose:et}}function Hh(){let i=new WeakMap;function t(s){return i.has(s)}function e(s){let l=i.get(s);return l===void 0&&(l={},i.set(s,l)),l}function n(s){i.delete(s)}function r(s,l,o){i.get(s)[l]=o}function a(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:a}}function Gh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function lo(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function co(){const i=[];let t=0;const e=[],n=[],r=[];function a(){t=0,e.length=0,n.length=0,r.length=0}function s(p,d,m,_,w,u){let f=i[t];return f===void 0?(f={id:p.id,object:p,geometry:d,material:m,groupOrder:_,renderOrder:p.renderOrder,z:w,group:u},i[t]=f):(f.id=p.id,f.object=p,f.geometry=d,f.material=m,f.groupOrder=_,f.renderOrder=p.renderOrder,f.z=w,f.group=u),t++,f}function l(p,d,m,_,w,u){const f=s(p,d,m,_,w,u);m.transmission>0?n.push(f):m.transparent===!0?r.push(f):e.push(f)}function o(p,d,m,_,w,u){const f=s(p,d,m,_,w,u);m.transmission>0?n.unshift(f):m.transparent===!0?r.unshift(f):e.unshift(f)}function c(p,d){e.length>1&&e.sort(p||Gh),n.length>1&&n.sort(d||lo),r.length>1&&r.sort(d||lo)}function h(){for(let p=t,d=i.length;p<d;p++){const m=i[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:a,push:l,unshift:o,finish:h,sort:c}}function Vh(){let i=new WeakMap;function t(n,r){const a=i.get(n);let s;return a===void 0?(s=new co,i.set(n,[s])):r>=a.length?(s=new co,a.push(s)):s=a[r],s}function e(){i=new WeakMap}return{get:t,dispose:e}}function kh(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new kt};break;case"SpotLight":e={position:new H,direction:new H,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function Wh(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Xh=0;function qh(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Yh(i){const t=new kh,e=Wh(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const r=new H,a=new ie,s=new ie;function l(c){let h=0,p=0,d=0;for(let et=0;et<9;et++)n.probe[et].set(0,0,0);let m=0,_=0,w=0,u=0,f=0,E=0,M=0,S=0,O=0,C=0,b=0;c.sort(qh);for(let et=0,g=c.length;et<g;et++){const y=c[et],V=y.color,G=y.intensity,Y=y.distance,K=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=V.r*G,p+=V.g*G,d+=V.b*G;else if(y.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(y.sh.coefficients[X],G);b++}else if(y.isDirectionalLight){const X=t.get(y);if(X.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const P=y.shadow,U=e.get(y);U.shadowIntensity=P.intensity,U.shadowBias=P.bias,U.shadowNormalBias=P.normalBias,U.shadowRadius=P.radius,U.shadowMapSize=P.mapSize,n.directionalShadow[m]=U,n.directionalShadowMap[m]=K,n.directionalShadowMatrix[m]=y.shadow.matrix,E++}n.directional[m]=X,m++}else if(y.isSpotLight){const X=t.get(y);X.position.setFromMatrixPosition(y.matrixWorld),X.color.copy(V).multiplyScalar(G),X.distance=Y,X.coneCos=Math.cos(y.angle),X.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),X.decay=y.decay,n.spot[w]=X;const P=y.shadow;if(y.map&&(n.spotLightMap[O]=y.map,O++,P.updateMatrices(y),y.castShadow&&C++),n.spotLightMatrix[w]=P.matrix,y.castShadow){const U=e.get(y);U.shadowIntensity=P.intensity,U.shadowBias=P.bias,U.shadowNormalBias=P.normalBias,U.shadowRadius=P.radius,U.shadowMapSize=P.mapSize,n.spotShadow[w]=U,n.spotShadowMap[w]=K,S++}w++}else if(y.isRectAreaLight){const X=t.get(y);X.color.copy(V).multiplyScalar(G),X.halfWidth.set(y.width*.5,0,0),X.halfHeight.set(0,y.height*.5,0),n.rectArea[u]=X,u++}else if(y.isPointLight){const X=t.get(y);if(X.color.copy(y.color).multiplyScalar(y.intensity),X.distance=y.distance,X.decay=y.decay,y.castShadow){const P=y.shadow,U=e.get(y);U.shadowIntensity=P.intensity,U.shadowBias=P.bias,U.shadowNormalBias=P.normalBias,U.shadowRadius=P.radius,U.shadowMapSize=P.mapSize,U.shadowCameraNear=P.camera.near,U.shadowCameraFar=P.camera.far,n.pointShadow[_]=U,n.pointShadowMap[_]=K,n.pointShadowMatrix[_]=y.shadow.matrix,M++}n.point[_]=X,_++}else if(y.isHemisphereLight){const X=t.get(y);X.skyColor.copy(y.color).multiplyScalar(G),X.groundColor.copy(y.groundColor).multiplyScalar(G),n.hemi[f]=X,f++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==m||L.pointLength!==_||L.spotLength!==w||L.rectAreaLength!==u||L.hemiLength!==f||L.numDirectionalShadows!==E||L.numPointShadows!==M||L.numSpotShadows!==S||L.numSpotMaps!==O||L.numLightProbes!==b)&&(n.directional.length=m,n.spot.length=w,n.rectArea.length=u,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=S+O-C,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=b,L.directionalLength=m,L.pointLength=_,L.spotLength=w,L.rectAreaLength=u,L.hemiLength=f,L.numDirectionalShadows=E,L.numPointShadows=M,L.numSpotShadows=S,L.numSpotMaps=O,L.numLightProbes=b,n.version=Xh++)}function o(c,h){let p=0,d=0,m=0,_=0,w=0;const u=h.matrixWorldInverse;for(let f=0,E=c.length;f<E;f++){const M=c[f];if(M.isDirectionalLight){const S=n.directional[p];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(u),p++}else if(M.isSpotLight){const S=n.spot[m];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(u),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(u),m++}else if(M.isRectAreaLight){const S=n.rectArea[_];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(u),s.identity(),a.copy(M.matrixWorld),a.premultiply(u),s.extractRotation(a),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),_++}else if(M.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(u),d++}else if(M.isHemisphereLight){const S=n.hemi[w];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(u),w++}}}return{setup:l,setupView:o,state:n}}function fo(i){const t=new Yh(i),e=[],n=[];function r(h){c.camera=h,e.length=0,n.length=0}function a(h){e.push(h)}function s(h){n.push(h)}function l(){t.setup(e)}function o(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:l,setupLightsView:o,pushLight:a,pushShadow:s}}function $h(i){let t=new WeakMap;function e(r,a=0){const s=t.get(r);let l;return s===void 0?(l=new fo(i),t.set(r,[l])):a>=s.length?(l=new fo(i),s.push(l)):l=s[a],l}function n(){t=new WeakMap}return{get:e,dispose:n}}class Kh extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=G0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Zh extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const jh=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jh=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qh(i,t,e){let n=new Zo;const r=new Kt,a=new Kt,s=new ne,l=new Kh({depthPacking:V0}),o=new Zh,c={},h=e.maxTextureSize,p={[_n]:_e,[_e]:_n,[Ze]:Ze},d=new Ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kt},radius:{value:4}},vertexShader:jh,fragmentShader:Jh}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Ve;_.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new tn(_,d),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eo;let f=this.type;this.render=function(C,b,L){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||C.length===0)return;const et=i.getRenderTarget(),g=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),V=i.state;V.setBlending(mn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const G=f!==Ke&&this.type===Ke,Y=f===Ke&&this.type!==Ke;for(let K=0,X=C.length;K<X;K++){const P=C[K],U=P.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",P,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const N=U.getFrameExtents();if(r.multiply(N),a.copy(U.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/N.x),r.x=a.x*N.x,U.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/N.y),r.y=a.y*N.y,U.mapSize.y=a.y)),U.map===null||G===!0||Y===!0){const q=this.type!==Ke?{minFilter:Re,magFilter:Re}:{};U.map!==null&&U.map.dispose(),U.map=new Fn(r.x,r.y,q),U.map.texture.name=P.name+".shadowMap",U.camera.updateProjectionMatrix()}i.setRenderTarget(U.map),i.clear();const j=U.getViewportCount();for(let q=0;q<j;q++){const _t=U.getViewport(q);s.set(a.x*_t.x,a.y*_t.y,a.x*_t.z,a.y*_t.w),V.viewport(s),U.updateMatrices(P,q),n=U.getFrustum(),S(b,L,U.camera,P,this.type)}U.isPointLightShadow!==!0&&this.type===Ke&&E(U,L),U.needsUpdate=!1}f=this.type,u.needsUpdate=!1,i.setRenderTarget(et,g,y)};function E(C,b){const L=t.update(w);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Fn(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(b,null,L,d,w,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(b,null,L,m,w,null)}function M(C,b,L,et){let g=null;const y=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(y!==void 0)g=y;else if(g=L.isPointLight===!0?o:l,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const V=g.uuid,G=b.uuid;let Y=c[V];Y===void 0&&(Y={},c[V]=Y);let K=Y[G];K===void 0&&(K=g.clone(),Y[G]=K,b.addEventListener("dispose",O)),g=K}if(g.visible=b.visible,g.wireframe=b.wireframe,et===Ke?g.side=b.shadowSide!==null?b.shadowSide:b.side:g.side=b.shadowSide!==null?b.shadowSide:p[b.side],g.alphaMap=b.alphaMap,g.alphaTest=b.alphaTest,g.map=b.map,g.clipShadows=b.clipShadows,g.clippingPlanes=b.clippingPlanes,g.clipIntersection=b.clipIntersection,g.displacementMap=b.displacementMap,g.displacementScale=b.displacementScale,g.displacementBias=b.displacementBias,g.wireframeLinewidth=b.wireframeLinewidth,g.linewidth=b.linewidth,L.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const V=i.properties.get(g);V.light=L}return g}function S(C,b,L,et,g){if(C.visible===!1)return;if(C.layers.test(b.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&g===Ke)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const G=t.update(C),Y=C.material;if(Array.isArray(Y)){const K=G.groups;for(let X=0,P=K.length;X<P;X++){const U=K[X],N=Y[U.materialIndex];if(N&&N.visible){const j=M(C,N,et,g);C.onBeforeShadow(i,C,b,L,G,j,U),i.renderBufferDirect(L,null,G,j,C,U),C.onAfterShadow(i,C,b,L,G,j,U)}}}else if(Y.visible){const K=M(C,Y,et,g);C.onBeforeShadow(i,C,b,L,G,K,null),i.renderBufferDirect(L,null,G,K,C,null),C.onAfterShadow(i,C,b,L,G,K,null)}}const V=C.children;for(let G=0,Y=V.length;G<Y;G++)S(V[G],b,L,et,g)}function O(C){C.target.removeEventListener("dispose",O);for(const L in c){const et=c[L],g=C.target.uuid;g in et&&(et[g].dispose(),delete et[g])}}}const td={[pa]:ma,[ga]:va,[_a]:ya,[oi]:xa,[ma]:pa,[va]:ga,[ya]:_a,[xa]:oi};function ed(i){function t(){let R=!1;const ft=new ne;let W=null;const Q=new ne(0,0,0,0);return{setMask:function(lt){W!==lt&&!R&&(i.colorMask(lt,lt,lt,lt),W=lt)},setLocked:function(lt){R=lt},setClear:function(lt,ct,Ht,Zt,ae){ae===!0&&(lt*=Zt,ct*=Zt,Ht*=Zt),ft.set(lt,ct,Ht,Zt),Q.equals(ft)===!1&&(i.clearColor(lt,ct,Ht,Zt),Q.copy(ft))},reset:function(){R=!1,W=null,Q.set(-1,0,0,0)}}}function e(){let R=!1,ft=!1,W=null,Q=null,lt=null;return{setReversed:function(ct){ft=ct},setTest:function(ct){ct?st(i.DEPTH_TEST):ut(i.DEPTH_TEST)},setMask:function(ct){W!==ct&&!R&&(i.depthMask(ct),W=ct)},setFunc:function(ct){if(ft&&(ct=td[ct]),Q!==ct){switch(ct){case pa:i.depthFunc(i.NEVER);break;case ma:i.depthFunc(i.ALWAYS);break;case ga:i.depthFunc(i.LESS);break;case oi:i.depthFunc(i.LEQUAL);break;case _a:i.depthFunc(i.EQUAL);break;case xa:i.depthFunc(i.GEQUAL);break;case va:i.depthFunc(i.GREATER);break;case ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ct}},setLocked:function(ct){R=ct},setClear:function(ct){lt!==ct&&(i.clearDepth(ct),lt=ct)},reset:function(){R=!1,W=null,Q=null,lt=null}}}function n(){let R=!1,ft=null,W=null,Q=null,lt=null,ct=null,Ht=null,Zt=null,ae=null;return{setTest:function(Vt){R||(Vt?st(i.STENCIL_TEST):ut(i.STENCIL_TEST))},setMask:function(Vt){ft!==Vt&&!R&&(i.stencilMask(Vt),ft=Vt)},setFunc:function(Vt,se,ye){(W!==Vt||Q!==se||lt!==ye)&&(i.stencilFunc(Vt,se,ye),W=Vt,Q=se,lt=ye)},setOp:function(Vt,se,ye){(ct!==Vt||Ht!==se||Zt!==ye)&&(i.stencilOp(Vt,se,ye),ct=Vt,Ht=se,Zt=ye)},setLocked:function(Vt){R=Vt},setClear:function(Vt){ae!==Vt&&(i.clearStencil(Vt),ae=Vt)},reset:function(){R=!1,ft=null,W=null,Q=null,lt=null,ct=null,Ht=null,Zt=null,ae=null}}}const r=new t,a=new e,s=new n,l=new WeakMap,o=new WeakMap;let c={},h={},p=new WeakMap,d=[],m=null,_=!1,w=null,u=null,f=null,E=null,M=null,S=null,O=null,C=new kt(0,0,0),b=0,L=!1,et=null,g=null,y=null,V=null,G=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,X=0;const P=i.getParameter(i.VERSION);P.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(P)[1]),K=X>=1):P.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),K=X>=2);let U=null,N={};const j=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),_t=new ne().fromArray(j),Lt=new ne().fromArray(q);function k(R,ft,W,Q){const lt=new Uint8Array(4),ct=i.createTexture();i.bindTexture(R,ct),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<W;Ht++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,lt):i.texImage2D(ft+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,lt);return ct}const J={};J[i.TEXTURE_2D]=k(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=k(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=k(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=k(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),s.setClear(0),st(i.DEPTH_TEST),a.setFunc(oi),Nt(!1),zt(vs),st(i.CULL_FACE),A(mn);function st(R){c[R]!==!0&&(i.enable(R),c[R]=!0)}function ut(R){c[R]!==!1&&(i.disable(R),c[R]=!1)}function Ct(R,ft){return h[R]!==ft?(i.bindFramebuffer(R,ft),h[R]=ft,R===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ft),R===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function bt(R,ft){let W=d,Q=!1;if(R){W=p.get(ft),W===void 0&&(W=[],p.set(ft,W));const lt=R.textures;if(W.length!==lt.length||W[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Ht=lt.length;ct<Ht;ct++)W[ct]=i.COLOR_ATTACHMENT0+ct;W.length=lt.length,Q=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,Q=!0);Q&&i.drawBuffers(W)}function Bt(R){return m!==R?(i.useProgram(R),m=R,!0):!1}const wt={[Pn]:i.FUNC_ADD,[p0]:i.FUNC_SUBTRACT,[m0]:i.FUNC_REVERSE_SUBTRACT};wt[g0]=i.MIN,wt[_0]=i.MAX;const Et={[x0]:i.ZERO,[v0]:i.ONE,[y0]:i.SRC_COLOR,[ha]:i.SRC_ALPHA,[b0]:i.SRC_ALPHA_SATURATE,[E0]:i.DST_COLOR,[w0]:i.DST_ALPHA,[M0]:i.ONE_MINUS_SRC_COLOR,[da]:i.ONE_MINUS_SRC_ALPHA,[T0]:i.ONE_MINUS_DST_COLOR,[S0]:i.ONE_MINUS_DST_ALPHA,[A0]:i.CONSTANT_COLOR,[R0]:i.ONE_MINUS_CONSTANT_COLOR,[C0]:i.CONSTANT_ALPHA,[P0]:i.ONE_MINUS_CONSTANT_ALPHA};function A(R,ft,W,Q,lt,ct,Ht,Zt,ae,Vt){if(R===mn){_===!0&&(ut(i.BLEND),_=!1);return}if(_===!1&&(st(i.BLEND),_=!0),R!==d0){if(R!==w||Vt!==L){if((u!==Pn||M!==Pn)&&(i.blendEquation(i.FUNC_ADD),u=Pn,M=Pn),Vt)switch(R){case ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vr:i.blendFunc(i.ONE,i.ONE);break;case ys:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ms:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ys:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ms:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}f=null,E=null,S=null,O=null,C.set(0,0,0),b=0,w=R,L=Vt}return}lt=lt||ft,ct=ct||W,Ht=Ht||Q,(ft!==u||lt!==M)&&(i.blendEquationSeparate(wt[ft],wt[lt]),u=ft,M=lt),(W!==f||Q!==E||ct!==S||Ht!==O)&&(i.blendFuncSeparate(Et[W],Et[Q],Et[ct],Et[Ht]),f=W,E=Q,S=ct,O=Ht),(Zt.equals(C)===!1||ae!==b)&&(i.blendColor(Zt.r,Zt.g,Zt.b,ae),C.copy(Zt),b=ae),w=R,L=!1}function de(R,ft){R.side===Ze?ut(i.CULL_FACE):st(i.CULL_FACE);let W=R.side===_e;ft&&(W=!W),Nt(W),R.blending===ii&&R.transparent===!1?A(mn):A(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const Q=R.stencilWrite;s.setTest(Q),Q&&(s.setMask(R.stencilWriteMask),s.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),s.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Wt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(R){et!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),et=R)}function zt(R){R!==f0?(st(i.CULL_FACE),R!==g&&(R===vs?i.cullFace(i.BACK):R===u0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ut(i.CULL_FACE),g=R}function Rt(R){R!==y&&(K&&i.lineWidth(R),y=R)}function Wt(R,ft,W){R?(st(i.POLYGON_OFFSET_FILL),(V!==ft||G!==W)&&(i.polygonOffset(ft,W),V=ft,G=W)):ut(i.POLYGON_OFFSET_FILL)}function Pt(R){R?st(i.SCISSOR_TEST):ut(i.SCISSOR_TEST)}function T(R){R===void 0&&(R=i.TEXTURE0+Y-1),U!==R&&(i.activeTexture(R),U=R)}function x(R,ft,W){W===void 0&&(U===null?W=i.TEXTURE0+Y-1:W=U);let Q=N[W];Q===void 0&&(Q={type:void 0,texture:void 0},N[W]=Q),(Q.type!==R||Q.texture!==ft)&&(U!==W&&(i.activeTexture(W),U=W),i.bindTexture(R,ft||J[R]),Q.type=R,Q.texture=ft)}function F(){const R=N[U];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xt(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ht(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function mt(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function vt(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function tt(R){_t.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),_t.copy(R))}function dt(R){Lt.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),Lt.copy(R))}function At(R,ft){let W=o.get(ft);W===void 0&&(W=new WeakMap,o.set(ft,W));let Q=W.get(R);Q===void 0&&(Q=i.getUniformBlockIndex(ft,R.name),W.set(R,Q))}function gt(R,ft){const Q=o.get(ft).get(R);l.get(ft)!==Q&&(i.uniformBlockBinding(ft,Q,R.__bindingPointIndex),l.set(ft,Q))}function Dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},U=null,N={},h={},p=new WeakMap,d=[],m=null,_=!1,w=null,u=null,f=null,E=null,M=null,S=null,O=null,C=new kt(0,0,0),b=0,L=!1,et=null,g=null,y=null,V=null,G=null,_t.set(0,0,i.canvas.width,i.canvas.height),Lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),s.reset()}return{buffers:{color:r,depth:a,stencil:s},enable:st,disable:ut,bindFramebuffer:Ct,drawBuffers:bt,useProgram:Bt,setBlending:A,setMaterial:de,setFlipSided:Nt,setCullFace:zt,setLineWidth:Rt,setPolygonOffset:Wt,setScissorTest:Pt,activeTexture:T,bindTexture:x,unbindTexture:F,compressedTexImage2D:Z,compressedTexImage3D:nt,texImage2D:mt,texImage3D:vt,updateUBOMapping:At,uniformBlockBinding:gt,texStorage2D:Gt,texStorage3D:it,texSubImage2D:$,texSubImage3D:xt,compressedTexSubImage2D:at,compressedTexSubImage3D:ht,scissor:tt,viewport:dt,reset:Dt}}function uo(i,t,e,n){const r=nd(n);switch(e){case Po:return i*t;case Do:return i*t;case Io:return i*t*2;case Uo:return i*t/r.components*r.byteLength;case us:return i*t/r.components*r.byteLength;case No:return i*t*2/r.components*r.byteLength;case hs:return i*t*2/r.components*r.byteLength;case Lo:return i*t*3/r.components*r.byteLength;case Fe:return i*t*4/r.components*r.byteLength;case ds:return i*t*4/r.components*r.byteLength;case ur:case hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ba:case Ra:return Math.max(i,16)*Math.max(t,8)/4;case Ta:case Aa:return Math.max(i,8)*Math.max(t,8)/2;case Ca:case Pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Na:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ka:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Wa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case mr:case qa:case Ya:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Fo:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ka:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function nd(i){switch(i){case en:case Ao:return{byteLength:1,components:1};case Pi:case Ro:case Li:return{byteLength:2,components:1};case cs:case fs:return{byteLength:2,components:4};case Nn:case ls:case Je:return{byteLength:4,components:1};case Co:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function id(i,t,e,n,r,a,s){const l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Kt,h=new WeakMap;let p;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,x){return m?new OffscreenCanvas(T,x):Er("canvas")}function w(T,x,F){let Z=1;const nt=Pt(T);if((nt.width>F||nt.height>F)&&(Z=F/Math.max(nt.width,nt.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(Z*nt.width),xt=Math.floor(Z*nt.height);p===void 0&&(p=_($,xt));const at=x?_($,xt):p;return at.width=$,at.height=xt,at.getContext("2d").drawImage(T,0,0,$,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+$+"x"+xt+")."),at}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),T;return T}function u(T){return T.generateMipmaps&&T.minFilter!==Re&&T.minFilter!==Ue}function f(T){i.generateMipmap(T)}function E(T,x,F,Z,nt=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=x;if(x===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),x===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8)),x===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),x===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),x===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),x===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),x===i.RGBA){const xt=nt?yr:Yt.getTransfer(Z);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=xt===Qt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function M(T,x){let F;return T?x===null||x===Nn||x===fi?F=i.DEPTH24_STENCIL8:x===Je?F=i.DEPTH32F_STENCIL8:x===Pi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Nn||x===fi?F=i.DEPTH_COMPONENT24:x===Je?F=i.DEPTH_COMPONENT32F:x===Pi&&(F=i.DEPTH_COMPONENT16),F}function S(T,x){return u(T)===!0||T.isFramebufferTexture&&T.minFilter!==Re&&T.minFilter!==Ue?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function O(T){const x=T.target;x.removeEventListener("dispose",O),b(x),x.isVideoTexture&&h.delete(x)}function C(T){const x=T.target;x.removeEventListener("dispose",C),et(x)}function b(T){const x=n.get(T);if(x.__webglInit===void 0)return;const F=T.source,Z=d.get(F);if(Z){const nt=Z[x.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&L(T),Object.keys(Z).length===0&&d.delete(F)}n.remove(T)}function L(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const F=T.source,Z=d.get(F);delete Z[x.__cacheKey],s.memory.textures--}function et(T){const x=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let nt=0;nt<x.__webglFramebuffer[Z].length;nt++)i.deleteFramebuffer(x.__webglFramebuffer[Z][nt]);else i.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[Z]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=T.textures;for(let Z=0,nt=F.length;Z<nt;Z++){const $=n.get(F[Z]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),s.memory.textures--),n.remove(F[Z])}n.remove(T)}let g=0;function y(){g=0}function V(){const T=g;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),g+=1,T}function G(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function Y(T,x){const F=n.get(T);if(T.isVideoTexture&&Rt(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Lt(F,T,x);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function K(T,x){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Lt(F,T,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function X(T,x){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Lt(F,T,x);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function P(T,x){const F=n.get(T);if(T.version>0&&F.__version!==T.version){k(F,T,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}const U={[Sa]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[Ea]:i.MIRRORED_REPEAT},N={[Re]:i.NEAREST,[H0]:i.NEAREST_MIPMAP_NEAREST,[Bi]:i.NEAREST_MIPMAP_LINEAR,[Ue]:i.LINEAR,[Ir]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},j={[X0]:i.NEVER,[j0]:i.ALWAYS,[q0]:i.LESS,[Oo]:i.LEQUAL,[Y0]:i.EQUAL,[Z0]:i.GEQUAL,[$0]:i.GREATER,[K0]:i.NOTEQUAL};function q(T,x){if(x.type===Je&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Ue||x.magFilter===Ir||x.magFilter===Bi||x.magFilter===In||x.minFilter===Ue||x.minFilter===Ir||x.minFilter===Bi||x.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,U[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,U[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,U[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,N[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,N[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,j[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Re||x.minFilter!==Bi&&x.minFilter!==In||x.type===Je&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function _t(T,x){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",O));const Z=x.source;let nt=d.get(Z);nt===void 0&&(nt={},d.set(Z,nt));const $=G(x);if($!==T.__cacheKey){nt[$]===void 0&&(nt[$]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,F=!0),nt[$].usedTimes++;const xt=nt[T.__cacheKey];xt!==void 0&&(nt[T.__cacheKey].usedTimes--,xt.usedTimes===0&&L(x)),T.__cacheKey=$,T.__webglTexture=nt[$].texture}return F}function Lt(T,x,F){let Z=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=i.TEXTURE_3D);const nt=_t(T,x),$=x.source;e.bindTexture(Z,T.__webglTexture,i.TEXTURE0+F);const xt=n.get($);if($.version!==xt.__version||nt===!0){e.activeTexture(i.TEXTURE0+F);const at=Yt.getPrimaries(Yt.workingColorSpace),ht=x.colorSpace===dn?null:Yt.getPrimaries(x.colorSpace),Gt=x.colorSpace===dn||at===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let it=w(x.image,!1,r.maxTextureSize);it=Wt(x,it);const mt=a.convert(x.format,x.colorSpace),vt=a.convert(x.type);let tt=E(x.internalFormat,mt,vt,x.colorSpace,x.isVideoTexture);q(Z,x);let dt;const At=x.mipmaps,gt=x.isVideoTexture!==!0,Dt=xt.__version===void 0||nt===!0,R=$.dataReady,ft=S(x,it);if(x.isDepthTexture)tt=M(x.format===ui,x.type),Dt&&(gt?e.texStorage2D(i.TEXTURE_2D,1,tt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,tt,it.width,it.height,0,mt,vt,null));else if(x.isDataTexture)if(At.length>0){gt&&Dt&&e.texStorage2D(i.TEXTURE_2D,ft,tt,At[0].width,At[0].height);for(let W=0,Q=At.length;W<Q;W++)dt=At[W],gt?R&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,dt.width,dt.height,mt,vt,dt.data):e.texImage2D(i.TEXTURE_2D,W,tt,dt.width,dt.height,0,mt,vt,dt.data);x.generateMipmaps=!1}else gt?(Dt&&e.texStorage2D(i.TEXTURE_2D,ft,tt,it.width,it.height),R&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,mt,vt,it.data)):e.texImage2D(i.TEXTURE_2D,0,tt,it.width,it.height,0,mt,vt,it.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){gt&&Dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,tt,At[0].width,At[0].height,it.depth);for(let W=0,Q=At.length;W<Q;W++)if(dt=At[W],x.format!==Fe)if(mt!==null)if(gt){if(R)if(x.layerUpdates.size>0){const lt=uo(dt.width,dt.height,x.format,x.type);for(const ct of x.layerUpdates){const Ht=dt.data.subarray(ct*lt/dt.data.BYTES_PER_ELEMENT,(ct+1)*lt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,ct,dt.width,dt.height,1,mt,Ht,0,0)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,dt.width,dt.height,it.depth,mt,dt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,tt,dt.width,dt.height,it.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?R&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,dt.width,dt.height,it.depth,mt,vt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,tt,dt.width,dt.height,it.depth,0,mt,vt,dt.data)}else{gt&&Dt&&e.texStorage2D(i.TEXTURE_2D,ft,tt,At[0].width,At[0].height);for(let W=0,Q=At.length;W<Q;W++)dt=At[W],x.format!==Fe?mt!==null?gt?R&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,dt.width,dt.height,mt,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,W,tt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?R&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,dt.width,dt.height,mt,vt,dt.data):e.texImage2D(i.TEXTURE_2D,W,tt,dt.width,dt.height,0,mt,vt,dt.data)}else if(x.isDataArrayTexture)if(gt){if(Dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,tt,it.width,it.height,it.depth),R)if(x.layerUpdates.size>0){const W=uo(it.width,it.height,x.format,x.type);for(const Q of x.layerUpdates){const lt=it.data.subarray(Q*W/it.data.BYTES_PER_ELEMENT,(Q+1)*W/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,it.width,it.height,1,mt,vt,lt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,mt,vt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,tt,it.width,it.height,it.depth,0,mt,vt,it.data);else if(x.isData3DTexture)gt?(Dt&&e.texStorage3D(i.TEXTURE_3D,ft,tt,it.width,it.height,it.depth),R&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,mt,vt,it.data)):e.texImage3D(i.TEXTURE_3D,0,tt,it.width,it.height,it.depth,0,mt,vt,it.data);else if(x.isFramebufferTexture){if(Dt)if(gt)e.texStorage2D(i.TEXTURE_2D,ft,tt,it.width,it.height);else{let W=it.width,Q=it.height;for(let lt=0;lt<ft;lt++)e.texImage2D(i.TEXTURE_2D,lt,tt,W,Q,0,mt,vt,null),W>>=1,Q>>=1}}else if(At.length>0){if(gt&&Dt){const W=Pt(At[0]);e.texStorage2D(i.TEXTURE_2D,ft,tt,W.width,W.height)}for(let W=0,Q=At.length;W<Q;W++)dt=At[W],gt?R&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,mt,vt,dt):e.texImage2D(i.TEXTURE_2D,W,tt,mt,vt,dt);x.generateMipmaps=!1}else if(gt){if(Dt){const W=Pt(it);e.texStorage2D(i.TEXTURE_2D,ft,tt,W.width,W.height)}R&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,vt,it)}else e.texImage2D(i.TEXTURE_2D,0,tt,mt,vt,it);u(x)&&f(Z),xt.__version=$.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function k(T,x,F){if(x.image.length!==6)return;const Z=_t(T,x),nt=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const $=n.get(nt);if(nt.version!==$.__version||Z===!0){e.activeTexture(i.TEXTURE0+F);const xt=Yt.getPrimaries(Yt.workingColorSpace),at=x.colorSpace===dn?null:Yt.getPrimaries(x.colorSpace),ht=x.colorSpace===dn||xt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Gt=x.isCompressedTexture||x.image[0].isCompressedTexture,it=x.image[0]&&x.image[0].isDataTexture,mt=[];for(let Q=0;Q<6;Q++)!Gt&&!it?mt[Q]=w(x.image[Q],!0,r.maxCubemapSize):mt[Q]=it?x.image[Q].image:x.image[Q],mt[Q]=Wt(x,mt[Q]);const vt=mt[0],tt=a.convert(x.format,x.colorSpace),dt=a.convert(x.type),At=E(x.internalFormat,tt,dt,x.colorSpace),gt=x.isVideoTexture!==!0,Dt=$.__version===void 0||Z===!0,R=nt.dataReady;let ft=S(x,vt);q(i.TEXTURE_CUBE_MAP,x);let W;if(Gt){gt&&Dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,At,vt.width,vt.height);for(let Q=0;Q<6;Q++){W=mt[Q].mipmaps;for(let lt=0;lt<W.length;lt++){const ct=W[lt];x.format!==Fe?tt!==null?gt?R&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt,0,0,ct.width,ct.height,tt,ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt,At,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):gt?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt,0,0,ct.width,ct.height,tt,dt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt,At,ct.width,ct.height,0,tt,dt,ct.data)}}}else{if(W=x.mipmaps,gt&&Dt){W.length>0&&ft++;const Q=Pt(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,At,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(it){gt?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,mt[Q].width,mt[Q].height,tt,dt,mt[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,At,mt[Q].width,mt[Q].height,0,tt,dt,mt[Q].data);for(let lt=0;lt<W.length;lt++){const Ht=W[lt].image[Q].image;gt?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt+1,0,0,Ht.width,Ht.height,tt,dt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt+1,At,Ht.width,Ht.height,0,tt,dt,Ht.data)}}else{gt?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,tt,dt,mt[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,At,tt,dt,mt[Q]);for(let lt=0;lt<W.length;lt++){const ct=W[lt];gt?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt+1,0,0,tt,dt,ct.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,lt+1,At,tt,dt,ct.image[Q])}}}u(x)&&f(i.TEXTURE_CUBE_MAP),$.__version=nt.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function J(T,x,F,Z,nt,$){const xt=a.convert(F.format,F.colorSpace),at=a.convert(F.type),ht=E(F.internalFormat,xt,at,F.colorSpace);if(!n.get(x).__hasExternalTextures){const it=Math.max(1,x.width>>$),mt=Math.max(1,x.height>>$);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,$,ht,it,mt,x.depth,0,xt,at,null):e.texImage2D(nt,$,ht,it,mt,0,xt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),zt(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,nt,n.get(F).__webglTexture,0,Nt(x)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,nt,n.get(F).__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(T,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const Z=x.depthTexture,nt=Z&&Z.isDepthTexture?Z.type:null,$=M(x.stencilBuffer,nt),xt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=Nt(x);zt(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,$,x.width,x.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,$,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,$,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,T)}else{const Z=x.textures;for(let nt=0;nt<Z.length;nt++){const $=Z[nt],xt=a.convert($.format,$.colorSpace),at=a.convert($.type),ht=E($.internalFormat,xt,at,$.colorSpace),Gt=Nt(x);F&&zt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,ht,x.width,x.height):zt(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,ht,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ht,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ut(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y(x.depthTexture,0);const Z=n.get(x.depthTexture).__webglTexture,nt=Nt(x);if(x.depthTexture.format===ri)zt(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(x.depthTexture.format===ui)zt(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ct(T){const x=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){const nt=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",nt)};Z.addEventListener("dispose",nt),x.__depthDisposeCallback=nt}x.__boundDepthTexture=Z}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");ut(x.__webglFramebuffer,T)}else if(F){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=i.createRenderbuffer(),st(x.__webglDepthbuffer[Z],T,!1);else{const nt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),st(x.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function bt(T,x,F){const Z=n.get(T);x!==void 0&&J(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ct(T)}function Bt(T){const x=T.texture,F=n.get(T),Z=n.get(x);T.addEventListener("dispose",C);const nt=T.textures,$=T.isWebGLCubeRenderTarget===!0,xt=nt.length>1;if(xt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=x.version,s.memory.textures++),$){F.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[at]=[];for(let ht=0;ht<x.mipmaps.length;ht++)F.__webglFramebuffer[at][ht]=i.createFramebuffer()}else F.__webglFramebuffer[at]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)F.__webglFramebuffer[at]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(xt)for(let at=0,ht=nt.length;at<ht;at++){const Gt=n.get(nt[at]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),s.memory.textures++)}if(T.samples>0&&zt(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let at=0;at<nt.length;at++){const ht=nt[at];F.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[at]);const Gt=a.convert(ht.format,ht.colorSpace),it=a.convert(ht.type),mt=E(ht.internalFormat,Gt,it,ht.colorSpace,T.isXRRenderTarget===!0),vt=Nt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,mt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,F.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),st(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),q(i.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let ht=0;ht<x.mipmaps.length;ht++)J(F.__webglFramebuffer[at][ht],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ht);else J(F.__webglFramebuffer[at],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);u(x)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let at=0,ht=nt.length;at<ht;at++){const Gt=nt[at],it=n.get(Gt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),q(i.TEXTURE_2D,Gt),J(F.__webglFramebuffer,T,Gt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),u(Gt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,Z.__webglTexture),q(at,x),x.mipmaps&&x.mipmaps.length>0)for(let ht=0;ht<x.mipmaps.length;ht++)J(F.__webglFramebuffer[ht],T,x,i.COLOR_ATTACHMENT0,at,ht);else J(F.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,at,0);u(x)&&f(at),e.unbindTexture()}T.depthBuffer&&Ct(T)}function wt(T){const x=T.textures;for(let F=0,Z=x.length;F<Z;F++){const nt=x[F];if(u(nt)){const $=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,xt=n.get(nt).__webglTexture;e.bindTexture($,xt),f($),e.unbindTexture()}}}const Et=[],A=[];function de(T){if(T.samples>0){if(zt(T)===!1){const x=T.textures,F=T.width,Z=T.height;let nt=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(T),at=x.length>1;if(at)for(let ht=0;ht<x.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ht=0;ht<x.length;ht++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[ht]);const Gt=n.get(x[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,F,Z,0,0,F,Z,nt,i.NEAREST),o===!0&&(Et.length=0,A.length=0,Et.push(i.COLOR_ATTACHMENT0+ht),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Et.push($),A.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,A)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Et))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let ht=0;ht<x.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,xt.__webglColorRenderbuffer[ht]);const Gt=n.get(x[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&o){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Nt(T){return Math.min(r.maxSamples,T.samples)}function zt(T){const x=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Rt(T){const x=s.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Wt(T,x){const F=T.colorSpace,Z=T.format,nt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==xn&&F!==dn&&(Yt.getTransfer(F)===Qt?(Z!==Fe||nt!==en)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}function Pt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=y,this.setTexture2D=Y,this.setTexture2DArray=K,this.setTexture3D=X,this.setTextureCube=P,this.rebindTextures=bt,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=J,this.useMultisampledRTT=zt}function rd(i,t){function e(n,r=dn){let a;const s=Yt.getTransfer(r);if(n===en)return i.UNSIGNED_BYTE;if(n===cs)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fs)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Co)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ao)return i.BYTE;if(n===Ro)return i.SHORT;if(n===Pi)return i.UNSIGNED_SHORT;if(n===ls)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===Je)return i.FLOAT;if(n===Li)return i.HALF_FLOAT;if(n===Po)return i.ALPHA;if(n===Lo)return i.RGB;if(n===Fe)return i.RGBA;if(n===Do)return i.LUMINANCE;if(n===Io)return i.LUMINANCE_ALPHA;if(n===ri)return i.DEPTH_COMPONENT;if(n===ui)return i.DEPTH_STENCIL;if(n===Uo)return i.RED;if(n===us)return i.RED_INTEGER;if(n===No)return i.RG;if(n===hs)return i.RG_INTEGER;if(n===ds)return i.RGBA_INTEGER;if(n===ur||n===hr||n===dr||n===pr)if(s===Qt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===ur)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===ur)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ta||n===ba||n===Aa||n===Ra)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Ta)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Aa)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ra)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ca||n===Pa||n===La)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Ca||n===Pa)return s===Qt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===La)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===Ba||n===za||n===Ha||n===Ga||n===Va||n===ka||n===Wa||n===Xa)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Da)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ia)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ua)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Na)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fa)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oa)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===za)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ha)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ga)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Va)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ka)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wa)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xa)return s===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===qa||n===Ya)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===mr)return s===Qt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ya)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fo||n===$a||n===Ka||n===Za)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===mr)return a.COMPRESSED_RED_RGTC1_EXT;if(n===$a)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ka)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Za)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class ad extends Ae{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ar extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sd={type:"move"};class ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,a=null,s=null;const l=this._targetRay,o=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const w of t.hand.values()){const u=e.getJointPose(w,n),f=this._getHandJoint(c,w);u!==null&&(f.matrix.fromArray(u.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=u.radius),f.visible=u!==null}const h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=h.position.distanceTo(p.position),m=.02,_=.005;c.inputState.pinching&&d>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1));l!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(sd)))}return l!==null&&(l.visible=r!==null),o!==null&&(o.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ar;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const od=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ld=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class cd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new xe,a=t.properties.get(r);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ge({vertexShader:od,fragmentShader:ld,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new tn(new Rr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fd extends di{constructor(t,e){super();const n=this;let r=null,a=1,s=null,l="local-floor",o=1,c=null,h=null,p=null,d=null,m=null,_=null;const w=new cd,u=e.getContextAttributes();let f=null,E=null;const M=[],S=[],O=new Kt;let C=null;const b=new Ae;b.layers.enable(1),b.viewport=new ne;const L=new Ae;L.layers.enable(2),L.viewport=new ne;const et=[b,L],g=new ad;g.layers.enable(1),g.layers.enable(2);let y=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let J=M[k];return J===void 0&&(J=new ca,M[k]=J),J.getTargetRaySpace()},this.getControllerGrip=function(k){let J=M[k];return J===void 0&&(J=new ca,M[k]=J),J.getGripSpace()},this.getHand=function(k){let J=M[k];return J===void 0&&(J=new ca,M[k]=J),J.getHandSpace()};function G(k){const J=S.indexOf(k.inputSource);if(J===-1)return;const st=M[J];st!==void 0&&(st.update(k.inputSource,k.frame,c||s),st.dispatchEvent({type:k.type,data:k.inputSource}))}function Y(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",K);for(let k=0;k<M.length;k++){const J=S[k];J!==null&&(S[k]=null,M[k].disconnect(J))}y=null,V=null,w.reset(),t.setRenderTarget(f),m=null,d=null,p=null,r=null,E=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(O.width,O.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){l=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return p},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(f=t.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",K),u.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(O),r.renderState.layers===void 0){const J={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,e,J),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Fn(m.framebufferWidth,m.framebufferHeight,{format:Fe,type:en,colorSpace:t.outputColorSpace,stencilBuffer:u.stencil})}else{let J=null,st=null,ut=null;u.depth&&(ut=u.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=u.stencil?ui:ri,st=u.stencil?fi:Nn);const Ct={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:a};p=new XRWebGLBinding(r,e),d=p.createProjectionLayer(Ct),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new Fn(d.textureWidth,d.textureHeight,{format:Fe,type:en,depthTexture:new Jo(d.textureWidth,d.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:u.stencil,colorSpace:t.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(o),c=null,s=await r.requestReferenceSpace(l),Lt.setContext(r),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function K(k){for(let J=0;J<k.removed.length;J++){const st=k.removed[J],ut=S.indexOf(st);ut>=0&&(S[ut]=null,M[ut].disconnect(st))}for(let J=0;J<k.added.length;J++){const st=k.added[J];let ut=S.indexOf(st);if(ut===-1){for(let bt=0;bt<M.length;bt++)if(bt>=S.length){S.push(st),ut=bt;break}else if(S[bt]===null){S[bt]=st,ut=bt;break}if(ut===-1)break}const Ct=M[ut];Ct&&Ct.connect(st)}}const X=new H,P=new H;function U(k,J,st){X.setFromMatrixPosition(J.matrixWorld),P.setFromMatrixPosition(st.matrixWorld);const ut=X.distanceTo(P),Ct=J.projectionMatrix.elements,bt=st.projectionMatrix.elements,Bt=Ct[14]/(Ct[10]-1),wt=Ct[14]/(Ct[10]+1),Et=(Ct[9]+1)/Ct[5],A=(Ct[9]-1)/Ct[5],de=(Ct[8]-1)/Ct[0],Nt=(bt[8]+1)/bt[0],zt=Bt*de,Rt=Bt*Nt,Wt=ut/(-de+Nt),Pt=Wt*-de;if(J.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Pt),k.translateZ(Wt),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Ct[10]===-1)k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const T=Bt+Wt,x=wt+Wt,F=zt-Pt,Z=Rt+(ut-Pt),nt=Et*wt/x*T,$=A*wt/x*T;k.projectionMatrix.makePerspective(F,Z,nt,$,T,x),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function N(k,J){J===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(J.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;let J=k.near,st=k.far;w.texture!==null&&(w.depthNear>0&&(J=w.depthNear),w.depthFar>0&&(st=w.depthFar)),g.near=L.near=b.near=J,g.far=L.far=b.far=st,(y!==g.near||V!==g.far)&&(r.updateRenderState({depthNear:g.near,depthFar:g.far}),y=g.near,V=g.far);const ut=k.parent,Ct=g.cameras;N(g,ut);for(let bt=0;bt<Ct.length;bt++)N(Ct[bt],ut);Ct.length===2?U(g,b,L):g.projectionMatrix.copy(b.projectionMatrix),j(k,g,ut)};function j(k,J,st){st===null?k.matrix.copy(J.matrixWorld):(k.matrix.copy(st.matrixWorld),k.matrix.invert(),k.matrix.multiply(J.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=ja*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(d===null&&m===null))return o},this.setFoveation=function(k){o=k,d!==null&&(d.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(g)};let q=null;function _t(k,J){if(h=J.getViewerPose(c||s),_=J,h!==null){const st=h.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let ut=!1;st.length!==g.cameras.length&&(g.cameras.length=0,ut=!0);for(let bt=0;bt<st.length;bt++){const Bt=st[bt];let wt=null;if(m!==null)wt=m.getViewport(Bt);else{const A=p.getViewSubImage(d,Bt);wt=A.viewport,bt===0&&(t.setRenderTargetTextures(E,A.colorTexture,d.ignoreDepthValues?void 0:A.depthStencilTexture),t.setRenderTarget(E))}let Et=et[bt];Et===void 0&&(Et=new Ae,Et.layers.enable(bt),Et.viewport=new ne,et[bt]=Et),Et.matrix.fromArray(Bt.transform.matrix),Et.matrix.decompose(Et.position,Et.quaternion,Et.scale),Et.projectionMatrix.fromArray(Bt.projectionMatrix),Et.projectionMatrixInverse.copy(Et.projectionMatrix).invert(),Et.viewport.set(wt.x,wt.y,wt.width,wt.height),bt===0&&(g.matrix.copy(Et.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),ut===!0&&g.cameras.push(Et)}const Ct=r.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const bt=p.getDepthInformation(st[0]);bt&&bt.isValid&&bt.texture&&w.init(t,bt,r.renderState)}}for(let st=0;st<M.length;st++){const ut=S[st],Ct=M[st];ut!==null&&Ct!==void 0&&Ct.update(ut,J,c||s)}q&&q(k,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),_=null}const Lt=new jo;Lt.setAnimationLoop(_t),this.setAnimationLoop=function(k){q=k},this.dispose=function(){}}}const bn=new nn,ud=new ie;function hd(i,t){function e(u,f){u.matrixAutoUpdate===!0&&u.updateMatrix(),f.value.copy(u.matrix)}function n(u,f){f.color.getRGB(u.fogColor.value,Yo(i)),f.isFog?(u.fogNear.value=f.near,u.fogFar.value=f.far):f.isFogExp2&&(u.fogDensity.value=f.density)}function r(u,f,E,M,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(u,f):f.isMeshToonMaterial?(a(u,f),p(u,f)):f.isMeshPhongMaterial?(a(u,f),h(u,f)):f.isMeshStandardMaterial?(a(u,f),d(u,f),f.isMeshPhysicalMaterial&&m(u,f,S)):f.isMeshMatcapMaterial?(a(u,f),_(u,f)):f.isMeshDepthMaterial?a(u,f):f.isMeshDistanceMaterial?(a(u,f),w(u,f)):f.isMeshNormalMaterial?a(u,f):f.isLineBasicMaterial?(s(u,f),f.isLineDashedMaterial&&l(u,f)):f.isPointsMaterial?o(u,f,E,M):f.isSpriteMaterial?c(u,f):f.isShadowMaterial?(u.color.value.copy(f.color),u.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(u,f){u.opacity.value=f.opacity,f.color&&u.diffuse.value.copy(f.color),f.emissive&&u.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(u.map.value=f.map,e(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.bumpMap&&(u.bumpMap.value=f.bumpMap,e(f.bumpMap,u.bumpMapTransform),u.bumpScale.value=f.bumpScale,f.side===_e&&(u.bumpScale.value*=-1)),f.normalMap&&(u.normalMap.value=f.normalMap,e(f.normalMap,u.normalMapTransform),u.normalScale.value.copy(f.normalScale),f.side===_e&&u.normalScale.value.negate()),f.displacementMap&&(u.displacementMap.value=f.displacementMap,e(f.displacementMap,u.displacementMapTransform),u.displacementScale.value=f.displacementScale,u.displacementBias.value=f.displacementBias),f.emissiveMap&&(u.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,u.emissiveMapTransform)),f.specularMap&&(u.specularMap.value=f.specularMap,e(f.specularMap,u.specularMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);const E=t.get(f),M=E.envMap,S=E.envMapRotation;M&&(u.envMap.value=M,bn.copy(S),bn.x*=-1,bn.y*=-1,bn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(bn.y*=-1,bn.z*=-1),u.envMapRotation.value.setFromMatrix4(ud.makeRotationFromEuler(bn)),u.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=f.reflectivity,u.ior.value=f.ior,u.refractionRatio.value=f.refractionRatio),f.lightMap&&(u.lightMap.value=f.lightMap,u.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,u.lightMapTransform)),f.aoMap&&(u.aoMap.value=f.aoMap,u.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,u.aoMapTransform))}function s(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,f.map&&(u.map.value=f.map,e(f.map,u.mapTransform))}function l(u,f){u.dashSize.value=f.dashSize,u.totalSize.value=f.dashSize+f.gapSize,u.scale.value=f.scale}function o(u,f,E,M){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.size.value=f.size*E,u.scale.value=M*.5,f.map&&(u.map.value=f.map,e(f.map,u.uvTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function c(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.rotation.value=f.rotation,f.map&&(u.map.value=f.map,e(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function h(u,f){u.specular.value.copy(f.specular),u.shininess.value=Math.max(f.shininess,1e-4)}function p(u,f){f.gradientMap&&(u.gradientMap.value=f.gradientMap)}function d(u,f){u.metalness.value=f.metalness,f.metalnessMap&&(u.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,u.metalnessMapTransform)),u.roughness.value=f.roughness,f.roughnessMap&&(u.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,u.roughnessMapTransform)),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)}function m(u,f,E){u.ior.value=f.ior,f.sheen>0&&(u.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),u.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(u.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,u.sheenColorMapTransform)),f.sheenRoughnessMap&&(u.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,u.sheenRoughnessMapTransform))),f.clearcoat>0&&(u.clearcoat.value=f.clearcoat,u.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(u.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,u.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(u.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===_e&&u.clearcoatNormalScale.value.negate())),f.dispersion>0&&(u.dispersion.value=f.dispersion),f.iridescence>0&&(u.iridescence.value=f.iridescence,u.iridescenceIOR.value=f.iridescenceIOR,u.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(u.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,u.iridescenceMapTransform)),f.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),f.transmission>0&&(u.transmission.value=f.transmission,u.transmissionSamplerMap.value=E.texture,u.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(u.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,u.transmissionMapTransform)),u.thickness.value=f.thickness,f.thicknessMap&&(u.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=f.attenuationDistance,u.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(u.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(u.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=f.specularIntensity,u.specularColor.value.copy(f.specularColor),f.specularColorMap&&(u.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,u.specularColorMapTransform)),f.specularIntensityMap&&(u.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,u.specularIntensityMapTransform))}function _(u,f){f.matcap&&(u.matcap.value=f.matcap)}function w(u,f){const E=t.get(f).light;u.referencePosition.value.setFromMatrixPosition(E.matrixWorld),u.nearDistance.value=E.shadow.camera.near,u.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function dd(i,t,e,n){let r={},a={},s=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(E,M){const S=M.program;n.uniformBlockBinding(E,S)}function c(E,M){let S=r[E.id];S===void 0&&(_(E),S=h(E),r[E.id]=S,E.addEventListener("dispose",u));const O=M.program;n.updateUBOMapping(E,O);const C=t.render.frame;a[E.id]!==C&&(d(E),a[E.id]=C)}function h(E){const M=p();E.__bindingPointIndex=M;const S=i.createBuffer(),O=E.__size,C=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,O,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function p(){for(let E=0;E<l;E++)if(s.indexOf(E)===-1)return s.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const M=r[E.id],S=E.uniforms,O=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,b=S.length;C<b;C++){const L=Array.isArray(S[C])?S[C]:[S[C]];for(let et=0,g=L.length;et<g;et++){const y=L[et];if(m(y,C,et,O)===!0){const V=y.__offset,G=Array.isArray(y.value)?y.value:[y.value];let Y=0;for(let K=0;K<G.length;K++){const X=G[K],P=w(X);typeof X=="number"||typeof X=="boolean"?(y.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,V+Y,y.__data)):X.isMatrix3?(y.__data[0]=X.elements[0],y.__data[1]=X.elements[1],y.__data[2]=X.elements[2],y.__data[3]=0,y.__data[4]=X.elements[3],y.__data[5]=X.elements[4],y.__data[6]=X.elements[5],y.__data[7]=0,y.__data[8]=X.elements[6],y.__data[9]=X.elements[7],y.__data[10]=X.elements[8],y.__data[11]=0):(X.toArray(y.__data,Y),Y+=P.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,M,S,O){const C=E.value,b=M+"_"+S;if(O[b]===void 0)return typeof C=="number"||typeof C=="boolean"?O[b]=C:O[b]=C.clone(),!0;{const L=O[b];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return O[b]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function _(E){const M=E.uniforms;let S=0;const O=16;for(let b=0,L=M.length;b<L;b++){const et=Array.isArray(M[b])?M[b]:[M[b]];for(let g=0,y=et.length;g<y;g++){const V=et[g],G=Array.isArray(V.value)?V.value:[V.value];for(let Y=0,K=G.length;Y<K;Y++){const X=G[Y],P=w(X),U=S%O,N=U%P.boundary,j=U+N;S+=N,j!==0&&O-j<P.storage&&(S+=O-j),V.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=S,S+=P.storage}}}const C=S%O;return C>0&&(S+=O-C),E.__size=S,E.__cache={},this}function w(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function u(E){const M=E.target;M.removeEventListener("dispose",u);const S=s.indexOf(M.__bindingPointIndex);s.splice(S,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete a[M.id]}function f(){for(const E in r)i.deleteBuffer(r[E]);s=[],r={},a={}}return{bind:o,update:c,dispose:f}}class pd{constructor(t={}){const{canvas:e=Q0(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=s;const m=new Uint32Array(4),_=new Int32Array(4);let w=null,u=null;const f=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this.toneMapping=gn,this.toneMappingExposure=1;const M=this;let S=!1,O=0,C=0,b=null,L=-1,et=null;const g=new ne,y=new ne;let V=null;const G=new kt(0);let Y=0,K=e.width,X=e.height,P=1,U=null,N=null;const j=new ne(0,0,K,X),q=new ne(0,0,K,X);let _t=!1;const Lt=new Zo;let k=!1,J=!1;const st=new ie,ut=new ie,Ct=new H,bt=new ne,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let wt=!1;function Et(){return b===null?P:1}let A=n;function de(v,D){return e.getContext(v,D)}try{const v={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${os}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",ct,!1),A===null){const D="webgl2";if(A=de(D,v),A===null)throw de(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Nt,zt,Rt,Wt,Pt,T,x,F,Z,nt,$,xt,at,ht,Gt,it,mt,vt,tt,dt,At,gt,Dt,R;function ft(){Nt=new vu(A),Nt.init(),gt=new rd(A,Nt),zt=new hu(A,Nt,t,gt),Rt=new ed(A),zt.reverseDepthBuffer&&Rt.buffers.depth.setReversed(!0),Wt=new wu(A),Pt=new Hh,T=new id(A,Nt,Rt,Pt,zt,gt,Wt),x=new pu(M),F=new xu(M),Z=new Al(A),Dt=new fu(A,Z),nt=new yu(A,Z,Wt,Dt),$=new Eu(A,nt,Z,Wt),tt=new Su(A,zt,T),it=new du(Pt),xt=new zh(M,x,F,Nt,zt,Dt,it),at=new hd(M,Pt),ht=new Vh,Gt=new $h(Nt),vt=new cu(M,x,F,Rt,$,d,o),mt=new Qh(M,$,zt),R=new dd(A,Wt,zt,Rt),dt=new uu(A,Nt,Wt),At=new Mu(A,Nt,Wt),Wt.programs=xt.programs,M.capabilities=zt,M.extensions=Nt,M.properties=Pt,M.renderLists=ht,M.shadowMap=mt,M.state=Rt,M.info=Wt}ft();const W=new fd(M,A);this.xr=W,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const v=Nt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Nt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(v){v!==void 0&&(P=v,this.setSize(K,X,!1))},this.getSize=function(v){return v.set(K,X)},this.setSize=function(v,D,B=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=v,X=D,e.width=Math.floor(v*P),e.height=Math.floor(D*P),B===!0&&(e.style.width=v+"px",e.style.height=D+"px"),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(K*P,X*P).floor()},this.setDrawingBufferSize=function(v,D,B){K=v,X=D,P=B,e.width=Math.floor(v*B),e.height=Math.floor(D*B),this.setViewport(0,0,v,D)},this.getCurrentViewport=function(v){return v.copy(g)},this.getViewport=function(v){return v.copy(j)},this.setViewport=function(v,D,B,z){v.isVector4?j.set(v.x,v.y,v.z,v.w):j.set(v,D,B,z),Rt.viewport(g.copy(j).multiplyScalar(P).round())},this.getScissor=function(v){return v.copy(q)},this.setScissor=function(v,D,B,z){v.isVector4?q.set(v.x,v.y,v.z,v.w):q.set(v,D,B,z),Rt.scissor(y.copy(q).multiplyScalar(P).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(v){Rt.setScissorTest(_t=v)},this.setOpaqueSort=function(v){U=v},this.setTransparentSort=function(v){N=v},this.getClearColor=function(v){return v.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor.apply(vt,arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha.apply(vt,arguments)},this.clear=function(v=!0,D=!0,B=!0){let z=0;if(v){let I=!1;if(b!==null){const rt=b.texture.format;I=rt===ds||rt===hs||rt===us}if(I){const rt=b.texture.type,pt=rt===en||rt===Nn||rt===Pi||rt===fi||rt===cs||rt===fs,yt=vt.getClearColor(),Mt=vt.getClearAlpha(),It=yt.r,Ut=yt.g,St=yt.b;pt?(m[0]=It,m[1]=Ut,m[2]=St,m[3]=Mt,A.clearBufferuiv(A.COLOR,0,m)):(_[0]=It,_[1]=Ut,_[2]=St,_[3]=Mt,A.clearBufferiv(A.COLOR,0,_))}else z|=A.COLOR_BUFFER_BIT}D&&(z|=A.DEPTH_BUFFER_BIT,A.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),B&&(z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),ht.dispose(),Gt.dispose(),Pt.dispose(),x.dispose(),F.dispose(),$.dispose(),Dt.dispose(),R.dispose(),xt.dispose(),W.dispose(),W.removeEventListener("sessionstart",rn),W.removeEventListener("sessionend",ke),Ce.stop()};function Q(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function lt(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const v=Wt.autoReset,D=mt.enabled,B=mt.autoUpdate,z=mt.needsUpdate,I=mt.type;ft(),Wt.autoReset=v,mt.enabled=D,mt.autoUpdate=B,mt.needsUpdate=z,mt.type=I}function ct(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ht(v){const D=v.target;D.removeEventListener("dispose",Ht),Zt(D)}function Zt(v){ae(v),Pt.remove(v)}function ae(v){const D=Pt.get(v).programs;D!==void 0&&(D.forEach(function(B){xt.releaseProgram(B)}),v.isShaderMaterial&&xt.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,B,z,I,rt){D===null&&(D=Bt);const pt=I.isMesh&&I.matrixWorld.determinant()<0,yt=xi(v,D,B,z,I);Rt.setMaterial(z,pt);let Mt=B.index,It=1;if(z.wireframe===!0){if(Mt=nt.getWireframeAttribute(B),Mt===void 0)return;It=2}const Ut=B.drawRange,St=B.attributes.position;let $t=Ut.start*It,Jt=(Ut.start+Ut.count)*It;rt!==null&&($t=Math.max($t,rt.start*It),Jt=Math.min(Jt,(rt.start+rt.count)*It)),Mt!==null?($t=Math.max($t,0),Jt=Math.min(Jt,Mt.count)):St!=null&&($t=Math.max($t,0),Jt=Math.min(Jt,St.count));const te=Jt-$t;if(te<0||te===1/0)return;Dt.setup(I,z,yt,B,Mt);let Me,Xt=dt;if(Mt!==null&&(Me=Z.get(Mt),Xt=At,Xt.setIndex(Me)),I.isMesh)z.wireframe===!0?(Rt.setLineWidth(z.wireframeLinewidth*Et()),Xt.setMode(A.LINES)):Xt.setMode(A.TRIANGLES);else if(I.isLine){let Tt=z.linewidth;Tt===void 0&&(Tt=1),Rt.setLineWidth(Tt*Et()),I.isLineSegments?Xt.setMode(A.LINES):I.isLineLoop?Xt.setMode(A.LINE_LOOP):Xt.setMode(A.LINE_STRIP)}else I.isPoints?Xt.setMode(A.POINTS):I.isSprite&&Xt.setMode(A.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Xt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Nt.get("WEBGL_multi_draw"))Xt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Tt=I._multiDrawStarts,fe=I._multiDrawCounts,qt=I._multiDrawCount,Pe=Mt?Z.get(Mt).bytesPerElement:1,zn=Pt.get(z).currentProgram.getUniforms();for(let we=0;we<qt;we++)zn.setValue(A,"_gl_DrawID",we),Xt.render(Tt[we]/Pe,fe[we])}else if(I.isInstancedMesh)Xt.renderInstances($t,te,I.count);else if(B.isInstancedBufferGeometry){const Tt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,fe=Math.min(B.instanceCount,Tt);Xt.renderInstances($t,te,fe)}else Xt.render($t,te)};function Vt(v,D,B){v.transparent===!0&&v.side===Ze&&v.forceSinglePass===!1?(v.side=_e,v.needsUpdate=!0,yn(v,D,B),v.side=_n,v.needsUpdate=!0,yn(v,D,B),v.side=Ze):yn(v,D,B)}this.compile=function(v,D,B=null){B===null&&(B=v),u=Gt.get(B),u.init(D),E.push(u),B.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(u.pushLight(I),I.castShadow&&u.pushShadow(I))}),v!==B&&v.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(u.pushLight(I),I.castShadow&&u.pushShadow(I))}),u.setupLights();const z=new Set;return v.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const rt=I.material;if(rt)if(Array.isArray(rt))for(let pt=0;pt<rt.length;pt++){const yt=rt[pt];Vt(yt,B,I),z.add(yt)}else Vt(rt,B,I),z.add(rt)}),E.pop(),u=null,z},this.compileAsync=function(v,D,B=null){const z=this.compile(v,D,B);return new Promise(I=>{function rt(){if(z.forEach(function(pt){Pt.get(pt).currentProgram.isReady()&&z.delete(pt)}),z.size===0){I(v);return}setTimeout(rt,10)}Nt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let se=null;function ye(v){se&&se(v)}function rn(){Ce.stop()}function ke(){Ce.start()}const Ce=new jo;Ce.setAnimationLoop(ye),typeof self<"u"&&Ce.setContext(self),this.setAnimationLoop=function(v){se=v,W.setAnimationLoop(v),v===null?Ce.stop():Ce.start()},W.addEventListener("sessionstart",rn),W.addEventListener("sessionend",ke),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(D),D=W.getCamera()),v.isScene===!0&&v.onBeforeRender(M,v,D,b),u=Gt.get(v,E.length),u.init(D),E.push(u),ut.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Lt.setFromProjectionMatrix(ut),J=this.localClippingEnabled,k=it.init(this.clippingPlanes,J),w=ht.get(v,f.length),w.init(),f.push(w),W.enabled===!0&&W.isPresenting===!0){const rt=M.xr.getDepthSensingMesh();rt!==null&&vn(rt,D,-1/0,M.sortObjects)}vn(v,D,0,M.sortObjects),w.finish(),M.sortObjects===!0&&w.sort(U,N),wt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,wt&&vt.addToRenderList(w,v),this.info.render.frame++,k===!0&&it.beginShadows();const B=u.state.shadowsArray;mt.render(B,v,D),k===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=w.opaque,I=w.transmissive;if(u.setupLights(),D.isArrayCamera){const rt=D.cameras;if(I.length>0)for(let pt=0,yt=rt.length;pt<yt;pt++){const Mt=rt[pt];Oi(z,I,v,Mt)}wt&&vt.render(v);for(let pt=0,yt=rt.length;pt<yt;pt++){const Mt=rt[pt];mi(w,v,Mt,Mt.viewport)}}else I.length>0&&Oi(z,I,v,D),wt&&vt.render(v),mi(w,v,D);b!==null&&(T.updateMultisampleRenderTarget(b),T.updateRenderTargetMipmap(b)),v.isScene===!0&&v.onAfterRender(M,v,D),Dt.resetDefaultState(),L=-1,et=null,E.pop(),E.length>0?(u=E[E.length-1],k===!0&&it.setGlobalState(M.clippingPlanes,u.state.camera)):u=null,f.pop(),f.length>0?w=f[f.length-1]:w=null};function vn(v,D,B,z){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)u.pushLight(v),v.castShadow&&u.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Lt.intersectsSprite(v)){z&&bt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ut);const pt=$.update(v),yt=v.material;yt.visible&&w.push(v,pt,yt,B,bt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Lt.intersectsObject(v))){const pt=$.update(v),yt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),bt.copy(v.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),bt.copy(pt.boundingSphere.center)),bt.applyMatrix4(v.matrixWorld).applyMatrix4(ut)),Array.isArray(yt)){const Mt=pt.groups;for(let It=0,Ut=Mt.length;It<Ut;It++){const St=Mt[It],$t=yt[St.materialIndex];$t&&$t.visible&&w.push(v,pt,$t,B,bt.z,St)}}else yt.visible&&w.push(v,pt,yt,B,bt.z,null)}}const rt=v.children;for(let pt=0,yt=rt.length;pt<yt;pt++)vn(rt[pt],D,B,z)}function mi(v,D,B,z){const I=v.opaque,rt=v.transmissive,pt=v.transparent;u.setupLightsView(B),k===!0&&it.setGlobalState(M.clippingPlanes,B),z&&Rt.viewport(g.copy(z)),I.length>0&&On(I,D,B),rt.length>0&&On(rt,D,B),pt.length>0&&On(pt,D,B),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function Oi(v,D,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[z.id]===void 0&&(u.state.transmissionRenderTarget[z.id]=new Fn(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?Li:en,minFilter:In,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const rt=u.state.transmissionRenderTarget[z.id],pt=z.viewport||g;rt.setSize(pt.z,pt.w);const yt=M.getRenderTarget();M.setRenderTarget(rt),M.getClearColor(G),Y=M.getClearAlpha(),Y<1&&M.setClearColor(16777215,.5),M.clear(),wt&&vt.render(B);const Mt=M.toneMapping;M.toneMapping=gn;const It=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),u.setupLightsView(z),k===!0&&it.setGlobalState(M.clippingPlanes,z),On(v,B,z),T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let St=0,$t=D.length;St<$t;St++){const Jt=D[St],te=Jt.object,Me=Jt.geometry,Xt=Jt.material,Tt=Jt.group;if(Xt.side===Ze&&te.layers.test(z.layers)){const fe=Xt.side;Xt.side=_e,Xt.needsUpdate=!0,gi(te,B,z,Me,Xt,Tt),Xt.side=fe,Xt.needsUpdate=!0,Ut=!0}}Ut===!0&&(T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt))}M.setRenderTarget(yt),M.setClearColor(G,Y),It!==void 0&&(z.viewport=It),M.toneMapping=Mt}function On(v,D,B){const z=D.isScene===!0?D.overrideMaterial:null;for(let I=0,rt=v.length;I<rt;I++){const pt=v[I],yt=pt.object,Mt=pt.geometry,It=z===null?pt.material:z,Ut=pt.group;yt.layers.test(B.layers)&&gi(yt,D,B,Mt,It,Ut)}}function gi(v,D,B,z,I,rt){v.onBeforeRender(M,D,B,z,I,rt),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),I.onBeforeRender(M,D,B,z,v,rt),I.transparent===!0&&I.side===Ze&&I.forceSinglePass===!1?(I.side=_e,I.needsUpdate=!0,M.renderBufferDirect(B,D,z,I,v,rt),I.side=_n,I.needsUpdate=!0,M.renderBufferDirect(B,D,z,I,v,rt),I.side=Ze):M.renderBufferDirect(B,D,z,I,v,rt),v.onAfterRender(M,D,B,z,I,rt)}function yn(v,D,B){D.isScene!==!0&&(D=Bt);const z=Pt.get(v),I=u.state.lights,rt=u.state.shadowsArray,pt=I.state.version,yt=xt.getParameters(v,I.state,rt,D,B),Mt=xt.getProgramCacheKey(yt);let It=z.programs;z.environment=v.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(v.isMeshStandardMaterial?F:x).get(v.envMap||z.environment),z.envMapRotation=z.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,It===void 0&&(v.addEventListener("dispose",Ht),It=new Map,z.programs=It);let Ut=It.get(Mt);if(Ut!==void 0){if(z.currentProgram===Ut&&z.lightsStateVersion===pt)return Bn(v,yt),Ut}else yt.uniforms=xt.getUniforms(v),v.onBeforeCompile(yt,M),Ut=xt.acquireProgram(yt,Mt),It.set(Mt,Ut),z.uniforms=yt.uniforms;const St=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(St.clippingPlanes=it.uniform),Bn(v,yt),z.needsLights=yi(v),z.lightsStateVersion=pt,z.needsLights&&(St.ambientLightColor.value=I.state.ambient,St.lightProbe.value=I.state.probe,St.directionalLights.value=I.state.directional,St.directionalLightShadows.value=I.state.directionalShadow,St.spotLights.value=I.state.spot,St.spotLightShadows.value=I.state.spotShadow,St.rectAreaLights.value=I.state.rectArea,St.ltc_1.value=I.state.rectAreaLTC1,St.ltc_2.value=I.state.rectAreaLTC2,St.pointLights.value=I.state.point,St.pointLightShadows.value=I.state.pointShadow,St.hemisphereLights.value=I.state.hemi,St.directionalShadowMap.value=I.state.directionalShadowMap,St.directionalShadowMatrix.value=I.state.directionalShadowMatrix,St.spotShadowMap.value=I.state.spotShadowMap,St.spotLightMatrix.value=I.state.spotLightMatrix,St.spotLightMap.value=I.state.spotLightMap,St.pointShadowMap.value=I.state.pointShadowMap,St.pointShadowMatrix.value=I.state.pointShadowMatrix),z.currentProgram=Ut,z.uniformsList=null,Ut}function _i(v){if(v.uniformsList===null){const D=v.currentProgram.getUniforms();v.uniformsList=_r.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function Bn(v,D){const B=Pt.get(v);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function xi(v,D,B,z,I){D.isScene!==!0&&(D=Bt),T.resetTextureUnits();const rt=D.fog,pt=z.isMeshStandardMaterial?D.environment:null,yt=b===null?M.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:xn,Mt=(z.isMeshStandardMaterial?F:x).get(z.envMap||pt),It=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ut=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),St=!!B.morphAttributes.position,$t=!!B.morphAttributes.normal,Jt=!!B.morphAttributes.color;let te=gn;z.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(te=M.toneMapping);const Me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Xt=Me!==void 0?Me.length:0,Tt=Pt.get(z),fe=u.state.lights;if(k===!0&&(J===!0||v!==et)){const Te=v===et&&z.id===L;it.setState(z,v,Te)}let qt=!1;z.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==fe.state.version||Tt.outputColorSpace!==yt||I.isBatchedMesh&&Tt.batching===!1||!I.isBatchedMesh&&Tt.batching===!0||I.isBatchedMesh&&Tt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Tt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Tt.instancing===!1||!I.isInstancedMesh&&Tt.instancing===!0||I.isSkinnedMesh&&Tt.skinning===!1||!I.isSkinnedMesh&&Tt.skinning===!0||I.isInstancedMesh&&Tt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Tt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Tt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Tt.instancingMorph===!1&&I.morphTexture!==null||Tt.envMap!==Mt||z.fog===!0&&Tt.fog!==rt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==it.numPlanes||Tt.numIntersection!==it.numIntersection)||Tt.vertexAlphas!==It||Tt.vertexTangents!==Ut||Tt.morphTargets!==St||Tt.morphNormals!==$t||Tt.morphColors!==Jt||Tt.toneMapping!==te||Tt.morphTargetsCount!==Xt)&&(qt=!0):(qt=!0,Tt.__version=z.version);let Pe=Tt.currentProgram;qt===!0&&(Pe=yn(z,D,I));let zn=!1,we=!1,Pr=!1;const ee=Pe.getUniforms(),an=Tt.uniforms;if(Rt.useProgram(Pe.program)&&(zn=!0,we=!0,Pr=!0),z.id!==L&&(L=z.id,we=!0),zn||et!==v){zt.reverseDepthBuffer?(st.copy(v.projectionMatrix),el(st),nl(st),ee.setValue(A,"projectionMatrix",st)):ee.setValue(A,"projectionMatrix",v.projectionMatrix),ee.setValue(A,"viewMatrix",v.matrixWorldInverse);const Te=ee.map.cameraPosition;Te!==void 0&&Te.setValue(A,Ct.setFromMatrixPosition(v.matrixWorld)),zt.logarithmicDepthBuffer&&ee.setValue(A,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ee.setValue(A,"isOrthographic",v.isOrthographicCamera===!0),et!==v&&(et=v,we=!0,Pr=!0)}if(I.isSkinnedMesh){ee.setOptional(A,I,"bindMatrix"),ee.setOptional(A,I,"bindMatrixInverse");const Te=I.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),ee.setValue(A,"boneTexture",Te.boneTexture,T))}I.isBatchedMesh&&(ee.setOptional(A,I,"batchingTexture"),ee.setValue(A,"batchingTexture",I._matricesTexture,T),ee.setOptional(A,I,"batchingIdTexture"),ee.setValue(A,"batchingIdTexture",I._indirectTexture,T),ee.setOptional(A,I,"batchingColorTexture"),I._colorsTexture!==null&&ee.setValue(A,"batchingColorTexture",I._colorsTexture,T));const Lr=B.morphAttributes;if((Lr.position!==void 0||Lr.normal!==void 0||Lr.color!==void 0)&&tt.update(I,B,Pe),(we||Tt.receiveShadow!==I.receiveShadow)&&(Tt.receiveShadow=I.receiveShadow,ee.setValue(A,"receiveShadow",I.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(an.envMap.value=Mt,an.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&D.environment!==null&&(an.envMapIntensity.value=D.environmentIntensity),we&&(ee.setValue(A,"toneMappingExposure",M.toneMappingExposure),Tt.needsLights&&vi(an,Pr),rt&&z.fog===!0&&at.refreshFogUniforms(an,rt),at.refreshMaterialUniforms(an,z,P,X,u.state.transmissionRenderTarget[v.id]),_r.upload(A,_i(Tt),an,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(_r.upload(A,_i(Tt),an,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ee.setValue(A,"center",I.center),ee.setValue(A,"modelViewMatrix",I.modelViewMatrix),ee.setValue(A,"normalMatrix",I.normalMatrix),ee.setValue(A,"modelMatrix",I.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Te=z.uniformsGroups;for(let Dr=0,s0=Te.length;Dr<s0;Dr++){const xs=Te[Dr];R.update(xs,Pe),R.bind(xs,Pe)}}return Pe}function vi(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function yi(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(v,D,B){Pt.get(v.texture).__webglTexture=D,Pt.get(v.depthTexture).__webglTexture=B;const z=Pt.get(v);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||Nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,D){const B=Pt.get(v);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(v,D=0,B=0){b=v,O=D,C=B;let z=!0,I=null,rt=!1,pt=!1;if(v){const Mt=Pt.get(v);if(Mt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(A.FRAMEBUFFER,null),z=!1;else if(Mt.__webglFramebuffer===void 0)T.setupRenderTarget(v);else if(Mt.__hasExternalTextures)T.rebindTextures(v,Pt.get(v.texture).__webglTexture,Pt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const St=v.depthTexture;if(Mt.__boundDepthTexture!==St){if(St!==null&&Pt.has(St)&&(v.width!==St.image.width||v.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(v)}}const It=v.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(pt=!0);const Ut=Pt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ut[D])?I=Ut[D][B]:I=Ut[D],rt=!0):v.samples>0&&T.useMultisampledRTT(v)===!1?I=Pt.get(v).__webglMultisampledFramebuffer:Array.isArray(Ut)?I=Ut[B]:I=Ut,g.copy(v.viewport),y.copy(v.scissor),V=v.scissorTest}else g.copy(j).multiplyScalar(P).floor(),y.copy(q).multiplyScalar(P).floor(),V=_t;if(Rt.bindFramebuffer(A.FRAMEBUFFER,I)&&z&&Rt.drawBuffers(v,I),Rt.viewport(g),Rt.scissor(y),Rt.setScissorTest(V),rt){const Mt=Pt.get(v.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+D,Mt.__webglTexture,B)}else if(pt){const Mt=Pt.get(v.texture),It=D||0;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,Mt.__webglTexture,B||0,It)}L=-1},this.readRenderTargetPixels=function(v,D,B,z,I,rt,pt){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=Pt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&pt!==void 0&&(yt=yt[pt]),yt){Rt.bindFramebuffer(A.FRAMEBUFFER,yt);try{const Mt=v.texture,It=Mt.format,Ut=Mt.type;if(!zt.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!zt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-z&&B>=0&&B<=v.height-I&&A.readPixels(D,B,z,I,gt.convert(It),gt.convert(Ut),rt)}finally{const Mt=b!==null?Pt.get(b).__webglFramebuffer:null;Rt.bindFramebuffer(A.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(v,D,B,z,I,rt,pt){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=Pt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&pt!==void 0&&(yt=yt[pt]),yt){const Mt=v.texture,It=Mt.format,Ut=Mt.type;if(!zt.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!zt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=v.width-z&&B>=0&&B<=v.height-I){Rt.bindFramebuffer(A.FRAMEBUFFER,yt);const St=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,St),A.bufferData(A.PIXEL_PACK_BUFFER,rt.byteLength,A.STREAM_READ),A.readPixels(D,B,z,I,gt.convert(It),gt.convert(Ut),0);const $t=b!==null?Pt.get(b).__webglFramebuffer:null;Rt.bindFramebuffer(A.FRAMEBUFFER,$t);const Jt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await tl(A,Jt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,St),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,rt),A.deleteBuffer(St),A.deleteSync(Jt),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,D=null,B=0){v.isTexture!==!0&&(gr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,v=arguments[1]);const z=Math.pow(2,-B),I=Math.floor(v.image.width*z),rt=Math.floor(v.image.height*z),pt=D!==null?D.x:0,yt=D!==null?D.y:0;T.setTexture2D(v,0),A.copyTexSubImage2D(A.TEXTURE_2D,B,0,0,pt,yt,I,rt),Rt.unbindTexture()},this.copyTextureToTexture=function(v,D,B=null,z=null,I=0){v.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,v=arguments[1],D=arguments[2],I=arguments[3]||0,B=null);let rt,pt,yt,Mt,It,Ut;B!==null?(rt=B.max.x-B.min.x,pt=B.max.y-B.min.y,yt=B.min.x,Mt=B.min.y):(rt=v.image.width,pt=v.image.height,yt=0,Mt=0),z!==null?(It=z.x,Ut=z.y):(It=0,Ut=0);const St=gt.convert(D.format),$t=gt.convert(D.type);T.setTexture2D(D,0),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,D.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,D.unpackAlignment);const Jt=A.getParameter(A.UNPACK_ROW_LENGTH),te=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Me=A.getParameter(A.UNPACK_SKIP_PIXELS),Xt=A.getParameter(A.UNPACK_SKIP_ROWS),Tt=A.getParameter(A.UNPACK_SKIP_IMAGES),fe=v.isCompressedTexture?v.mipmaps[I]:v.image;A.pixelStorei(A.UNPACK_ROW_LENGTH,fe.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,fe.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,yt),A.pixelStorei(A.UNPACK_SKIP_ROWS,Mt),v.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,I,It,Ut,rt,pt,St,$t,fe.data):v.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,I,It,Ut,fe.width,fe.height,St,fe.data):A.texSubImage2D(A.TEXTURE_2D,I,It,Ut,rt,pt,St,$t,fe),A.pixelStorei(A.UNPACK_ROW_LENGTH,Jt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,te),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Me),A.pixelStorei(A.UNPACK_SKIP_ROWS,Xt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Tt),I===0&&D.generateMipmaps&&A.generateMipmap(A.TEXTURE_2D),Rt.unbindTexture()},this.copyTextureToTexture3D=function(v,D,B=null,z=null,I=0){v.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,v=arguments[2],D=arguments[3],I=arguments[4]||0);let rt,pt,yt,Mt,It,Ut,St,$t,Jt;const te=v.isCompressedTexture?v.mipmaps[I]:v.image;B!==null?(rt=B.max.x-B.min.x,pt=B.max.y-B.min.y,yt=B.max.z-B.min.z,Mt=B.min.x,It=B.min.y,Ut=B.min.z):(rt=te.width,pt=te.height,yt=te.depth,Mt=0,It=0,Ut=0),z!==null?(St=z.x,$t=z.y,Jt=z.z):(St=0,$t=0,Jt=0);const Me=gt.convert(D.format),Xt=gt.convert(D.type);let Tt;if(D.isData3DTexture)T.setTexture3D(D,0),Tt=A.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)T.setTexture2DArray(D,0),Tt=A.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,D.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,D.unpackAlignment);const fe=A.getParameter(A.UNPACK_ROW_LENGTH),qt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Pe=A.getParameter(A.UNPACK_SKIP_PIXELS),zn=A.getParameter(A.UNPACK_SKIP_ROWS),we=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,te.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,te.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Mt),A.pixelStorei(A.UNPACK_SKIP_ROWS,It),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ut),v.isDataTexture||v.isData3DTexture?A.texSubImage3D(Tt,I,St,$t,Jt,rt,pt,yt,Me,Xt,te.data):D.isCompressedArrayTexture?A.compressedTexSubImage3D(Tt,I,St,$t,Jt,rt,pt,yt,Me,te.data):A.texSubImage3D(Tt,I,St,$t,Jt,rt,pt,yt,Me,Xt,te),A.pixelStorei(A.UNPACK_ROW_LENGTH,fe),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,qt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Pe),A.pixelStorei(A.UNPACK_SKIP_ROWS,zn),A.pixelStorei(A.UNPACK_SKIP_IMAGES,we),I===0&&D.generateMipmaps&&A.generateMipmap(Tt),Rt.unbindTexture()},this.initRenderTarget=function(v){Pt.get(v).__webglFramebuffer===void 0&&T.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?T.setTextureCube(v,0):v.isData3DTexture?T.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?T.setTexture2DArray(v,0):T.setTexture2D(v,0),Rt.unbindTexture()},this.resetState=function(){O=0,C=0,b=null,Rt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ps?"display-p3":"srgb",e.unpackColorSpace=Yt.workingColorSpace===br?"display-p3":"srgb"}}class md extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class gd extends Ni{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ho=new ie,Qa=new Go,sr=new Ar,or=new H;class i0 extends ve{constructor(t=new Ve,e=new gd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,a=t.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(r),sr.radius+=a,t.ray.intersectsSphere(sr)===!1)return;ho.copy(r).invert(),Qa.copy(t.ray).applyMatrix4(ho);const l=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=l*l,c=n.index,p=n.attributes.position;if(c!==null){const d=Math.max(0,s.start),m=Math.min(c.count,s.start+s.count);for(let _=d,w=m;_<w;_++){const u=c.getX(_);or.fromBufferAttribute(p,u),po(or,u,o,r,t,e,this)}}else{const d=Math.max(0,s.start),m=Math.min(p.count,s.start+s.count);for(let _=d,w=m;_<w;_++)or.fromBufferAttribute(p,_),po(or,_,o,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}}function po(i,t,e,n,r,a,s){const l=Qa.distanceSqToPoint(i);if(l<e){const o=new H;Qa.closestPointToPoint(i,o),o.applyMatrix4(n);const c=r.ray.origin.distanceTo(o);if(c<r.near||c>r.far)return;a.push({distance:c,distanceToRay:Math.sqrt(l),point:o,index:t,face:null,faceIndex:null,barycoord:null,object:s})}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:os}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=os);const _d=`
attribute vec3 aCloudPos;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aColorRest;
attribute vec3 aColorFull;
attribute float aSize;
attribute float aFig;
attribute float aGroup;
attribute vec2 aEmblem;
attribute float aSeed;
attribute float aBright;
uniform float uTime;
uniform float uSpread;
uniform float uFocus;
uniform float uView;
uniform float uEmScale;
uniform float uHaloR;
uniform float uPx;
uniform float uSize;
uniform float uW0;
uniform float uW1;
uniform float uW2;
uniform float uW3;
varying vec3 vColor;
varying float vAlpha;

// 徽章视图下第 k 面:本组粒子排成镰刀锤头+齿轮+五角星,其余组退为外围暗晕球壳。
// 标志平面随 k 一起绕 Y 轴转 90°,与肖像平面同构;CPU 拾取复算同一公式。
vec3 groupPos(float k) {
  float mine = step(abs(aGroup - k), 0.5);
  float ex = aEmblem.x * uEmScale;
  float ey = aEmblem.y * uEmScale;
  float ez = (fract(aSeed * 13.7) - 0.5) * 0.18;
  float ca = cos(k * 1.5707963), sa = sin(k * 1.5707963);
  vec3 em = vec3(ex * ca + ez * sa, ey, -ex * sa + ez * ca);
  float r = uHaloR * (0.95 + 0.45 * fract(aSeed * 11.3 + k * 0.07));
  float th = fract(aSeed * 3.7 + k * 0.31) * 6.2831853;
  float ph = acos(2.0 * fract(aSeed * 9.13 + k * 0.17) - 1.0);
  vec3 halo = vec3(sin(ph) * cos(th), cos(ph) * 0.82, sin(ph) * sin(th)) * r;
  return mix(halo, em, mine);
}

void main() {
  // 肖像选择:四块互成 90° 的肖像平面,按相机朝向权重混合;
  // 徽章视图下每块平面替换为对应分组的徽章;无平面可见时权重全 0,粒子停留在星云位
  vec3 s0 = mix(position, groupPos(0.0), uView);
  vec3 s1 = mix(aP1, groupPos(1.0), uView);
  vec3 s2 = mix(aP2, groupPos(2.0), uView);
  vec3 s3 = mix(aP3, groupPos(3.0), uView);
  vec3 sel = aCloudPos;
  sel = mix(sel, s0, uW0);
  sel = mix(sel, s1, uW1);
  sel = mix(sel, s2, uW2);
  sel = mix(sel, s3, uW3);

  // 散开系数:整体 uSpread × 逐粒子错峰,回正时层次化聚合
  float sp = uSpread * (0.35 + 0.65 * fract(aSeed * 7.31));
  vec3 pos = mix(sel, aCloudPos, sp);

  // 散开时缓慢漂移;成形时轻微呼吸
  pos += sp * 0.55 * vec3(
    sin(uTime * 0.11 + aSeed * 40.0),
    cos(uTime * 0.13 + aSeed * 23.0),
    sin(uTime * 0.09 + aSeed * 61.0)
  );
  pos.xy += (1.0 - sp) * 0.045 * vec2(
    sin(uTime * 0.50 + aSeed * 80.0),
    cos(uTime * 0.43 + aSeed * 52.0)
  );

  float focusOn = step(0.0, uFocus);
  float isFocus = (uFocus < 0.0) ? 0.0 : step(abs(aFig - uFocus), 0.5);
  // 点亮某人时,其余人的星完全隐去(不是压暗)
  float dim = (uFocus < 0.0) ? 1.0 : isFocus;

  // 标志视图:非当前组既推远又压暗,免得外晕把标志轮廓淹掉
  float gdim = 1.0 - 0.93 * uView * (
    uW0 * (1.0 - step(abs(aGroup - 0.0), 0.5)) +
    uW1 * (1.0 - step(abs(aGroup - 1.0), 0.5)) +
    uW2 * (1.0 - step(abs(aGroup - 2.0), 0.5)) +
    uW3 * (1.0 - step(abs(aGroup - 3.0), 0.5)));

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float tw = 0.72 + 0.28 * sin(uTime * (0.6 + aSeed * 1.7) + aSeed * 100.0);
  float sz = uSize * aSize * (1.0 + focusOn * isFocus * 0.9);
  gl_PointSize = sz * uPx * (140.0 / max(0.001, -mv.z));

  vColor = mix(aColorRest, aColorFull, focusOn * isFocus) * dim * mix(1.0, 0.55, 1.0 - gdim);
  vAlpha = tw * dim * gdim * (0.62 + 0.38 * aBright);
}
`,xd=`
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
uniform float uOpacity;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.02, d);
  a = pow(a, 2.2);
  // 白热核心要小且弱:否则加色混合会把眼窝、眉须这些"暗部空洞"重新糊白
  vec3 col = vColor + vec3(0.85) * smoothstep(0.20, 0.0, d) * 0.30;
  gl_FragColor = vec4(col, a * vAlpha * uOpacity);
}
`,vd=9.2;function yd(i){const t=i.planes[0].bright.length,e=i.height,n=Math.PI/2,r=i.planes.map((L,et)=>{const g=e*L.aspect,y=et*n,V=Math.cos(y),G=Math.sin(y),Y=new Float32Array(t*3);for(let K=0;K<t;K++){const X=L.pts[K*2]*g,P=L.pts[K*2+1]*e,U=(Math.random()+Math.random()+Math.random()-1.5)*.24;Y[K*3]=X*V+U*G,Y[K*3+1]=P,Y[K*3+2]=-X*G+U*V}return Y}),a=r[0],s=new Float32Array(t*3),l=new Float32Array(t*3),o=new Float32Array(t*3),c=new Float32Array(t),h=new Float32Array(t),p=new Float32Array(t),d=new Float32Array(t*2),m=new Float32Array(t),_=new Float32Array(t),w=new kt,u=new kt,f=new kt("#fff6ea"),E=i.emblem||[],M=[0,0,0,0];for(let L=0;L<t;L++){const et=2.2+Math.pow(Math.random(),1.6)*8.5,g=Math.random()*Math.PI*2,y=Math.acos(2*Math.random()-1);s[L*3]=et*Math.sin(y)*Math.cos(g)*1.25,s[L*3+1]=et*Math.cos(y)*.8,s[L*3+2]=et*Math.sin(y)*Math.sin(g)*1.4,w.set(i.colors[L]).lerp(f,.68),u.set(i.colors[L]),l[L*3]=w.r,l[L*3+1]=w.g,l[L*3+2]=w.b,o[L*3]=u.r,o[L*3+1]=u.g,o[L*3+2]=u.b;const V=Math.random()<.02;if(c[L]=V?1.6+Math.random()*.9:.65+Math.random()*.85,h[L]=i.figIndex[L],p[L]=i.groupIdx[L],E.length){const G=E[M[p[L]%4]%E.length];M[p[L]%4]++,d[L*2]=G[0],d[L*2+1]=G[1]}m[L]=Math.random(),_[L]=V?1:(i.planes[0].bright[L]+i.planes[1].bright[L]+i.planes[2].bright[L]+i.planes[3].bright[L])/4*.7+Math.random()*.3}const S=new Ve;S.setAttribute("position",new jt(a,3)),S.setAttribute("aP1",new jt(r[1],3)),S.setAttribute("aP2",new jt(r[2],3)),S.setAttribute("aP3",new jt(r[3],3)),S.setAttribute("aCloudPos",new jt(s,3)),S.setAttribute("aColorRest",new jt(l,3)),S.setAttribute("aColorFull",new jt(o,3)),S.setAttribute("aSize",new jt(c,1)),S.setAttribute("aFig",new jt(h,1)),S.setAttribute("aGroup",new jt(p,1)),S.setAttribute("aEmblem",new jt(d,2)),S.setAttribute("aSeed",new jt(m,1)),S.setAttribute("aBright",new jt(_,1));const O={uTime:{value:0},uSpread:{value:0},uFocus:{value:-1},uView:{value:0},uEmScale:{value:3.05},uHaloR:{value:vd},uPx:{value:Math.min(window.devicePixelRatio||1,2)},uSize:{value:.195},uOpacity:{value:0},uW0:{value:1},uW1:{value:0},uW2:{value:0},uW3:{value:0}},C=new Ge({vertexShader:_d,fragmentShader:xd,uniforms:O,transparent:!0,depthWrite:!1,depthTest:!1,blending:vr}),b=new i0(S,C);return b.frustumCulled=!1,{points:b,uniforms:O,count:t,positions:a,planePositions:r,cloudPos:s,seeds:m,groupIdx:p,emblem:d}}function Md(i=1400){const t=new Float32Array(i*3),e=new Float32Array(i),n=new Float32Array(i);for(let l=0;l<i;l++){const o=46+Math.random()*26,c=Math.random()*Math.PI*2,h=Math.acos(2*Math.random()-1);t[l*3]=o*Math.sin(h)*Math.cos(c),t[l*3+1]=o*Math.cos(h),t[l*3+2]=o*Math.sin(h)*Math.sin(c),e[l]=.4+Math.random()*1.1,n[l]=Math.random()}const r=new Ve;r.setAttribute("position",new jt(t,3)),r.setAttribute("aSize",new jt(e,1)),r.setAttribute("aSeed",new jt(n,1));const a=new Ge({vertexShader:`
      attribute float aSize;
      attribute float aSeed;
      uniform float uTime;
      uniform float uPx;
      varying float vTw;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPx * (320.0 / max(0.001, -mv.z));
        vTw = 0.5 + 0.5 * sin(uTime * (0.3 + aSeed) + aSeed * 90.0);
      }
    `,fragmentShader:`
      precision mediump float;
      varying float vTw;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vec3(0.75, 0.8, 0.95), a * (0.25 + 0.4 * vTw));
      }
    `,uniforms:{uTime:{value:0},uPx:{value:Math.min(window.devicePixelRatio||1,2)}},transparent:!0,depthWrite:!1,blending:vr});return new i0(r,a)}const Be=(i,t,e)=>Math.min(e,Math.max(t,i)),mo=(i,t,e)=>i+(t-i)*e,wd=(i,t,e)=>{const n=Be((e-i)/(t-i),0,1);return n*n*(3-2*n)},go=[0,1,2,3].map(i=>{const t=i*Math.PI/2;return{nx:Math.sin(t),nz:Math.cos(t)}});function Sd(i,t,e,{planes:n}){const r=new pd({canvas:i,antialias:!1,powerPreference:"high-performance"});r.setClearColor(new kt("#07080f"),1);const a=new md,s=new Ae(50,1,.1,200),l=new H(0,.1,0);a.add(e),a.add(t.points);const o={theta:0,phi:1.42,radius:10,fit:10,spread:0,lastInteract:-1e9,dragging:!1,pointers:new Map,pinchDist:0,autoArmed:!1,autoT:0,traveling:!1,fromTheta:0,toTheta:0,speed:1,fly:null,paused:!1,shift:!1,weights:[1,0,0,0],activePlane:0,maxW:1},c=9,h=8;function p(P){const U=Math.tan(s.fov*Math.PI/360);let N=0;for(const j of n){const q=j.h/(1.48*U),_t=j.w/(.94*2*U*P);N=Math.max(N,q,_t)}return N}function d(){const P=i.clientWidth,U=i.clientHeight;if(!P||!U)return;const N=p(P/U);Number.isFinite(N)&&(r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setSize(P,U,!1),s.aspect=P/U,s.updateProjectionMatrix(),o.fit=N,o.radius=Number.isFinite(o.radius)?Be(o.radius,o.fit*.42,o.fit*3.4):o.fit,o.vw=P,o.vh=U)}window.addEventListener("resize",d),d(),o.radius=Number.isFinite(o.radius)?o.radius:o.fit;const m=[];let _=0,w=0,u=0,f=0;i.addEventListener("pointerdown",P=>{try{i.setPointerCapture(P.pointerId)}catch{}if(o.pointers.set(P.pointerId,{x:P.clientX,y:P.clientY}),f=Math.max(f,o.pointers.size),o.dragging=!0,o.lastInteract=performance.now(),o.fly=null,_=P.clientX,w=P.clientY,u=performance.now(),V=!0,o.pointers.size===2){const[U,N]=[...o.pointers.values()];o.pinchDist=Math.hypot(U.x-N.x,U.y-N.y)}}),i.addEventListener("pointermove",P=>{const U=o.pointers.get(P.pointerId);if(!U)return;const N=P.clientX-U.x,j=P.clientY-U.y;if(U.x=P.clientX,U.y=P.clientY,o.lastInteract=performance.now(),o.pointers.size===1)o.theta-=N*.005,o.phi=Be(o.phi-j*.005,.55,2.5);else if(o.pointers.size===2){const[q,_t]=[...o.pointers.values()],Lt=Math.hypot(q.x-_t.x,q.y-_t.y);o.pinchDist>0&&(o.radius=Be(o.radius*(o.pinchDist/Lt),o.fit*.42,o.fit*3.4)),o.pinchDist=Lt}V=!0,G()});const E=P=>{o.pointers.delete(P.pointerId),o.pointers.size===0&&(o.dragging=!1);const U=Math.hypot(P.clientX-_,P.clientY-w);f===1&&U<6&&performance.now()-u<500&&m.forEach(N=>N(P.clientX,P.clientY,P)),o.pointers.size===0&&(f=0),V=!0,G()};i.addEventListener("pointerup",E),i.addEventListener("pointercancel",P=>{o.pointers.delete(P.pointerId),o.pointers.size||(o.dragging=!1)}),i.addEventListener("wheel",P=>{P.preventDefault(),o.lastInteract=performance.now(),o.fly=null,o.radius=Be(o.radius*Math.exp(P.deltaY*.0012),o.fit*.42,o.fit*3.4),V=!0,G()},{passive:!1});const M=new Set,S=P=>P&&(P.tagName==="INPUT"||P.tagName==="TEXTAREA"||P.isContentEditable);window.addEventListener("keydown",P=>{if(S(P.target))return;const U=P.key.toLowerCase();o.shift=P.shiftKey,"wasdqe".includes(U)?(M.add(U),o.lastInteract=performance.now(),o.fly=null,P.preventDefault()):U==="p"&&(o.paused=!o.paused)}),window.addEventListener("keyup",P=>{M.delete(P.key.toLowerCase()),o.shift=P.shiftKey}),window.addEventListener("blur",()=>M.clear());function O(P){if(!M.size)return;const U=o.shift?2.2:1,N=1.5*U*P,j=1.1*U*P,q=7*U*P;M.has("a")&&(o.theta+=N),M.has("d")&&(o.theta-=N),M.has("w")&&(o.phi=Be(o.phi-j,.55,2.5)),M.has("s")&&(o.phi=Be(o.phi+j,.55,2.5)),M.has("q")&&(o.radius=Be(o.radius-q,o.fit*.42,o.fit*3.4)),M.has("e")&&(o.radius=Be(o.radius+q,o.fit*.42,o.fit*3.4)),o.lastInteract=performance.now(),V=!0}const C=[],b=new H;let L=performance.now(),et=0,g=0;function y(P,U=!1){et=P,U||(g=P);const N=Math.max(0,Math.min(.05,(P-L)/1e3));L=P;const j=P/1e3;if((i.clientWidth!==o.vw||i.clientHeight!==o.vh)&&d(),O(N),o.fly){o.fly.t+=N;const wt=Math.min(1,o.fly.t/o.fly.dur),Et=wt<.5?4*wt*wt*wt:1-Math.pow(-2*wt+2,3)/2;o.theta=o.fly.from+(o.fly.to-o.fly.from)*Et,wt>=1&&(o.fly=null)}const q=P-o.lastInteract>4e3;if(o.autoArmed&&q&&!o.fly&&!o.paused){if(o.autoT+=N*o.speed,!o.traveling&&o.autoT>c){o.traveling=!0,o.autoT=0,o.fromTheta=o.theta;const wt=Math.PI/2;o.toTheta=(Math.floor(o.theta/wt)+1)*wt}if(o.traveling){const wt=Math.min(1,o.autoT/h),Et=wt<.5?4*wt*wt*wt:1-Math.pow(-2*wt+2,3)/2;o.theta=o.fromTheta+(o.toTheta-o.fromTheta)*Et,wt>=1&&(o.traveling=!1,o.autoT=0,o.theta=o.toTheta%(Math.PI*2))}}else o.autoT=0,o.traveling=!1;const _t=mo(o.swayAmp||0,q?1:0,Math.min(1,N*1.5));o.swayAmp=_t;const Lt=Math.sin(j*.14)*.1*_t,k=Math.sin(j*.1+1.3)*.05*_t,J=o.theta+Lt,st=Be(o.phi+k,.55,2.5),ut=Math.sin(st);b.set(ut*Math.sin(J),Math.cos(st),ut*Math.cos(J)),s.position.copy(l).addScaledVector(b,o.radius),s.lookAt(l);let Ct=0,bt=0;for(let wt=0;wt<4;wt++){const Et=b.x*go[wt].nx+b.z*go[wt].nz,A=Et<=.7?0:wd(.7,.965,Et);o.weights[wt]=A,A>Ct&&(Ct=A,bt=wt)}o.maxW=Ct,o.activePlane=bt;const Bt=1-Ct;o.spread=mo(o.spread,Bt,Math.min(1,N*3.2)),t.uniforms.uSpread.value=o.spread,t.uniforms.uW0.value=o.weights[0],t.uniforms.uW1.value=o.weights[1],t.uniforms.uW2.value=o.weights[2],t.uniforms.uW3.value=o.weights[3],t.uniforms.uTime.value=j,e.material.uniforms&&(e.material.uniforms.uTime.value=j),r.render(a,s),V=!1,C.forEach(wt=>wt(N,j,P)),U||requestAnimationFrame(wt=>y(wt,!1))}requestAnimationFrame(P=>y(P,!1)),setInterval(()=>{const P=performance.now();P-et>400&&y(P,!0)},300);let V=!1;function G(){V&&(V=!1,y(performance.now(),!0))}const Y=P=>P-Math.floor(P);let K=null;function X(P,U,N=18,j=1){const q=i.getBoundingClientRect();if(!q.width||!q.height)return-1;const _t=P-q.left,Lt=U-q.top,k=s.projectionMatrix.elements,J=s.matrixWorldInverse.elements,st=t.uniforms,ut=st.uW0.value,Ct=st.uW1.value,bt=st.uW2.value,Bt=st.uW3.value,wt=st.uSpread.value,Et=st.uView.value,A=st.uEmScale.value,de=st.uHaloR.value,Nt=t.positions,zt=t.planePositions[1],Rt=t.planePositions[2],Wt=t.planePositions[3],Pt=t.cloudPos,T=t.seeds,x=t.groupIdx,F=t.emblem,Z=t.count,nt=(vt,tt,dt,At,gt)=>{const Dt=Math.abs(dt-vt)<.5?1:0,R=Math.cos(vt*1.5707963),ft=Math.sin(vt*1.5707963),W=F[At*2]*A,Q=F[At*2+1]*A,lt=(Y(tt*13.7)-.5)*.18,ct=de*(.95+.45*Y(tt*11.3+vt*.07)),Ht=Y(tt*3.7+vt*.31)*6.2831853,Zt=Math.acos(2*Y(tt*9.13+vt*.17)-1),ae=Math.sin(Zt)*Math.cos(Ht)*ct,Vt=Math.cos(Zt)*.82*ct,se=Math.sin(Zt)*Math.sin(Ht)*ct,ye=W*R+lt*ft,rn=Q,ke=-W*ft+lt*R;gt[0]=ae+(ye-ae)*Dt,gt[1]=Vt+(rn-Vt)*Dt,gt[2]=se+(ke-se)*Dt},$=[0,0,0],xt=[0,0,0],at=[0,0,0],ht=[0,0,0];if(Et>.001&&!K){K=[0,1,2,3].map(()=>new Float32Array(Z*3));const vt=[0,0,0];for(let tt=0;tt<Z;tt++){const dt=T[tt],At=x[tt];for(let gt=0;gt<4;gt++){nt(gt,dt,At,tt,vt);const Dt=K[gt],R=tt*3;Dt[R]=vt[0],Dt[R+1]=vt[1],Dt[R+2]=vt[2]}}}const Gt=K;let it=-1,mt=N*N;for(let vt=0;vt<Z;vt+=j){const tt=vt*3,dt=T[vt];let At=Pt[tt],gt=Pt[tt+1],Dt=Pt[tt+2];if(Et>.001){const Bn=Gt[0],xi=Gt[1],vi=Gt[2],yi=Gt[3];$[0]=Bn[tt],$[1]=Bn[tt+1],$[2]=Bn[tt+2],xt[0]=xi[tt],xt[1]=xi[tt+1],xt[2]=xi[tt+2],at[0]=vi[tt],at[1]=vi[tt+1],at[2]=vi[tt+2],ht[0]=yi[tt],ht[1]=yi[tt+1],ht[2]=yi[tt+2]}const R=Nt[tt]+($[0]-Nt[tt])*Et,ft=Nt[tt+1]+($[1]-Nt[tt+1])*Et,W=Nt[tt+2]+($[2]-Nt[tt+2])*Et,Q=zt[tt]+(xt[0]-zt[tt])*Et,lt=zt[tt+1]+(xt[1]-zt[tt+1])*Et,ct=zt[tt+2]+(xt[2]-zt[tt+2])*Et,Ht=Rt[tt]+(at[0]-Rt[tt])*Et,Zt=Rt[tt+1]+(at[1]-Rt[tt+1])*Et,ae=Rt[tt+2]+(at[2]-Rt[tt+2])*Et,Vt=Wt[tt]+(ht[0]-Wt[tt])*Et,se=Wt[tt+1]+(ht[1]-Wt[tt+1])*Et,ye=Wt[tt+2]+(ht[2]-Wt[tt+2])*Et;At+=(R-At)*ut,gt+=(ft-gt)*ut,Dt+=(W-Dt)*ut,At+=(Q-At)*Ct,gt+=(lt-gt)*Ct,Dt+=(ct-Dt)*Ct,At+=(Ht-At)*bt,gt+=(Zt-gt)*bt,Dt+=(ae-Dt)*bt,At+=(Vt-At)*Bt,gt+=(se-gt)*Bt,Dt+=(ye-Dt)*Bt;const rn=wt*(.35+.65*Y(dt*7.31));At+=(Pt[tt]-At)*rn,gt+=(Pt[tt+1]-gt)*rn,Dt+=(Pt[tt+2]-Dt)*rn;const ke=J[2]*At+J[6]*gt+J[10]*Dt+J[14];if(ke>=-.5)continue;const Ce=J[0]*At+J[4]*gt+J[8]*Dt+J[12],vn=J[1]*At+J[5]*gt+J[9]*Dt+J[13],mi=k[3]*Ce+k[7]*vn+k[11]*ke+k[15],Oi=((k[0]*Ce+k[4]*vn+k[8]*ke+k[12])/mi*.5+.5)*q.width,On=(-((k[1]*Ce+k[5]*vn+k[9]*ke+k[13])/mi)*.5+.5)*q.height,gi=Oi-_t,yn=On-Lt,_i=gi*gi+yn*yn;_i<mt&&(mt=_i,it=vt)}return it}return{camera:s,renderer:r,onClick(P){m.push(P)},onTick(P){C.push(P)},pickStar:X,armAuto(){o.autoArmed=!0},setSpeed(P){o.speed=P},renderNow(){y(performance.now(),!0)},flyTo(P,U=1.6){const N=Math.PI*2,j=P+Math.round((o.theta-P)/N)*N;o.fly={from:o.theta,to:j,t:0,dur:U},o.autoT=0,o.traveling=!1},getOrientation(){return{active:o.activePlane,maxW:o.maxW}},get lastRafAt(){return g},isDragging(){return o.dragging}}}const gs=[{key:"pioneer",label:"思想先驱"},{key:"founders",label:"创始人"},{key:"inheritors",label:"继承与发展"},{key:"china",label:"在中国"}],Oe=[{id:"moore",name:"托马斯·莫尔",en:"Thomas More",years:"1478–1535",region:"英国",role:"空想社会主义先驱",group:"pioneer",color:"#a78bfa",blurb:"《乌托邦》的作者,空想社会主义的奠基人。"},{id:"campanella",name:"康帕内拉",en:"Tommaso Campanella",years:"1568–1639",region:"意大利",role:"空想社会主义先驱",group:"pioneer",color:"#8a7ff0",blurb:"在狱中写下《太阳城》的理想主义者。"},{id:"saintsimon",name:"圣西门",en:"Henri de Saint-Simon",years:"1760–1825",region:"法国",role:"空想社会主义先驱",group:"pioneer",color:"#6fa8f7",blurb:"设想“实业制度”的空想社会主义先驱。"},{id:"owen",name:"罗伯特·欧文",en:"Robert Owen",years:"1771–1858",region:"英国",role:"空想社会主义先驱",group:"pioneer",color:"#62d5b8",blurb:"新拉纳克的实践者,合作社运动的先驱。"},{id:"fourier",name:"傅立叶",en:"Charles Fourier",years:"1772–1837",region:"法国",role:"空想社会主义先驱",group:"pioneer",color:"#52c7e8",blurb:"构想“和谐制度”与“法郎吉”的空想家。"},{id:"marx",name:"卡尔·马克思",en:"Karl Marx",years:"1818–1883",region:"德国",role:"科学社会主义创始人",group:"founders",color:"#ff4d4d",blurb:"科学社会主义的创始人,《资本论》的作者。"},{id:"engels",name:"弗里德里希·恩格斯",en:"Friedrich Engels",years:"1820–1895",region:"德国",role:"马克思主义共同奠基人",group:"founders",color:"#ff8a5c",blurb:"马克思最亲密的战友,思想的共同奠基人。"},{id:"plekhanov",name:"普列汉诺夫",en:"Georgi Plekhanov",years:"1856–1918",region:"俄国",role:"俄国马克思主义奠基人",group:"inheritors",color:"#b8a7f5",blurb:"俄国马克思主义之父。"},{id:"zetkin",name:"克拉拉·蔡特金",en:"Clara Zetkin",years:"1857–1933",region:"德国",role:"妇女运动领袖",group:"inheritors",color:"#b7e778",blurb:"国际社会主义妇女运动的奠基人。"},{id:"lenin",name:"弗拉基米尔·列宁",en:"Vladimir Lenin",years:"1870–1924",region:"俄国 · 苏联",role:"十月革命领袖",group:"inheritors",color:"#ffb830",blurb:"布尔什维克的缔造者,十月革命的领袖。"},{id:"luxemburg",name:"罗莎·卢森堡",en:"Rosa Luxemburg",years:"1871–1919",region:"波兰 · 德国",role:"革命理论家",group:"inheritors",color:"#ff9ad5",blurb:"德国革命的思想家与烈士。"},{id:"stalin",name:"约瑟夫·斯大林",en:"Joseph Stalin",years:"1878–1953",region:"苏联",role:"苏联领导人",group:"inheritors",color:"#f7dd72",blurb:"领导苏联工业化与卫国战争的领导人。"},{id:"dimitrov",name:"季米特洛夫",en:"Georgi Dimitrov",years:"1882–1949",region:"保加利亚",role:"国际共运领导人",group:"inheritors",color:"#5eead4",blurb:"莱比锡法庭上与法西斯对质的英雄。"},{id:"lidazhao",name:"李大钊",en:"Li Dazhao",years:"1889–1927",region:"中国",role:"中国共产主义先驱",group:"china",color:"#ff6b8a",blurb:"中国最早的马克思主义传播者。"},{id:"hochiminh",name:"胡志明",en:"Hồ Chí Minh",years:"1890–1969",region:"越南",role:"越南革命领袖",group:"inheritors",color:"#f9c74f",blurb:"越南民主共和国的缔造者。"},{id:"gramsci",name:"葛兰西",en:"Antonio Gramsci",years:"1891–1937",region:"意大利",role:"西方马克思主义理论家",group:"inheritors",color:"#8ecae6",blurb:"在狱中写下《狱中札记》的西方马克思主义者。"},{id:"mao",name:"毛泽东",en:"Mao Zedong",years:"1893–1976",region:"中国",role:"中国革命领袖",group:"china",color:"#ff2e54",blurb:"中华人民共和国的缔造者,毛泽东思想的主要创立者。"},{id:"fangzhimin",name:"方志敏",en:"Fang Zhimin",years:"1899–1935",region:"中国",role:"革命烈士",group:"china",color:"#ff8fa3",blurb:"《可爱的中国》的作者,赣东北苏区的创建者。"},{id:"xiaminghan",name:"夏明翰",en:"Xia Minghan",years:"1900–1928",region:"中国",role:"革命烈士",group:"china",color:"#ff5d8f",blurb:"“砍头不要紧,只要主义真”的青年烈士。"},{id:"dengxiaoping",name:"邓小平",en:"Deng Xiaoping",years:"1904–1997",region:"中国",role:"改革开放总设计师",group:"china",color:"#f4a261",blurb:"中国改革开放的总设计师。"},{id:"castro",name:"菲德尔·卡斯特罗",en:"Fidel Castro",years:"1926–2016",region:"古巴",role:"古巴革命领袖",group:"inheritors",color:"#7bdff2",blurb:"古巴革命的领袖。"},{id:"muntzer",name:"托马斯·闵采尔",en:"Thomas Müntzer",years:"1489–1525",region:"德国",role:"农民战争领袖",group:"pioneer",color:"#c9a227",blurb:"把天国搬到地上来的激进改革者,德国农民战争的旗手。"},{id:"weitling",name:"威廉·魏特林",en:"Wilhelm Weitling",years:"1808–1871",region:"德国",role:"空想共产主义者",group:"pioneer",color:"#9ad1a0",blurb:"正义者同盟的理论家,德国工人运动的空想共产主义代表。"},{id:"chernyshevsky",name:"车尔尼雪夫斯基",en:"N. G. Chernyshevsky",years:"1828–1889",region:"俄国",role:"革命民主主义者",group:"pioneer",color:"#e0aaff",blurb:"写在狱中的《怎么办?》,影响了整整几代俄国革命者。"},{id:"bebel",name:"奥古斯特·倍倍尔",en:"August Bebel",years:"1840–1913",region:"德国",role:"社会民主党领袖",group:"inheritors",color:"#89c2d9",blurb:"德国社会民主党的创建者与长期领袖,《妇女与社会主义》的作者。"},{id:"lafargue",name:"保尔·拉法格",en:"Paul Lafargue",years:"1842–1911",region:"法国",role:"马克思主义宣传家",group:"inheritors",color:"#f2ca3a",blurb:"马克思的女婿,《懒惰的权利》的作者,把马克思介绍给法国工人。"},{id:"morris",name:"威廉·莫里斯",en:"William Morris",years:"1834–1896",region:"英国",role:"设计师与社会主义者",group:"inheritors",color:"#7fd1ae",blurb:"工艺美术运动的领袖,也是英国社会主义最早的宣传家之一。"},{id:"guevara",name:"切·格瓦拉",en:"Che Guevara",years:"1928–1967",region:"阿根廷 · 古巴",role:"革命家",group:"inheritors",color:"#e07a5f",blurb:"骑着摩托车读遍南美,然后把一生交给了这片大陆的革命。"},{id:"mariategui",name:"马里亚特吉",en:"José C. Mariátegui",years:"1894–1930",region:"秘鲁",role:"马克思主义思想家",group:"inheritors",color:"#d4a373",blurb:"拉丁美洲马克思主义的奠基人,《关于秘鲁国情的七篇论文》的作者。"},{id:"quqiubai",name:"瞿秋白",en:"Qu Qiubai",years:"1899–1935",region:"中国",role:"早期领袖 · 文学家",group:"china",color:"#f28db2",blurb:"翻译《国际歌》的人,也是写下《多余的话》的人。"},{id:"caihesen",name:"蔡和森",en:"Cai Hesen",years:"1895–1931",region:"中国",role:"早期理论家",group:"china",color:"#6ec6ca",blurb:"最早提出“中国共产党”这一名称的人。"},{id:"dengzhongxia",name:"邓中夏",en:"Deng Zhongxia",years:"1894–1933",region:"中国",role:"工人运动领袖",group:"china",color:"#f4d35e",blurb:"长辛店工人的教员,中国早期职工运动的领导者。"},{id:"zhaoyiman",name:"赵一曼",en:"Zhao Yiman",years:"1905–1936",region:"中国",role:"抗日民族英雄",group:"china",color:"#ff6b81",blurb:"在狱中受尽酷刑而不屈,临刑前给儿子写下遗书。"},{id:"yundaiying",name:"恽代英",en:"Yun Daiying",years:"1895–1931",region:"中国",role:"青年运动领袖",group:"china",color:"#bde0fe",blurb:"青年的楷模,在狱中写下“留得豪情作楚囚”。"},{id:"asiqi",name:"艾思奇",en:"Ai Siqi",years:"1910–1966",region:"中国",role:"马克思主义哲学家",group:"china",color:"#cdb4db",blurb:"用一本《大众哲学》,把哲学交到了普通人手里。"}],si=Object.fromEntries(Oe.map(i=>[i.id,i])),Ed={lenin:["乌里扬诺夫","伊里奇","弗拉基米尔·伊里奇"],stalin:["朱加什维利","科巴"],mao:["润之","润之先生"],lidazhao:["守常"],dengxiaoping:["希贤"],hochiminh:["阮必成","阮爱国"],zetkin:["蔡特金","克拉拉"],luxemburg:["罗莎","卢森堡"],fourier:["傅里叶","沙尔·傅立叶"],owen:["欧文","罗伯特·欧文"],saintsimon:["昂利·圣西门","克劳德"],plekhanov:["沃尔基奇","格奥尔基"],castro:["菲德尔","卡斯特罗"],dimitrov:["格奥尔基·季米特洛夫","季米托夫"],campanella:["康帕内拉"],moore:["托马斯·莫尔"]};for(const i of Oe)i.aka=Ed[i.id]||[];const ni=[{f:"marx",w:"《青年在选择职业时的考虑》",y:1835,t:"我们选择职业时所应遵循的主要指针,是人类的幸福和我们自身的完美。"},{f:"marx",w:"《青年在选择职业时的考虑》",y:1835,t:"如果我们选择了最能为人类福利而劳动的职业,那么,重担就不能把我们压倒,我们的幸福将属于千百万人。"},{f:"marx",w:"《评普鲁士最近的书报检查令》",y:1842,t:"在民主的国家里,法律就是国王;在专制的国家里,国王就是法律。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"批判的武器当然不能代替武器的批判,物质力量只能用物质力量来摧毁。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"理论一经掌握群众,也会变成物质力量。理论只要说服人,就能掌握群众;而理论只要彻底,就能说服人。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"宗教是被压迫生灵的叹息,是无情世界的心境,正像它是无精神活力的制度的精神一样,是人民的鸦片。"},{f:"marx",w:"《摩泽尔记者的辩护》",y:1843,t:"报刊按其使命来说,是社会的捍卫者,是针对当权者的孜孜不倦的揭露者,是无处不在的耳目。"},{f:"marx",w:"《论犹太人问题》",y:1843,t:"任何解放都是使人的世界和人的关系回归于人自身。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"劳动创造了宫殿,却给工人创造了贫民窟。"},{f:"marx",w:"《神圣家族》",y:1845,t:"历史活动是群众的活动。"},{f:"marx",w:"《神圣家族》",y:1845,t:"任何人的职责、使命、任务,就是全面地发展自己的一切能力。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"哲学家们只是用不同的方式解释世界,问题在于改变世界。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"人的本质不是单个人所固有的抽象物,在其现实性上,它是一切社会关系的总和。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"环境的改变和人的活动或自我改变的一致,只能被看做是并合理地理解为革命的实践。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"社会生活在本质上是实践的。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"不是意识决定生活,而是生活决定意识。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"统治阶级的思想在每一时代都是占统治地位的思想。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"一个幽灵,共产主义的幽灵,在欧洲游荡。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"至今一切社会的历史都是阶级斗争的历史。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级把宗教虔诚、骑士热忱、小市民伤感这些情感的神圣发作,淹没在利己主义打算的冰水之中。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"由于机器的推广和分工,工人变成了机器的单纯的附属品。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"一切等级的和固定的东西都烟消云散了。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"过去的一切运动都是少数人的或者为少数人谋利益的运动。无产阶级的运动是绝大多数人的、为绝大多数人谋利益的独立的运动。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"无产者在这个革命中失去的只是锁链,他们获得的将是整个世界。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"代替那存在着阶级和阶级对立的资产阶级旧社会的,将是这样一个联合体,在那里,每个人的自由发展是一切人的自由发展的条件。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"工人没有祖国。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"让统治阶级在共产主义革命面前发抖吧。无产者在这场革命中失去的只是锁链,获得的将是整个世界。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"全世界无产者,联合起来!"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"资本是一种社会生产关系。"},{f:"marx",w:"《〈政治经济学批判〉序言》",y:1859,t:"不是人们的意识决定人们的存在,相反,是人们的社会存在决定人们的意识。"},{f:"marx",w:"《〈政治经济学批判〉序言》",y:1859,t:"物质生活的生产方式制约着整个社会生活、政治生活和精神生活的过程。"},{f:"marx",w:"《〈政治经济学批判〉序言》",y:1859,t:"无论哪一个社会形态,在它所能容纳的全部生产力发挥出来以前,是决不会灭亡的。"},{f:"marx",w:"《〈政治经济学批判〉序言》",y:1859,t:"人类始终只提出自己能够解决的任务。"},{f:"marx",w:"《国际工人协会成立宣言》",y:1864,t:"工人阶级的解放应当由工人阶级自己去争取。"},{f:"marx",w:"《工资、价格和利润》",y:1865,t:"时间是人类发展的空间。一个人如果没有自己处置的时间的自由,他除了奴隶还能是什么样的人。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本来到世间,从头到脚,每个毛孔都滴着血和肮脏的东西。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本是死劳动,它像吸血鬼一样,只有吮吸活劳动才有生命,吮吸的活劳动越多,它的生命就越旺盛。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本害怕没有利润或利润太少,就像自然界害怕真空一样。(引自托·约·登宁)"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"暴力是每一个孕育着新社会的旧社会的助产婆。"},{f:"marx",w:"《资本论》法文版序言",y:1872,t:"在科学上没有平坦的大道,只有不畏劳苦沿着陡峭山路攀登的人,才有希望达到光辉的顶点。"},{f:"marx",w:"《资本论》第二版跋",y:1873,t:"辩证法不崇拜任何东西,按其本质来说,它是批判的和革命的。"},{f:"marx",w:"《法兰西内战》",y:1871,t:"工人的巴黎及其公社将永远作为新社会的光辉先驱受人敬仰。"},{f:"marx",w:"《致路德维希·库格曼》",y:1871,t:"公社的原则是永存的,是消灭不了的。"},{f:"marx",w:"《致路德维希·库格曼》",y:1868,t:"没有妇女的酵素,就不可能有伟大的社会变革;社会的进步可以用女性的社会地位来衡量。"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"各尽所能,按需分配!"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"一步实际运动比一打纲领更重要。"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"权利决不能超出社会的经济结构以及由经济结构制约的社会的文化发展。"},{f:"engels",w:"《英国状况——评托马斯·卡莱尔的〈过去和现在〉》",y:1844,t:"历史就是我们的一切。"},{f:"engels",w:"《英国状况·十八世纪》",y:1844,t:"分工,水力、特别是蒸汽力的利用,机器的应用,这就是从十八世纪中叶起工业用来震撼旧世界基础的三个伟大的杠杆。"},{f:"engels",w:"《卡尔·马克思〈政治经济学批判〉》",y:1859,t:"只要进一步发挥我们的唯物主义论点,并且把它应用于现时代,一个强大的、一切时代最强大的革命远景就会立即展现在我们面前。"},{f:"engels",w:"《〈德国农民战争〉序言》",y:1874,t:"社会主义自从成为科学以来,就要求人们把它当做科学看待。"},{f:"engels",w:"《自然辩证法》",y:1876,t:"劳动创造了人本身。"},{f:"engels",w:"《自然辩证法》",y:1876,t:"一个民族要想站在科学的最高峰,就一刻也不能没有理论思维。"},{f:"engels",w:"《反杜林论》",y:1878,t:"生命是蛋白体的存在方式。"},{f:"engels",w:"《反杜林论》",y:1878,t:"自由是在于根据对自然界的必然性的认识来支配我们自己和外部自然界。"},{f:"engels",w:"《在马克思墓前的讲话》",y:1883,t:"正像达尔文发现有机界的发展规律一样,马克思发现了人类历史的发展规律。"},{f:"engels",w:"《在马克思墓前的讲话》",y:1883,t:"在马克思看来,科学是一种在历史上起推动作用的、革命的力量。"},{f:"engels",w:"《在马克思墓前的讲话》",y:1883,t:"马克思首先是一个革命家。"},{f:"engels",w:"《在马克思墓前的讲话》",y:1883,t:"他可能有过许多敌人,但未必有一个私敌。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"国家不是从来就有的。曾经有过不需要国家、而且根本不知国家和国家权力为何物的社会。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"最初的阶级压迫是同男性对女性的奴役同时发生的。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"妇女解放的第一个先决条件,就是一切女性重新回到公共的劳动中去。"},{f:"engels",w:"《〈法兰西内战〉导言》",y:1891,t:"普选权是测量工人阶级成熟性的标尺。"},{f:"engels",w:"《致弗·凯利-威士涅威茨基夫人》",y:1887,t:"我们的理论是发展着的理论,而不是必须背得烂熟并机械地加以重复的教条。"},{f:"engels",w:"《致约瑟夫·布洛赫》",y:1890,t:"历史过程中的决定性因素,归根到底是现实生活的生产和再生产。"},{f:"engels",w:"《致奥托·伯尼克》",y:1890,t:"所谓社会主义社会,不是一种一成不变的东西,而应当和任何其他社会制度一样,把它看成是经常变化和改革的社会。"},{f:"engels",w:"《致瓦·博尔吉乌斯》",y:1894,t:"社会一旦有技术上的需要,这种需要就会比十所大学更能把科学推向前进。"},{f:"plekhanov",w:"《论个人在历史上的作用问题》",y:1898,t:"一个大人物之所以伟大,在于他所具备的特性使他最有力地服务于当时伟大的社会需要。"},{f:"plekhanov",w:"《论个人在历史上的作用问题》",y:1898,t:"杰出人物只能改变历史事变的个别面貌,却不能改变事变的一般方向。"},{f:"zetkin",w:"《平等报》",y:null,t:"无产阶级妇女的解放,是无产阶级解放事业不可分割的一部分。"},{f:"zetkin",w:"《在国会的演说》",y:1932,t:"一切反对法西斯主义的力量,必须结成统一的战线。"},{f:"lenin",w:"《评经济浪漫主义》",y:1897,t:"判断历史的功绩,不是根据历史活动家没有提供现代所要求的东西,而是根据他们比他们的前辈提供了新的东西。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"没有革命的理论,就没有革命的运动。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"只有以先进理论为指南的党,才能实现先进战士的作用。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"给我们一个革命家组织,我们就能把俄国翻转过来!"},{f:"lenin",w:"《怎么办?》",y:1902,t:"工人本来也不可能有社会民主主义的意识,这种意识只能从外面灌输进去。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"革命是被压迫者和被剥削者的节日。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"帝国主义是资本主义的垄断阶段,也是资本主义的最高阶段。"},{f:"lenin",w:"《大难临头,出路何在?》",y:1917,t:"要么灭亡,要么开足马力奋勇前进,历史就是这样提出问题的。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"国家是阶级矛盾不可调和的产物和表现。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"没有民主,就不可能有社会主义。"},{f:"lenin",w:"《伟大的创举》",y:1919,t:"劳动生产率,归根到底是保证新社会制度胜利的最重要最主要的东西。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"只有用人类创造的全部知识财富来丰富自己的头脑,才能成为共产主义者。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"在一个文盲的国家里,是不能建成共产主义社会的。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"青年的任务是学习,学习,再学习。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"我们的道德完全服从无产阶级阶级斗争的利益。"},{f:"lenin",w:"全俄苏维埃第八次代表大会报告",y:1920,t:"共产主义就是苏维埃政权加全国电气化。"},{f:"lenin",w:"《共产主义运动中的“左派”幼稚病》",y:1920,t:"只要再多走一小步,仿佛是向同一方向迈的一小步,真理便会变成错误。"},{f:"lenin",w:"《共产主义运动中的“左派”幼稚病》",y:1920,t:"小生产是经常地、每日每时地、自发地和大批地产生着资本主义和资产阶级的。"},{f:"lenin",w:"《工会在新经济政策条件下的作用和任务》",y:1921,t:"无产阶级取得政权以后,它的最主要最根本的利益,就是增加产品数量,大大提高社会生产力。"},{f:"lenin",w:"《论合作社》",y:1923,t:"只有实现文化革命,我们才能成为完全的社会主义国家。"},{f:"lenin",w:"《宁肯少些,但要好些》",y:1923,t:"宁肯少些,但要好些。"},{f:"luxemburg",w:"《尤尼乌斯小册子》",y:1916,t:"不是社会主义,就是野蛮!"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"自由始终是,并且始终是持不同思想者的自由。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"只给政府的拥护者以自由,那不是自由。自由的实质,恰恰在于给予持不同思想者以自由。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"没有普选权,没有不受限制的出版自由和结社集会自由,没有自由的意见交锋,一切公共生活都会窒息。"},{f:"luxemburg",w:"《秩序统治着柏林》",y:1919,t:"你们的“秩序”是建筑在沙滩上的。革命明天就将再次挺身而起,宣告:我来过,我现在在,我将永远在!"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"理智上的悲观主义,意志上的乐观主义。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"一个社会集团在夺取国家政权之前,可以先取得文化上的领导权。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"一切人都是知识分子,但并非一切人在社会中都起知识分子的作用。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"在西方,国家一旦发生动摇,市民社会的坚固结构便立即显露出来。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"危机恰恰在于,旧的正在死去,而新的还不能诞生;在这个空隙里,形形色色的病态现象出现了。"},{f:"stalin",w:"《论经济工作人员的任务》",y:1931,t:"在目前,技术决定一切。"},{f:"stalin",w:"《论经济工作人员的任务》",y:1931,t:"落后者是要挨打的。"},{f:"stalin",w:"《在克里姆林宫举行的红军学院学员毕业典礼上的讲话》",y:1935,t:"干部决定一切。"},{f:"stalin",w:"《辩证唯物主义与历史唯物主义》",y:1938,t:"一切以条件、地点和时间为转移。"},{f:"dimitrov",w:"《莱比锡法庭上的演说》",y:1933,t:"历史将会证明,究竟谁站在真理一边。"},{f:"dimitrov",w:"《在共产国际第七次代表大会上的报告》",y:1935,t:"工人阶级的统一战线,是反对法西斯主义的决定性武器。"},{f:"lidazhao",w:"《民彝与政治》",y:1916,t:"人生最高之理想,在求达于真理。"},{f:"lidazhao",w:"《青春》",y:1916,t:"青年之字典,无“困难”之字;青年之口头,无“障碍”之语。"},{f:"lidazhao",w:"《青春》",y:1916,t:"以青春之我,创建青春之家庭、青春之国家、青春之民族、青春之人类。"},{f:"lidazhao",w:"《青春》",y:1916,t:"黄金时代,不在过去,而在未来。"},{f:"lidazhao",w:"《晨钟报》创刊号题词",y:1916,t:"铁肩担道义,妙手著文章。"},{f:"lidazhao",w:"《布尔什维主义的胜利》",y:1918,t:"试看将来的环球,必是赤旗的世界!"},{f:"hochiminh",w:"抗美救国号召",y:1966,t:"没有什么比独立、自由更可贵。"},{f:"hochiminh",w:"《遗嘱》",y:1969,t:"我一生只有一个最大的心愿:如何使我国人民获得完全解放,使人民过上幸福的生活。"},{f:"mao",w:"《星星之火,可以燎原》",y:1930,t:"星星之火,可以燎原。"},{f:"mao",w:"《反对本本主义》",y:1930,t:"没有调查,就没有发言权。"},{f:"mao",w:"《实践论》",y:1937,t:"你要知道梨子的滋味,你就得变革梨子,亲口吃一吃。"},{f:"mao",w:"《论持久战》",y:1938,t:"兵民是胜利之本。"},{f:"mao",w:"《论持久战》",y:1938,t:"战争的伟力之最深厚的根源,存在于民众之中。"},{f:"mao",w:"《战争和战略问题》",y:1938,t:"枪杆子里面出政权。"},{f:"mao",w:"《中国共产党在民族战争中的地位》",y:1938,t:"指导一个伟大的革命运动的政党,如果没有革命理论,没有历史知识,没有对于实际运动的深刻的了解,要取得胜利是不可能的。"},{f:"mao",w:"《纪念白求恩》",y:1939,t:"做一个高尚的人,一个纯粹的人,一个有道德的人,一个脱离了低级趣味的人,一个有益于人民的人。"},{f:"mao",w:"《青年运动的方向》",y:1939,t:"知识分子必须同工农群众相结合。"},{f:"mao",w:"《改造我们的学习》",y:1941,t:"“实事”就是客观存在着的一切事物,“是”就是客观事物的内部联系,即规律性,“求”就是我们去研究。"},{f:"mao",w:"《关于领导方法的若干问题》",y:1943,t:"从群众中来,到群众中去。"},{f:"mao",w:"《为人民服务》",y:1944,t:"为人民服务。"},{f:"mao",w:"《愚公移山》",y:1945,t:"下定决心,不怕牺牲,排除万难,去争取胜利。"},{f:"mao",w:"《论联合政府》",y:1945,t:"人民,只有人民,才是创造世界历史的动力。"},{f:"mao",w:"《论联合政府》",y:1945,t:"全心全意地为人民服务,一刻也不脱离群众。"},{f:"mao",w:"《论联合政府》",y:1945,t:"没有共产党人做中国人民的中流砥柱,中国的独立和解放是不可能的。"},{f:"mao",w:"《关于重庆谈判》",y:1945,t:"前途是光明的,道路是曲折的。"},{f:"mao",w:"《抗日战争胜利后的时局和我们的方针》",y:1945,t:"我们的方针要放在什么基点上?放在自己力量的基点上,叫做自力更生。"},{f:"mao",w:"同安娜·路易斯·斯特朗的谈话",y:1946,t:"一切反动派都是纸老虎。"},{f:"mao",w:"《关于情况的通报》",y:1948,t:"政策和策略是党的生命。"},{f:"mao",w:"《关于农业合作化问题》",y:1955,t:"我们应当相信群众,我们应当相信党。"},{f:"mao",w:"中国共产党第八次全国代表大会开幕词",y:1956,t:"虚心使人进步,骄傲使人落后。"},{f:"mao",w:"在莫斯科大学接见留学生时的讲话",y:1957,t:"世界是你们的,也是我们的,但是归根结底是你们的。"},{f:"mao",w:"《一切反动派都是纸老虎》",y:1957,t:"战略上藐视敌人,战术上重视敌人。"},{f:"mao",w:"《关于正确处理人民内部矛盾的问题》",y:1957,t:"百花齐放,百家争鸣。"},{f:"mao",w:"题词",y:null,t:"好好学习,天天向上。"},{f:"fangzhimin",w:"《死!——共产主义的殉道者的记述》",y:1935,t:"敌人只能砍下我们的头颅,决不能动摇我们的信仰!"},{f:"fangzhimin",w:"《清贫》",y:1935,t:"清贫,洁白朴素的生活,正是我们革命者能够战胜许多困难的地方!"},{f:"fangzhimin",w:"《可爱的中国》",y:1935,t:"我们相信,中国一定有个可赞美的光明前途。"},{f:"fangzhimin",w:"狱中文稿",y:1935,t:"为着共产主义牺牲,为着苏维埃流血,那是我们十分情愿的啊!"},{f:"xiaminghan",w:"就义诗",y:1928,t:"砍头不要紧,只要主义真。杀了夏明翰,还有后来人。"},{f:"xiaminghan",w:"就义前给母亲的信",y:1928,t:"亲爱的妈妈,别难过,别呜咽,别让子规啼血蒙了眼。"},{f:"dengxiaoping",w:"《尊重知识,尊重人才》",y:1977,t:"尊重知识,尊重人才。"},{f:"dengxiaoping",w:"《解放思想,实事求是,团结一致向前看》",y:1978,t:"解放思想,实事求是,团结一致向前看。"},{f:"dengxiaoping",w:"《怎么恢复农业生产》",y:1962,t:"黄猫、黑猫,只要捉住老鼠就是好猫。"},{f:"dengxiaoping",w:"《邓小平文集》英文版序言",y:1981,t:"我是中国人民的儿子,我深情地爱着我的祖国和人民。"},{f:"dengxiaoping",w:"“一个国家,两种制度”谈话",y:1984,t:"一个国家,两种制度。"},{f:"dengxiaoping",w:"会见外宾时的谈话",y:1985,t:"改革是中国的第二次革命。"},{f:"dengxiaoping",w:"《和平和发展是当代世界的两大问题》",y:1985,t:"和平和发展是当代世界的两大问题。"},{f:"dengxiaoping",w:"会见捷克斯洛伐克总统胡萨克时的谈话",y:1988,t:"科学技术是第一生产力。"},{f:"dengxiaoping",w:"题词",y:1983,t:"教育要面向现代化,面向世界,面向未来。"},{f:"dengxiaoping",w:"南方谈话",y:1992,t:"社会主义的本质,是解放生产力,发展生产力,消灭剥削,消除两极分化,最终达到共同富裕。"},{f:"dengxiaoping",w:"南方谈话",y:1992,t:"发展才是硬道理。"},{f:"dengxiaoping",w:"南方谈话",y:1992,t:"贫穷不是社会主义,发展太慢也不是社会主义。"},{f:"dengxiaoping",w:"南方谈话",y:1992,t:"我坚信,世界上赞成马克思主义的人会多起来,因为马克思主义是科学。"},{f:"dengxiaoping",w:"关于稳定问题的谈话",y:1989,t:"稳定压倒一切。"},{f:"castro",w:"《历史将宣判我无罪》",y:1953,t:"判决我吧,没有关系,历史将宣判我无罪。"},{f:"castro",w:"《对知识分子的讲话》",y:1961,t:"革命,就是改变一切应当改变的东西。"},{f:"moore",w:"《乌托邦》",y:1516,t:"羊本来是温驯的动物,现在却变得贪婪凶悍,甚至要把人吃掉。"},{f:"moore",w:"《乌托邦》",y:1516,t:"我深信,如不彻底废除私有制,产品不可能公平分配,人类不可能获得普遍的幸福。"},{f:"campanella",w:"《太阳城》",y:1602,t:"在太阳城里,人人都参加劳动,劳动受到普遍的尊重。"},{f:"campanella",w:"《太阳城》",y:1602,t:"利己主义是一切罪恶的根源。"},{f:"saintsimon",w:"《论实业制度》",y:1821,t:"一切人都应当劳动。"},{f:"saintsimon",w:"《圣西门选集》",y:null,t:"一切社会设施的目的,都应当是改善最贫穷阶级的物质的、精神的和道德的生活。"},{f:"saintsimon",w:"《圣西门选集》",y:null,t:"黄金时代不在我们背后,而在我们前面。"},{f:"owen",w:"《新社会观》",y:1813,t:"人的性格是先天组织和人所处的环境的产物。"},{f:"owen",w:"《致拉纳克郡报告》",y:1820,t:"新的道德世界,将在联合劳动、联合占有、联合享受的合作公社的基础上建立起来。"},{f:"owen",w:"《人类思想和实践中的革命》",y:1849,t:"私有制、宗教和现在的婚姻形式,是妨碍社会改造的三大障碍。"},{f:"fourier",w:"《傅立叶选集》",y:null,t:"妇女解放的程度,是衡量普遍解放的天然尺度。"},{f:"fourier",w:"《关于四种运动和普遍命运的理论》",y:1808,t:"文明制度处在恶性循环中,在它自己不断制造出来而又无法克服的矛盾中打转。"},{f:"fourier",w:"《傅立叶选集》",y:null,t:"在和谐制度下,劳动将变成一种娱乐,变成吸引人的活动。"},{f:"marx",w:"《黑格尔法哲学批判》导言",y:1843,t:"对宗教的批判是其他一切批判的前提。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"对宗教的批判最后归结为人是人的最高本质这样一个学说,从而归结为这样的绝对命令:必须推翻那些使人成为被侮辱、被奴役、被遗弃和被蔑视的东西的一切关系。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"德国人的解放就是人的解放。这个解放的头脑是哲学,它的心脏是无产阶级。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"哲学不消灭无产阶级,就不能成为现实;无产阶级不把哲学变成现实,就不可能消灭自身。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"思想的闪电一旦彻底击中这块素朴的人民园地,德国人就会解放成为人。"},{f:"marx",w:"《论犹太人问题》",y:1843,t:"政治解放本身并不是一般的、彻底的解放。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"自然界是人无机的身体。人靠自然界生活,这就是说,自然界是人为了不致死亡而必须与之处于持续不断的交互作用过程的人的身体。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"只有音乐才能激起人的音乐感,对于没有音乐感的耳朵来说,最美的音乐也毫无意义。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"动物只在直接需要的支配下生产,人却善于依照任何一个种的标准来生产,并且处处都把固有的尺度运用于对象;因此,人也按照美的规律来构造。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"私有制使我们变得如此愚蠢而片面,以致一个对象,只有当它为我们所拥有的时候,才是我们的。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"五官感觉的形成是迄今为止全部世界历史的产物。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"共产主义是私有财产即人的自我异化的积极的扬弃,因而是不通过中介、对自己的人的本质的现实的占有。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"宗教、家庭、国家、法、道德、科学、艺术等等,都不过是生产的一些特殊的方式,并且受生产的普遍规律的支配。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"理论的对立本身的解决,只有通过实践方式,只有借助于人的实践力量,才是可能的。"},{f:"marx",w:"《神圣家族》",y:1845,t:"思想一旦离开利益,就一定会使自己出丑。"},{f:"marx",w:"《神圣家族》",y:1845,t:'历史什么事情也没有做,它"并不拥有任何无穷尽的富有的东西",它既没有在任何战斗中作战过!创造这一切、拥有这一切并为这一切而斗争的,不是"历史",而正是人,现实的、活生生的人。'},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"从前一切唯物主义的主要缺点是:对对象、现实、感性,只是从客体的或者直观的形式去理解,而不是把它们当做感性的人的活动,当做实践去理解。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"费尔巴哈不满意抽象的思维而喜欢直观;但是他把感性不是看做实践的、人的感性的活动。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"宗教感情本身是社会的产物,而他所分析的抽象的个人,是属于一定的社会形式的。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"直观的唯物主义,即不是把感性理解为实践活动的唯物主义,至多也只能达到对单个人和市民社会的直观。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"在共产主义社会中,任何人都没有特殊的活动范围,因而有可能使我按照自己的兴趣,今天干这事,明天干那事,上午打猎,下午捕鱼,傍晚从事畜牧,晚饭后从事批判。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"分工的各个不同发展阶段,同时也就是所有制的各种不同形式。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"统治阶级的思想在每一时代都是占统治地位的思想,这就是说,一个阶级是社会上占统治地位的物质力量,同时也是社会上占统治地位的精神力量。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"生产力、资金和社会交往形式的不停的紧张运动,这种运动使革命成为必需。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"社会关系和由此产生的规律,决不是永恒的。它们是历史的、暂时的规律。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"资产阶级在它的发展初期曾经是一个非常革命的阶级。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"工人阶级在其发展的进程中,终将用一种消除阶级和阶级对立的联合体来代替旧的市民社会。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"机器发明引起分工,而机器既造成一种分工,又造成另一种分工。"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"黑人就是黑人。只有在一定的关系下,他才成为奴隶。纺纱机是纺棉花的机器。只有在一定的关系下,它才成为资本。"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"资本以雇佣劳动为前提,雇佣劳动以资本为前提。它们互相产生,互相制约。"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"随着新的生产力的获得,人们便改变自己的生产方式;而改变了生产方式,人们便也改变自己的全部社会关系。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级在历史上曾经起过非常革命的作用。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级除非对生产工具,从而对生产关系,从而对全部社会关系不断地进行革命,否则就不能生存下去。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级在它的不到一百年的阶级统治中所创造出来的生产力,比过去一切世代创造的全部生产力还要多,还要大。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"不断扩大产品销路的需要,驱使资产阶级奔走于全球各地;它必须到处落户,到处开发,到处建立联系。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级按照自己的面貌为自己创造出一个世界。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"你们的观念本身是资产阶级的生产关系和所有制关系的产物,正像你们的法不过是被奉为法律的你们这个阶级的意志一样。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"共产党人可以把自己的理论概括为一句话:消灭私有制。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"共产主义并不剥夺任何人占有社会产品的权力,它只剥夺利用这种占有去奴役他人劳动的权力。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"工人革命的第一步就是使无产阶级上升为统治阶级,争得民主。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"当阶级差别已经消失而全部生产集中在联合起来的个人的手里的时候,公共权力就失去了政治性质。"},{f:"marx",w:"《资本论》",y:1867,t:"资本是死劳动,它像吸血鬼一样,只有吸吮活的劳动才生存,并且它生存的活泼程度,同它吸吮的活劳动量成正比例。"},{f:"marx",w:"《资本论》",y:1867,t:"劳动过程结束时得到的结果,在这个过程开始时就已经在劳动者的表象中存在着,已经观念地存在着。"},{f:"marx",w:"《资本论》",y:1867,t:"蜘蛛的活动与织工的活动相似,蜜蜂建筑蜂房的本领使人间的许多建筑师感到惭愧;但是最蹩脚的建筑师比最灵巧的蜜蜂高明的地方,是他在用蜂蜡建筑蜂房以前,已经在自己的头脑中把它建成了。"},{f:"marx",w:"《资本论》",y:1867,t:"商品形式的奥秘不过在于:商品形式在人们面前把人们本身劳动的社会性质,反映成劳动产品本身的物的性质。"},{f:"marx",w:"《资本论》",y:1867,t:"资本不是物,而是一定的、社会的、属于一定历史社会形态的生产关系。"},{f:"marx",w:"《资本论》",y:1867,t:"生产资料的集中和劳动的社会化,达到了同它们的资本主义外壳不能相容的地步。这个外壳就要炸毁了。资本主义私有制的丧钟就要响了,剥夺者就要被剥夺了。"},{f:"marx",w:"《资本论》",y:1867,t:"我的观点是把经济的社会形态的发展理解为一种自然史的过程。"},{f:"marx",w:"《资本论》",y:1867,t:"有百分之五十的利润,它就铤而走险;为了百分之百的利润,它就敢践踏人间一切法律;有百分之三百的利润,它就敢犯任何罪行,甚至冒绞死的危险。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"自由王国只是在由必需和外在目的规定要做的劳动终止的地方才开始,因而按照事物的本性来说,它存在于真正物质生产领域的彼岸。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"社会化的人,联合起来的生产者,将合理地调节他们和自然之间的物质变换,把它置于他们的共同控制之下。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"生产、分配、交换和消费构成一个总体的各个环节,一个统一体内部的差别。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"希腊艺术仍然被当作标准和高不可及的范本;一个成人不能再变成儿童,否则就变得稚气了,但是儿童的天真不使他感到愉快吗?"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"人的依赖关系是最初的社会形态;以物的依赖性为基础的人的独立性,是第二大形态;建立在个人全面发展和他们的共同生产能力成为社会财富这一基础上的自由个性,是第三个阶段。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"真正的财富就是所有个人的发达的生产力。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"一切节省,归根到底都归结为时间的节省。"},{f:"marx",w:"《〈政治经济学批判〉序言》",y:1859,t:"社会的物质生产力发展到一定阶段,便同它们一直在其中运动的现存生产关系发生矛盾;于是这些关系便由生产力的发展形式变成生产力的桎梏,那时社会革命的时代就到来了。"},{f:"marx",w:"《〈政治经济学批判〉序言》",y:1859,t:"大体说来,亚细亚的、古代的、封建的和现代资产阶级的生产方式,可以看作是经济的社会形态演进的几个时代。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"黑格尔在某个地方说过,一切伟大的世界历史事变和人物,可以说都出现两次;他忘记补充一点:第一次是作为悲剧出现,第二次是作为笑剧出现。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"人们自己创造自己的历史,但是他们并不是随心所欲地创造,并不是在他们自己选定的条件下创造,而是在直接碰到的、既定的、从过去承继下来的条件下创造。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"一切已死的先辈们的传统,像梦魇一样纠缠着活人的头脑。"},{f:"marx",w:"《法兰西内战》",y:1871,t:"工人阶级不能简单地掌握现成的国家机器,并运用它来达到自己的目的。"},{f:"marx",w:"《法兰西内战》",y:1871,t:"公社的真正秘密在于:它实质上是工人阶级的政府,是生产者阶级同占有者阶级斗争的产物,是终于发现的、可以使劳动在经济上获得解放的政治形式。"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"在资本主义社会和共产主义社会之间,有一个从前者变为后者的革命转变时期;同这个时期相适应的也有一个政治上的过渡时期,这个时期的国家只能是无产阶级的革命专政。"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"在共产主义社会高级阶段,在迫使个人奴隶般地服从分工的情形已经消失之后,社会才能在自己的旗帜上写上:各尽所能,按需分配!"},{f:"marx",w:"《评普鲁士最近的书报检查令》",y:1842,t:"出版自由本身就是思想的展现,是精神的运动,因此它应当有权利只服从自己本身的规律。"},{f:"marx",w:"《第六届莱茵省议会的辩论》",y:1842,t:"法官是法律世界的国王,除了法律就没有别的上司。"},{f:"marx",w:"《关于林木盗窃法的辩论》",y:1843,t:"立法者应当把自己看做一个自然科学家,他不是在创造法律,不是在发明法律,而仅仅是在表述法律。"},{f:"marx",w:"《莱茵报》",y:1842,t:"人们奋斗所争取的一切,都同他们的利益有关。"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"革命是历史的火车头。"},{f:"marx",w:"《国际工人协会共同章程》",y:1871,t:"没有无义务的权利,也没有无权利的义务。"},{f:"marx",w:"《资本论》第一卷第二版跋",y:1873,t:"辩证法在对现存事物的肯定的理解中同时包含对现存事物的否定的理解;辩证法不崇拜任何东西,按其本质来说,它是批判的和革命的。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"发展人们的生产力,这是必需的实际前提,因为如果没有这种发展,那就只会有贫穷、极端贫困的普遍化。"},{f:"engels",w:"在马克思墓前的讲话",y:1883,t:"3月14日下午两点三刻,当代最伟大的思想家停止思想了。"},{f:"engels",w:"在马克思墓前的讲话",y:1883,t:"马克思发现了现代资本主义生产方式和它所产生的资产阶级社会的特殊的运动规律,即剩余价值规律。"},{f:"engels",w:"在马克思墓前的讲话",y:1883,t:"一生中能有这样两个发现,该是很够了;即使只能作出一个这样的发现,也已经是幸福的了。"},{f:"engels",w:"在马克思墓前的讲话",y:1883,t:"他可能有过许多敌人,但未必有一个私敌。他的英名和事业将永垂不朽!"},{f:"engels",w:"《社会主义从空想到科学的发展》",y:1880,t:"现代社会主义,就其内容来说,首先是对统治于现代社会中的有产者和无产者之间、资本家和雇佣工人之间的阶级对立和统治于生产中的无政府状态这两个方面进行考察的结果。"},{f:"engels",w:"《社会主义从空想到科学的发展》",y:1880,t:"资本主义的基本矛盾,是生产的社会性和占有制的资本主义形式之间的矛盾。"},{f:"engels",w:"《社会主义从空想到科学的发展》",y:1880,t:"国家真正作为整个社会的代表所采取的第一个行动,即以社会的名义占有生产资料,同时也是它作为国家所采取的最后一个独立行动。"},{f:"engels",w:"《社会主义从空想到科学的发展》",y:1880,t:"那时,国家政权对社会关系的干预在各个领域中将先后成为多余的事情而自行停止下来;对人的统治,将由对物的管理和对生产过程的领导所代替。"},{f:"engels",w:"《社会主义从空想到科学的发展》",y:1880,t:"一旦社会占有了生产资料,社会生产内部的无政府状态将为有计划的自觉的组织所代替。"},{f:"engels",w:"《社会主义从空想到科学的发展》",y:1880,t:"只是从这时起,人们才完全自觉地自己创造自己的历史;这是人类从必然王国进入自由王国的飞跃。"},{f:"engels",w:"《反杜林论》",y:1878,t:"原则不是研究的出发点,而是它的最终结果;这些原则不是被应用于自然界和人类历史,而是从它们中抽象出来的。"},{f:"engels",w:"《反杜林论》",y:1878,t:"自由不在于幻想中摆脱自然规律而独立,而在于认识这些规律,从而能够有计划地使自然规律为一定的目的服务。"},{f:"engels",w:"《反杜林论》",y:1878,t:"平等应当不仅仅是表面的,不仅仅在国家的领域中实行,它还应当是实际的,还应当在社会的、经济的领域中实行。"},{f:"engels",w:"《反杜林论》",y:1878,t:"奴隶制在当时的条件下是一个巨大的进步;没有奴隶制,就没有希腊国家,就没有希腊的艺术和科学。"},{f:"engels",w:"《反杜林论》",y:1878,t:"暴力本身依赖于经济条件,依赖于工业的、生产力的水平;暴力不过是手段,目的却是经济利益。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"我们不要过分陶醉于我们人类对自然界的胜利;对于每一次这样的胜利,自然界都对我们进行报复。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"自然界不是存在着,而是生成着并消逝着。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"运动,从最广义来说,是存在的方式,是物质的固有属性。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"生命是蛋白体的存在方式,这种存在方式本质上就在于这些蛋白体的化学组成部分的不断的自我更新。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"一切运动都存在于吸引和排斥的相互作用中。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"全部哲学,特别是近代哲学的重大的基本问题,是思维和存在的关系问题。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"劳动发展史是理解全部社会史的锁钥。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"一门科学提出的每一种新见解都包含这门科学的术语的革命。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"历史中的决定性因素,归根结底是直接生活的生产和再生产。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"母权制的被推翻,乃是女性的具有世界历史意义的失败;丈夫在家庭中掌握了政权,而妻子则被贬低、被奴役,变成丈夫淫欲的奴隶,变成单纯的生孩子的工具了。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"结婚的充分自由,只有在消灭了资本主义生产和它所造成的财产关系之后,才能普遍实现。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"国家并不是从来就有的;国家是社会在一定发展阶段上的产物。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"为了使这些对立面、这些经济利益互相冲突的阶级,不致在无结果的斗争中把自己和社会消灭,就需要有一种表面上凌驾于社会之上的力量。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"你们赞美自己的家庭,而工人的家庭却一切都被剥夺了;你们建立教堂,而工人们却连栖身之所都没有。"},{f:"engels",w:"《论权威》",y:1874,t:"把权威原则说成是绝对坏的东西,而把自治原则说成是绝对好的东西,这是荒谬的;权威与自治是相对的东西,它们的应用范围是为社会发展阶段的不同而不同的。"},{f:"engels",w:"《论权威》",y:1874,t:"革命是天下最权威的东西;革命是一部分人口用刀枪刺刀这样权威的武器来强制推行自己意志的行为。"},{f:"engels",w:"致约·布洛赫的信",y:1890,t:"根据唯物史观,历史过程中的决定性因素归根到底是现实生活的生产和再生产。"},{f:"engels",w:"致约·布洛赫的信",y:1890,t:"历史是这样创造的:最终的结果总是从许多单个的意志的相互冲突中产生出来的,这样就有无数互相交错的力量,有无数个力的平行四边形,由此就产生出一个合力,即历史结果。"},{f:"engels",w:"致康·施米特的信",y:1890,t:"马克思的整个世界观不是教义,而是方法;它提供的不是现成的教条,而是进一步研究的出发点和供这种研究使用的方法。"},{f:"engels",w:"《共产党宣言》1872年德文版序言",y:1872,t:"这些原理的实际运用,随时随地都要以当时的历史条件为转移。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"共产主义的社会制度,将社会上一切成员全面地发展、运用和发挥他们的能力。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"私有制不能由社会主义直接变成公有制,它只能逐步地改造社会。"},{f:"engels",w:"致卡洛·特尔察齐的信",y:1879,t:"为了进行斗争,我们必须把我们的一切力量拧成一股绳,并使这些力量集中在同一个攻击点上。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"没有革命的理论,就不会有革命的运动。"},{f:"lenin",w:"《进一步,退两步》",y:1904,t:"党应当是组织的,而不是无政府主义的;集中制的思想,就是要有统一的党章、统一的党的机关。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"革命的首要根本问题就是国家政权问题。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"无产阶级应当把民主革命进行到底,把农民群众争取过来,使农民成为无产阶级的同盟者。"},{f:"lenin",w:"《马克思主义的三个来源和三个组成部分》",y:1913,t:"马克思主义的学说所以万能,就是因为它正确;它十分完备而严整,给予人们一个决不同任何迷信、任何反动势力作妥协的完整世界观。"},{f:"lenin",w:"《马克思主义的三个来源和三个组成部分》",y:1913,t:"现代历史唯物主义把唯物主义贯彻到底,把它延伸到反映社会生活的领域。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"帝国主义是资本主义的垄断阶段;帝国主义是腐朽的、垂死的资本主义。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"生产的社会化有了巨大的进展,技术上的进步也是如此;但是占有仍然是私人的。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"私有经济关系和私有制关系已经变成与内容不相适应的外壳了;如果人为地拖延消除这个外壳的日子,它还是不可避免地要腐烂下去。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"帝国主义是无产阶级社会革命的前夜。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"国家是阶级矛盾不可调和的产物和表现;在阶级矛盾客观上不能调和的地方、时候和条件下,便产生国家。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"被压迫阶级的解放,不仅非暴力革命不可,而且非打碎资产阶级国家机器不可。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"从资本主义过渡到共产主义,在政治方面,中间必然有一段漫长的、困难的、艰难的历程。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"马克思和恩格斯多次说过,新型的共产主义国家已经不是原来意义上的国家了。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"提高劳动生产率,保证为社会劳动创造比资本主义制度下更高的生产率。"},{f:"lenin",w:"《伟大的创举》",y:1919,t:"共产主义劳动,即为社会进行的无报酬的劳动,是向新社会纪律过渡的开始。"},{f:"lenin",w:"《伟大的创举》",y:1919,t:"要成就一件大事业,必须从小事做起。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"必须了解人类创造的一切财富来丰富自己的头脑,否则共产主义就只能是空中楼阁。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"我们不需要刻本上的共产主义教育;离开工作,离开斗争,从共产主义小册子和著作中得来的共产主义知识,可以说一文不值。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"政党通常是由最有威信、最有影响、最有经验、被选出担任最重要职务而称为领袖的人们所组成的比较稳定的集团来主持的。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"布尔什维克所以能够作成这事,是因为有铁的纪律;而无产阶级的无条件的集中加严格的纪律,是战胜困难的重要条件。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"公开承认错误,揭露错误的原因,分析产生错误的环境,仔细讨论改正错误的方法——这就是一个郑重的党的标志。"},{f:"lenin",w:"《宁肯少些,但要好些》",y:1923,t:"我们应当改正错误;我们不应当害怕承认错误。"},{f:"lenin",w:"《日记摘录》",y:1923,t:"文化革命:这是我们的全部事业,是我们应当坚持不懈地、有步骤地、耐心地来进行的。"},{f:"lenin",w:"《论我国革命》",y:1923,t:"为什么首先由于帝国主义战争而使那些国家的人民起来革命,就不可以呢?"},{f:"lenin",w:"在俄共(布)第十次代表大会上的报告",y:1921,t:"政治同经济相比不能不占首位;不肯定这一点,就是忘记了马克思主义的最起码的常识。"},{f:"lenin",w:"《关于全俄中央执行委员会和人民委员会的工作》",y:1920,t:"宪法就是一张写着人民权利的纸。"},{f:"lenin",w:"《给美国工人的信》",y:1918,t:"革命的规律是:少数人服从多数人;被剥削者阶级的代表者,应当执行多数人的意志。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"无产阶级文化并不是从天上掉下来的,而是人类在资本主义社会、地主社会和官僚社会压迫下创造出来的全部知识合乎规律的发展。"},{f:"lenin",w:"《又一次消灭社会主义》",y:1913,t:"马克思主义的全部精神,它的整个体系,要求人们对每一个原理都要历史地、都要同其他原理联系起来、都要同具体的历史经验联系起来加以考察。"},{f:"lenin",w:"《斯维尔德洛夫大学讲话》",y:1918,t:"历史上常有这样的事:有些时候,几十年过去什么也没有发生;有些时候,在几天之内就发生了相当于几十年的事件。"},{f:"lenin",w:"《论民族自决权》",y:1914,t:"不承认民族自决权,不主张民族自决,就决不能进行反对帝国主义的斗争。"},{f:"lenin",w:"《无产阶级革命的军事纲领》",y:1915,t:"变帝国主义战争为国内战争,是无产阶级在国际战争中的唯一正确的口号。"},{f:"lenin",w:"《远方通信》",y:1917,t:"面包!和平!土地!——这就是当时群众最迫切的要求。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"或者是社会主义,或者是社会回到野蛮状态。"},{f:"luxemburg",w:"《社会民主党的危机》(尤尼乌斯小册子)",y:1916,t:"帝国主义是世界范围内争夺尚未被吞噬的劳动领域和自然环境的竞争,它每前进一步,都伴随着军国主义、殖民掠夺和战争。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"自由历来是同情政府的人的自由;自由始终是,同时也就是思想不同者的自由。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"没有普选,没有不受约束的出版和集会自由,没有自由的意见交锋,公共生活中的生命就会熄灭,只有官僚仍是其中活跃的灵魂。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"在党的历史上,一个真正革命的党所犯的错误,往往比少数最天才的领袖的正确判断更有价值。"},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:"革命是活生生的东西,它随时都在创造新的形式;谁不运动,谁就感觉不到自己的锁链。"},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:"群众罢工是革命的一个环节,它既不是人为制造的,也不是凭日期决定的,它是在历史的进程中以自然的必然性产生的。"},{f:"luxemburg",w:"《社会革命论(俄国革命)》",y:1918,t:'革命并不是靠领袖的"天才"来创造奇迹的;革命在活着的群众中是不可战胜的。'},{f:"luxemburg",w:"《斯巴达克斯》报社论",y:1919,t:"柏林的街头战斗还在继续!革命将创造奇迹。"},{f:"luxemburg",w:"狱中致友人的信",y:1917,t:"生活多么美好啊,它包含着那么多幸福和完美;即使在狱中,我也仍然是我。"},{f:"luxemburg",w:"狱中致索比奇的信",y:1917,t:"我政治上的热情,是我生命的呼吸;如果我不能呼吸,我就无法生活。"},{f:"luxemburg",w:"《资本积累论》",y:1913,t:"资本积累必须以非资本主义的社会环境为前提,它像吸血鬼一样不断地吸收这些环境,直到把它们吞噬干净。"},{f:"luxemburg",w:"《论柏林纲领草案》",y:1895,t:"社会主义不是由法令颁布的;它必须由觉悟的群众自己创造出来。"},{f:"gramsci",w:"《狱中札记》",y:1929,t:"旧世界正在死去,新世界无法诞生;在这个空位期,各种病态现象纷纷出现。"},{f:"gramsci",w:"《狱中书简》",y:1926,t:"我既不悲观也不乐观:我是意志的信徒;用理智的悲观去看清形势,用意志的乐观去改变形势。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"人人都是知识分子,但并非一切人在社会中都充当知识分子的角色。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"一个阶级取得统治,不仅要在经济上占主导,还要在精神和道德上取得领导权;它必须能说服被统治者认同它的方向。"},{f:"gramsci",w:"《狱中札记》",y:1931,t:"现代君主,即共产党,不能靠强制来统治,它首先必须是教育者。"},{f:"gramsci",w:"《狱中札记》",y:1934,t:"批判性的思考,就是把思想同现实的关系弄清楚,并且认识到自己是在历史中思想的。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"不能领导的人,也就不会被领导;而不会服从的人,也不会领导。"},{f:"gramsci",w:"《狱中札记》",y:1929,t:"常识只不过是历史留下的大量民间智慧的沉积,其中既有文明的沉淀,也有蒙昧的残渣。"},{f:"gramsci",w:"《狱中札记》",y:1933,t:'在西方,国家机器只是外壳,市民社会才是坚固的堑壕;因此革命必须是长期的"阵地战",而不是一次性的"运动战"。'},{f:"gramsci",w:"《狱中书简》",y:1927,t:"我并不认为自己是天才,但我确信自己有一种顽强的、不屈不挠的意志。"},{f:"gramsci",w:"《狱中书简》",y:1926,t:"我要求自己做一件事:不要灰心丧气;要研究自己,认识自己,把自己重新组织起来。"},{f:"gramsci",w:"《狱中札记》",y:1932,t:"文化是对人自身的征服,是对自己的个性的塑造,是对传统和惰性的持续斗争。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"没有认识到的必然,就不可能有真正的自由;自由是对必然的认识和对世界的改造。"},{f:"gramsci",w:"《新秩序》周刊时期的号召",y:1919,t:"学习,因为我们需要全部的智慧;斗争,因为我们需要全部的热情;组织,因为我们需要全部的力量。"},{f:"gramsci",w:"《狱中札记》",y:1934,t:"一切都被历史所决定,但历史是由人们的行动所创造的。"},{f:"mao",w:"《中国社会各阶级的分析》",y:1925,t:"谁是我们的敌人?谁是我们的朋友?这个问题是革命的首要问题。"},{f:"mao",w:"《湖南农民运动考察报告》",y:1927,t:"革命不是请客吃饭,不是做文章,不是绘画绣花,不能那样雅致,那样从容不迫,文质彬彬,那样温良恭俭让。"},{f:"mao",w:"《湖南农民运动考察报告》",y:1927,t:"很短时间之内,广东同全国都将起一个大变动;这种变动,是所谓糟得很,还是好得很?我的意见,是好得很。"},{f:"mao",w:"《中国的红色政权为什么能够存在?》",y:1928,t:"边界红旗子始终不倒,不但表示了共产党的力量,而且表示了统治阶级的破产。"},{f:"mao",w:"《星星之火,可以燎原》",y:1930,t:"它是站在海岸遥望海中已经看得见桅杆尖头了的一只航船,它是立于高山之巅远看东方已见光芒四射喷薄欲出的一轮朝日,它是躁动于母腹中的快要成熟了的一个婴儿。"},{f:"mao",w:"《反对本本主义》",y:1930,t:"没有调查,没有发言权。"},{f:"mao",w:"《反对本本主义》",y:1930,t:"你对于那个问题不能解决吗?那末,你就去调查那个问题的现状和它的历史吧!你完完全全调查明白了,你对那个问题就有解决的办法了。"},{f:"mao",w:"《反对本本主义》",y:1930,t:'马克思主义的"本本"是要学习的,但是必须同我国的实际情况相结合。'},{f:"mao",w:"《反对本本主义》",y:1930,t:"中国革命斗争的胜利要靠中国同志了解中国情况。"},{f:"mao",w:"《矛盾论》",y:1937,t:"事物发展的根本原因,不是在事物的外部而是在事物的内部,在于事物内部的矛盾性。"},{f:"mao",w:"《矛盾论》",y:1937,t:"外因是变化的条件,内因是变化的根据,外因通过内因而起作用。"},{f:"mao",w:"《矛盾论》",y:1937,t:"不同质的矛盾,只有用不同质的方法才能解决。"},{f:"mao",w:"《实践论》",y:1937,t:"通过实践而发现真理,又通过实践而证实真理和发展真理。"},{f:"mao",w:"《实践论》",y:1937,t:"实践、认识、再实践、再认识,这种形式,循环往复以至无穷,而实践和认识之每一循环的内容,都比较地进到了高一级的程度。"},{f:"mao",w:"《实践论》",y:1937,t:"真理的标准只能是社会的实践。"},{f:"mao",w:"《论持久战》",y:1938,t:"武器是战争的重要因素,但不是决定的因素,决定的因素是人不是物。"},{f:"mao",w:"《论持久战》",y:1938,t:"最后的胜利属于中国,而不是属于日本。"},{f:"mao",w:"《〈共产党人〉发刊词》",y:1939,t:"统一战线,武装斗争,党的建设,是中国共产党在中国革命中战胜敌人的三个法宝。"},{f:"mao",w:"《中国革命和中国共产党》",y:1939,t:"一个有觉悟的工人阶级,如果忘记了本阶级的根本利益,忘记了整个民族的根本利益,他就不是一个马克思主义者。"},{f:"mao",w:"《新民主主义论》",y:1940,t:"民族的科学的大众的文化,就是人民大众反帝反封建的文化,就是中华民族的新文化。"},{f:"mao",w:"《新民主主义论》",y:1940,t:"一定的文化(当作观念形态的文化)是一定社会的政治和经济的反映,又给予伟大影响和作用于一定社会的政治和经济。"},{f:"mao",w:"《改造我们的学习》",y:1941,t:"墙上芦苇,头重脚轻根底浅;山间竹笋,嘴尖皮厚腹中空。"},{f:"mao",w:"《整顿党的作风》",y:1942,t:"学风问题是领导机关、全体干部、全体党员的思想方法问题,是我们对待马克思列宁主义的态度问题。"},{f:"mao",w:"《反对党八股》",y:1942,t:"党八股这个形式,不但不便于表现革命精神,而且非常容易使革命精神窒息。"},{f:"mao",w:"《在延安文艺座谈会上的讲话》",y:1942,t:"为什么人的问题,是一个根本的问题,原则的问题。"},{f:"mao",w:"《在延安文艺座谈会上的讲话》",y:1942,t:"我们的文学艺术都是为人民大众的,首先是为工农兵的。"},{f:"mao",w:"《为人民服务》",y:1944,t:"人固有一死,或重于泰山,或轻于鸿毛。"},{f:"mao",w:"《为人民服务》",y:1944,t:"我们的同志在困难的时候,要看到成绩,要看到光明,要提高我们的勇气。"},{f:"mao",w:"《为人民服务》",y:1944,t:"我们这个队伍完全是为着解放人民的,是彻底地为人民的利益工作的。"},{f:"mao",w:"《抗日战争胜利后的时局和我们的方针》",y:1945,t:"针锋相对,寸土必争。"},{f:"mao",w:"在中国共产党第七届中央委员会第二次全体会议上的报告",y:1949,t:"夺取全国胜利,这只是万里长征走完了第一步。"},{f:"mao",w:"在中国共产党第七届中央委员会第二次全体会议上的报告",y:1949,t:"务必使同志们继续地保持谦虚、谨慎、不骄、不躁的作风,务必使同志们继续地保持艰苦奋斗的作风。"},{f:"mao",w:"在中国共产党第七届中央委员会第二次全体会议上的报告",y:1949,t:"可能有这样一些共产党人,他们是不曾被拿枪的敌人征服过的,但是经不起人们用糖衣裹着的炮弹的攻击,他们在糖弹面前要打败仗。"},{f:"mao",w:"在中国人民政治协商会议第一届全体会议上的开幕词",y:1949,t:"占人类总数四分之一的中国人民从此站起来了。"},{f:"mao",w:"《唯心历史观的破产》",y:1949,t:"世间一切事物中,人是第一个可宝贵的;在共产党领导下,只要有了人,什么人间奇迹也可以造出来。"},{f:"mao",w:"《论十大关系》",y:1956,t:"提出这十个问题,都是围绕着一个基本方针,就是要把国内外一切积极因素调动起来,为社会主义事业服务。"},{f:"mao",w:"《关于正确处理人民内部矛盾的问题》",y:1957,t:"团结—批评—团结,即从团结的愿望出发,经过批评或者斗争,使矛盾得到解决,从而在新的基础上达到新的团结。"},{f:"mao",w:"《一九五七年夏季的形势》",y:1957,t:"要造成一个又有集中又有民主,又有纪律又有自由,又有统一意志、又有个人心情舒畅、生动活泼那样一种政治局面。"},{f:"mao",w:"《介绍一个合作社》",y:1958,t:"中国六亿人口的显著特点是一穷二白;这些看来是坏事,其实是好事,穷则思变,要干,要革命。"},{f:"mao",w:"《工作方法六十条(草案)》",y:1958,t:"政治工作是一切经济工作的生命线。"},{f:"mao",w:"《关于农业合作化问题》按语",y:1955,t:"严重的问题是教育农民。"},{f:"mao",w:"《浣溪沙·和柳亚子先生》",y:1950,t:"一唱雄鸡天下白,万方乐奏有于阗。"},{f:"mao",w:"《沁园春·长沙》",y:1925,t:"问苍茫大地,谁主沉浮?"},{f:"mao",w:"《沁园春·长沙》",y:1925,t:"指点江山,激扬文字,粪土当年万户侯。"},{f:"mao",w:"《西江月·井冈山》",y:1928,t:"敌军围困万千重,我自岿然不动。"},{f:"mao",w:"《采桑子·重阳》",y:1929,t:"人生易老天难老,岁岁重阳。今又重阳,战地黄花分外香。"},{f:"mao",w:"《清平乐·会昌》",y:1934,t:"踏遍青山人未老,风景这边独好。"},{f:"mao",w:"《忆秦娥·娄山关》",y:1935,t:"雄关漫道真如铁,而今迈步从头越。"},{f:"mao",w:"《七律·长征》",y:1935,t:"红军不怕远征难,万水千山只等闲。"},{f:"mao",w:"《清平乐·六盘山》",y:1935,t:"天高云淡,望断南飞雁。不到长城非好汉,屈指行程二万。"},{f:"mao",w:"《沁园春·雪》",y:1936,t:"俱往矣,数风流人物,还看今朝。"},{f:"mao",w:"《七律·人民解放军占领南京》",y:1949,t:"宜将剩勇追穷寇,不可沽名学霸王。天若有情天亦老,人间正道是沧桑。"},{f:"mao",w:"《七律·和柳亚子先生》",y:1949,t:"牢骚太盛防肠断,风物长宜放眼量。"},{f:"mao",w:"《七律·到韶山》",y:1959,t:"为有牺牲多壮志,敢教日月换新天。"},{f:"mao",w:"《卜算子·咏梅》",y:1961,t:"俏也不争春,只把春来报。待到山花烂漫时,她在丛中笑。"},{f:"mao",w:"《七律·和郭沫若同志》",y:1961,t:"金猴奋起千钧棒,玉宇澄清万里埃。"},{f:"mao",w:"《满江红·和郭沫若同志》",y:1963,t:"一万年太久,只争朝夕。"},{f:"mao",w:"《水调歌头·重上井冈山》",y:1965,t:"可上九天揽月,可下五洋捉鳖。世上无难事,只要肯登攀。"},{f:"mao",w:"《七律·冬云》",y:1962,t:"独有英雄驱虎豹,更无豪杰怕熊罴。"},{f:"mao",w:'《渔家傲·反第一次大"围剿"》',y:1931,t:"唤起工农千百万,同心干,不周山下红旗乱。"},{f:"lidazhao",w:"《青春》",y:1916,t:"以青春之我,创建青春之家庭,青春之国家,青春之民族,青春之人类,青春之地球,青春之宇宙。"},{f:"lidazhao",w:"《青春》",y:1916,t:'青年之字典,无"困难"之字;青年之口头,无"障碍"之语。'},{f:"lidazhao",w:"《青春》",y:1916,t:"进前而勿顾后,背黑暗而向光明,为世界进文明,为人类造幸福。"},{f:"lidazhao",w:"《庶民的胜利》",y:1918,t:"这回胜利,不是军阀的胜利,是庶民的胜利,是全世界庶民的胜利。"},{f:"lidazhao",w:"《我的马克思主义观》",y:1919,t:"一个社会主义者,为使他的主义在世界上发生一些影响,必须要研究怎么可以把他的理想尽量应用于环绕着他的实境。"},{f:"lidazhao",w:"《我的马克思主义观》",y:1919,t:"阶级斗争的学说,就像一条金线,把这社会的本质、社会的运动、社会的变革,统统串起来了。"},{f:"lidazhao",w:"《李大钊文集》",y:null,t:"凡事都要脚踏实地去作,不驰于空想,不骛于虚声,而惟以求真的态度作踏实的工夫。"},{f:"lidazhao",w:"就义前的演说",y:1927,t:"不能因为你们绞死了我,就绞死了共产主义!我们已经培养了很多同志,如同把种子撒在地里,必然会开花结果!"},{f:"dengxiaoping",w:"《解放思想,实事求是,团结一致向前看》",y:1978,t:"一个党,一个国家,一个民族,如果一切从本本出发,思想僵化,迷信盛行,那它就不能前进,它的生机就停止了,就要亡党亡国。"},{f:"dengxiaoping",w:"《解放思想,实事求是,团结一致向前看》",y:1978,t:"民主是解放思想的重要条件;为了保障人民民主,必须加强法制,必须使民主制度化、法律化。"},{f:"dengxiaoping",w:"《坚持四项基本原则》",y:1979,t:"没有民主就没有社会主义,就没有社会主义的现代化。"},{f:"dengxiaoping",w:"在中国共产党第十二次全国代表大会的开幕词",y:1982,t:"把马克思主义的普遍真理同我国的具体实际结合起来,走自己的道路,建设有中国特色的社会主义。"},{f:"dengxiaoping",w:"《社会主义和市场经济不存在根本矛盾》",y:1985,t:"社会主义的目的就是要全国人民共同富裕,不是两极分化;一个公有制占主体,一个共同富裕,这是我们所必须坚持的社会主义的根本原则。"},{f:"dengxiaoping",w:"《改革是中国的第二次革命》",y:1985,t:"革命是解放生产力,改革也是解放生产力。"},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:"计划多一点还是市场多一点,不是社会主义与资本主义的本质区别;计划经济不等于社会主义,资本主义也有计划;市场经济不等于资本主义,社会主义也有市场。"},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:"社会主义要赢得与资本主义相比较的优势,就必须大胆吸收和借鉴人类社会创造的一切文明成果。"},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:"基本路线要管一百年,动摇不得。"},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:"不争论,是为了争取时间干;一争论就复杂了,把时间都争掉了,什么也干不成。"},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:'特区姓"社"不姓"资";抓住机遇,发展自己,关键是发展经济。'},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:"两手抓,一手抓改革开放,一手抓打击各种犯罪活动;这两只手都要硬。"},{f:"dengxiaoping",w:"《和平和发展是当代世界的两大问题》",y:1985,t:"现在世界上真正大的问题,带全球性的战略问题,一个是和平问题,一个是经济问题或者说发展问题。"},{f:"dengxiaoping",w:"《党和国家领导制度的改革》",y:1980,t:"领导制度、组织制度问题更带有根本性、全局性、稳定性和长期性。"},{f:"dengxiaoping",w:"在中国共产党第十二次全国代表大会的开幕词",y:1982,t:"中国的事情要按照中国的情况来办,要依靠中国人自己的力量来办。"},{f:"fangzhimin",w:"《可爱的中国》",y:1935,t:"中国是生育我们的母亲;你们觉得这位母亲可爱吗?我想你们是和我一样的见解,都觉得这位母亲是蛮可爱蛮可爱的。"},{f:"fangzhimin",w:"《可爱的中国》",y:1935,t:"到那时,欢歌将代替了悲叹,笑脸将代替了哭脸,富裕将代替了贫穷,康健将代替了疾苦,智慧将代替了愚昧,友爱将代替了仇杀,生之快乐将代替了死之悲哀,明媚的花园将代替了凄凉的荒地!"},{f:"fangzhimin",w:"《清贫》",y:1935,t:"经手的款项,总在数百万元;但为革命而筹集的金钱,是一点一滴的用之于革命事业。"},{f:"fangzhimin",w:"《清贫》",y:1935,t:"矜持不苟,舍己为公,却是每个共产党员具备的美德。"},{f:"fangzhimin",w:"《清贫》",y:1935,t:"为着阶级和民族的解放,为着党的事业的成功,我毫不希罕那华丽的大厦,却宁愿居住在卑陋潮湿的茅棚。"},{f:"xiaminghan",w:"就义诗(其二)",y:1928,t:"坚持革命继吾志,誓将真理传人寰。"},{f:"xiaminghan",w:"就义前写给大姐的信",y:1928,t:"我一生无遗憾,认定了共产主义这个为人类翻身造幸福的真理,就刀山敢上,火海敢闯,甘愿抛头颅,洒热血。"},{f:"zetkin",w:"在哥本哈根第二次国际妇女代表会议上的发言",y:1910,t:"为了争取妇女的选举权和劳动权,各国妇女应当每年举行一次国际妇女日,以群众性的斗争阵势来提出自己的要求。"},{f:"zetkin",w:"在国会发表的最后一次演说",y:1932,t:"我坚信:胜利终归属于社会主义!"},{f:"zetkin",w:"《纪念三月十八日》",y:1921,t:"妇女的解放,只能是劳动者自己的事业;没有无产阶级的解放,就没有妇女的解放。"},{f:"plekhanov",w:"《个人在历史上的作用》",y:1898,t:"伟大人物之所以伟大,不是因为他能改变历史的趋势,而是因为他比其他人更能理解那个趋势,并能自觉地代表它。"},{f:"plekhanov",w:"《论艺术(没有地址的信)》",y:1900,t:"劳动先于艺术;原始人的舞蹈、歌唱和图案,都直接起源于生产劳动。"},{f:"plekhanov",w:"《社会主义与政治斗争》",y:1883,t:"马克思的学说不是片面的经济学说,而是对全部社会生活的完整说明,是无产阶级的完整世界观。"},{f:"plekhanov",w:"《论一元论历史观之发展》",y:1897,t:"社会存在决定社会意识;不是人们的意识决定人们的存在,而是人们的社会存在决定人们的意识。"},{f:"stalin",w:"《论列宁主义基础》",y:1924,t:"列宁主义是帝国主义和无产阶级革命时代的马克思主义。"},{f:"stalin",w:"《马克思主义和民族问题》",y:1913,t:"民族是人们在历史上形成的一个有共同语言、共同地域、共同经济生活以及表现于共同文化上的共同心理素质的稳定的共同体。"},{f:"dimitrov",w:"《在共产国际第七次代表大会上的报告》",y:1935,t:"法西斯主义在现实中,是金融资本最露骨、最恐怖、最具有帝国主义性的专政。"},{f:"dimitrov",w:"《在共产国际第七次代表大会上的报告》",y:1935,t:"共产党人应当为建立最广泛的反法西斯人民阵线而斗争;统一战线是反对法西斯主义的基本武器。"},{f:"dimitrov",w:"在莱比锡法庭上的自我辩护",y:1934,t:"我站在这里受审,不是作为一个普通的被告,而是作为一个为无产阶级解放事业而斗争的战士。"},{f:"hochiminh",w:"《越南独立宣言》",y:1945,t:"没有什么比独立、自由更宝贵的了。"},{f:"hochiminh",w:"《革命道德》",y:1958,t:"忠实于祖国,忠实于阶级,忠实于国际朋友,为党为民族牺牲一切。"},{f:"hochiminh",w:"越南劳动党第二次全国代表大会政治报告",y:1960,t:"团结,团结,大团结;成功,成功,大成功。"},{f:"hochiminh",w:"《抗法号召书》",y:1946,t:"越南人民决心牺牲一切,决不屈服,决不肯做奴隶。"},{f:"hochiminh",w:"遗嘱",y:1969,t:"我一生只有全心全意为革命服务、为祖国服务、为阶级服务这一个愿望。"},{f:"hochiminh",w:"《论青年》",y:1951,t:"青年是祖国的未来,是革命的接班人;必须教育青年,使成为有德有才的人。"},{f:"castro",w:"《论革命者的爱情》",y:1964,t:"一个革命者最突出的特征,是激情。"},{f:"castro",w:"在哈瓦那群众大会上的口号",y:1960,t:"祖国或死亡,我们必胜!"},{f:"castro",w:"《对知识分子的讲话》",y:1961,t:"革命的权利,就是改变一切应当改变的东西;而首先要改变的,是无知。"},{f:"moore",w:"《乌托邦》",y:1516,t:"你们的国家,不过是一群富人为了自己的利益而假借国家之名所进行的阴谋。"},{f:"moore",w:"就义时的答问",y:1535,t:"我是国王的好仆人,但首先是上帝的好仆人。"},{f:"campanella",w:"《太阳城》",y:1602,t:"在太阳城里,贫穷和富有这两种疾病是根本不存在的。"},{f:"campanella",w:"《太阳城》",y:1602,t:"人人都为公共福利而劳动;游手好闲的人,不能靠他人生活。"},{f:"campanella",w:"《太阳城》",y:1602,t:"孩子们断乳之后,就交给公共的保姆抚育,受公共的教育。"},{f:"saintsimon",w:"《论实业制度》",y:1817,t:"政治科学是关于生产的科学;政治的全部目的在于生产。"},{f:"saintsimon",w:"《生产者》",y:1821,t:"如果法国同时失去五十个最重要的实业家,它会立即失去国家的灵魂;如果失去五千个游手好闲者,也不过是失去了五千个儿子。"},{f:"owen",w:"《新社会观》",y:1813,t:"文明人所受的苦难,是他自己的制度造成的;这个制度并不合理,它把人变成了机器。"},{f:"owen",w:"在新拉纳克的演说",y:1817,t:"我用二十五年的经验证明了:工人的幸福与工厂的利润并不矛盾,而是互相促进的。"},{f:"owen",w:"《人类思想和实践中的革命》",y:1849,t:"现有的社会制度,是以个人私有和单独劳动为基础的,它必然产生无知、奢侈和垄断。"},{f:"fourier",w:"《新的工业世界》",y:1829,t:"在文明制度下,贫困是由富裕本身产生的。"},{f:"fourier",w:"《新的工业世界》",y:1829,t:"在文明制度下,医生希望病人增多,建筑师希望房屋倒塌,玻璃匠希望冰雹打碎所有的玻璃窗。"},{f:"fourier",w:"《论商业》",y:1845,t:"社会应当保证每个成员享有:足够的食物、适当的住所、必需的教育和劳动。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"共产主义是完成了的自然主义,等于人道主义;而作为完成了的人道主义,等于自然主义。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"共产主义是人和自然界之间、人和人之间的矛盾的真正解决,是存在和本质、对象化和自我确证、自由和必然、个体和类之间斗争的真正解决。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"工业的历史和工业的已经产生的对象性的存在,是一本打开了的关于人的本质力量的书。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"囿于粗陋的实际需要的感觉只具有有限的意义;对于饥肠辘辘的人,食物只是充饥的手段,而没有食物的形式。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"人的感觉、感觉的人性,都只是由于它的对象的存在,由于人化的自然界,才产生出来的。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"只是同人的本质相一致的感觉,才是人的感觉。"},{f:"marx",w:"《神圣家族》",y:1845,t:'历史什么事情也没有做,创造这一切、拥有这一切并为这一切而斗争的,不是"历史",而正是人,现实的、活生生的人。'},{f:"marx",w:"《神圣家族》",y:1845,t:"历史不过是追求着自己目的的人的活动而已。"},{f:"marx",w:"《神圣家族》",y:1845,t:"批判的批判什么都没有创造,而工人阶级却创造了一切。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"共产主义对我们来说不是应当确立的状况,不是现实应当与之相适应的理想;我们称为共产主义的是那种消灭现存状况的现实的运动。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"只有在共同体中,个人才能获得全面发展其才能的手段;也就是说,只有在共同体中才可能有个人自由。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"在真正的共同体中,各个人在自己的联合中并通过这种联合获得自己的自由。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"各个人的全面的依存关系,在这种条件下变成了他们对这种作为他们自己的共同关系的联合的支配。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"分工和私有制是相等的表达方式,对同一件事情,一个是就活动而言,另一个是就活动的产品而言。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:'个人生产物质生活本身,这是人们为了"创造历史"必须能够生活的第一前提。'},{f:"marx",w:"《哲学的贫困》",y:1847,t:"没有对抗就没有进步,这是文明直到今天所遵循的规律。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"经济条件起初把大批居民变成工人,随后才使这些工人获得工业资本的形态。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"大工业把自然力并入生产过程,大规模地应用自然科学,有系统地应用机器,并引起劳动的全面协作。"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"资本也以雇佣劳动为前提;它们彼此互相产生,互相制约。"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"工资是对一定数量的劳动所支付的货币额;资本是积蓄的劳动。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"压迫者和被压迫者,始终处于相互对立的地位,进行不断的、有时隐蔽有时公开的斗争。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级使农村屈服于城市的统治;它创立了巨大的城市,使人口分散状况得到纠正。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级挖掉了工业脚下的民族基础,各民族之间的相互依赖代替了地方的自给自足。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"新的工业的建立,成为一切文明民族的生命攸关的问题。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级把它所占有的人口,变成雇佣劳动,变成资本。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"共产党人强调和坚持整个无产阶级共同的不分民族的利益。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"共产主义革命,就是同传统的所有制关系实行最彻底的决裂;毫不奇怪,它在自己的发展进程中要同传统的观念实行最彻底的决裂。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"资产阶级用来推翻封建制度的武器,现在却对准资产阶级自己了。"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"革命死了,革命万岁!"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"社会共和国不能仅仅是一句空话,它应当有与这个名字相称的内容。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"世界历史形式的第一个优点是它重复一次,第二个优点是它作为笑剧出现。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"社会革命不能从过去,而只能从未来汲取自己的诗情。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"以前的革命是超人的语言,是从过去借来的诗句;革命的斗争一旦达到自己的目的,就会自己抛弃这种迷信。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"小资产阶级的民主派,像所有的庸人一样,把民主主义当作一个万能药方。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"生产直接是消费,消费直接是生产;每一方直接是它的对方。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"消费生产出生产者的素质,因为它在生产者身上引起追求目的的需要。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"艺术对象创造出懂得艺术和能够欣赏美的大众。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"资本的逻辑表明:一般社会财富从形式上说仍然是以交换价值为基础。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"真正的节约是劳动时间的节约,而这要求把劳动时间分配到其他各种用途上去。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"自由时间——不论是闲暇时间还是从事较高级活动的时间——自然要把占有它的人变为另一主体。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"固定资本的发展表明,一般社会知识已经在多么大的程度上变成了直接的生产力。"},{f:"marx",w:"《政治经济学批判》",y:1859,t:"决不是人们的意识决定人们的存在,相反,是人们的社会存在决定人们的意识。"},{f:"marx",w:"《资本论》",y:1867,t:"货币的持有者,为了找到商品,必须在流通领域中碰到一个自由的工人,即自己出卖劳动力的人。"},{f:"marx",w:"《资本论》",y:1867,t:"劳动力的价值,是由生产并且再生产这个特殊商品所必需的劳动时间决定的。"},{f:"marx",w:"《资本论》",y:1867,t:"工作日有一个最高界限,它既受工人身体力量的限制,也受工人精神力量的限制。"},{f:"marx",w:"《资本论》",y:1867,t:"资本没有发明工作日的延长,它只是使这种延长成为体系。"},{f:"marx",w:"《资本论》",y:1867,t:"剩余劳动的占有,是资本的秘密。"},{f:"marx",w:"《资本论》",y:1867,t:"机器本身不创造价值,它只是把自己的价值转移到产品上去。"},{f:"marx",w:"《资本论》",y:1867,t:"机器成了资本支配劳动的权力,成了生产相对剩余价值的方法。"},{f:"marx",w:"《资本论》",y:1867,t:"工厂法是社会上第一个对工人阶级的健康和正常状况进行有意识的、有计划的社会控制。"},{f:"marx",w:"《资本论》",y:1867,t:"教育会生产劳动能力。"},{f:"marx",w:"《资本论》",y:1867,t:"劳动生产率同自然条件有密切的关系,不发达的国家比发达的国家需要更多的劳动时间。"},{f:"marx",w:"《资本论》",y:1867,t:"过分的劳动使劳动力过早枯竭,资本对劳动力的榨取,是以牺牲工人的寿命为代价的。"},{f:"marx",w:"《资本论》",y:1867,t:"对直接生产者的剥夺,是用最残酷无情的野蛮手段,在最下流、最龌龊、最卑鄙和最可恶的贪欲的驱使下完成的。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"资本主义生产方式的基础是剩余价值的生产,是利润。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"在这个直接的生产形式上,资本关系是以劳动者和劳动的客观条件的分离为出发点的。"},{f:"marx",w:"《国际工人协会成立宣言》",y:1864,t:"工人阶级的解放斗争不是要争取阶级特权和垄断权,而是要争取平等的权利和义务,并消灭任何阶级统治。"},{f:"marx",w:"《国际工人协会成立宣言》",y:1864,t:"劳动的解放既不是一个地方的问题,也不是一个民族的问题,而是涉及存在现代社会的一切国家的问题。"},{f:"marx",w:"《国际工人协会共同章程》",y:1871,t:"加入国际工人协会的每一个团体和个人都应当承认,没有无义务的权利,也没有无权利的义务。"},{f:"marx",w:"《临时中央委员会就若干问题给代表的指示》",y:1866,t:"未来教育对所有已满一定年龄的儿童来说,就是生产劳动同智育和体育相结合,它不仅是提高社会生产的一种方法,而且是造就全面发展的人的唯一方法。"},{f:"marx",w:"《法兰西内战》",y:1871,t:"公社是由巴黎各区通过普选选出的市政委员组成的,这些委员是负责任的,随时可以罢免。"},{f:"marx",w:"《法兰西内战》",y:1871,t:"公社不应当是议会式的,而应当是同时兼管行政和立法的工作机关。"},{f:"marx",w:"《法兰西内战》",y:1871,t:"工人阶级并没有期望公社做出奇迹,他们只是要获得自由发展他们劳动的机会。"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"在这里,平等的权利按照原则仍然是资产阶级权利,虽然这个原则同商品交换原则一样,形式上平等,内容上不平等。"},{f:"marx",w:"《哥达纲领批判》",y:1875,t:"要避免这种弊病,权利就不应当是平等的,而应当是不平等的。"},{f:"marx",w:"《给维·伊·查苏利奇的复信草稿》",y:1881,t:"俄国农村公社有可能不通过资本主义制度的卡夫丁峡谷,而占有资本主义制度所创造的一切积极的成果。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"个人受到他们自己的生产力的支配,受到他们自己的相互交往的力量的支配,而这种力量在他们看来不是他们自己的力量,而是异己的、盲目的力量。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"共产主义者根本不进行任何暴力革命,他们不会去密谋,也不会去夺取别人的果实。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"革命不能随心所欲地发生,它是现有的条件和前提的必然结果。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"社会完全按照每个人的需要来分配产品,因而也就完全排除了个人对产品的占有。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"由社会全体成员组成的共同联合体来共同地、有计划地利用生产力。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"生产过剩不再被认为是灾难,而是被认为是幸福。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"你们一天到晚高谈道德和秩序,可是你们却把工人置于道德和秩序不可能存在的境地。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"社会主义是工人阶级的状况和斗争的必然结果,而不是某个天才头脑的偶然发现。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"工人除了锁链以外一无所有,而他们要得到的却是整个世界。"},{f:"engels",w:"《反杜林论》",y:1878,t:"一个新的社会制度,必须有自己的经济基础,而不是靠暴力来创造。"},{f:"engels",w:"《反杜林论》",y:1878,t:"暴力在经济上没有任何独立的内容,它只是为经济利益服务的工具。"},{f:"engels",w:"《反杜林论》",y:1878,t:"道德始终是阶级的道德;它或者为统治阶级的统治和利益辩护,或者当被压迫阶级变得足够强大时,代表被压迫者对这个统治的反抗。"},{f:"engels",w:"《反杜林论》",y:1878,t:"一切人,作为人是平等的,而作为社会的成员,他们应当有同等的手段来发展自己的能力。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"自然界中的一切运动都归结为一种形式的运动转变为另一种形式的运动。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"没有物质运动的物质和没有物质的运动,都是不可想象的。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"机械运动是最简单的运动形式,它应当从它自身中去说明。"},{f:"engels",w:"《劳动在从猿到人转变过程中的作用》",y:1876,t:"手不仅是劳动的器官,它还是劳动的产物。"},{f:"engels",w:"《劳动在从猿到人转变过程中的作用》",y:1876,t:"动物的生存策略只是消极地利用自然,而人则通过自己的活动来积极地支配自然。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"国家一旦成了对社会进行独立代表的力量,它就不再是原来意义上的国家了。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"以爱情为基础的婚姻是合乎道德的;只有以爱情为基础的婚姻才是合乎道德的。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"社会历史的特点在于:进行活动的是有意识、有思考、追求自觉目的的人。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"在历史领域内同样起作用的是自然的、不自觉地、盲目地发挥作用的力量。"},{f:"engels",w:"《论住宅问题》",y:1872,t:"伟大的社会革命将把城市与乡村之间的对立消失掉,把人口尽量平均地分布在全国各地。"},{f:"engels",w:"《论住宅问题》",y:1872,t:"无产阶级一旦取得政权,就可以用剥夺房主的方式来解决住宅问题,而不必等待权威的介入。"},{f:"engels",w:"《论权威》",y:1874,t:"生产和流通的物质形式,随着大工业和大农业的发展,必定要改变权威和自治的应用范围。"},{f:"engels",w:"《共产主义者和社会主义者有何区别》",y:1847,t:"共产主义者不是满意现存社会制度的,而是要推翻它。"},{f:"engels",w:"《卡尔·马克思》",y:1869,t:"马克思的经济学说,揭示了资本主义生产方式及其相适应的交换方式的运动规律。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"我们应当同工人阶级一道,并且为了工人阶级,去争取一切公民权利、一切经济和社会的进步。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"谁如果把自觉的成分低估了,谁就是实际上放弃了社会主义的立场。"},{f:"lenin",w:"《进一步,退两步》",y:1904,t:"无产阶级的力量在于组织;没有组织,无产阶级就一无所有。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"没有农民的支持,无产阶级的革命事业就不可能取得胜利。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"马克思主义的精髓,马克思主义的活的灵魂:对具体情况作具体分析。"},{f:"lenin",w:"《唯物主义和经验批判主义》",y:1909,t:"生活、实践的观点,应该是认识论的首要的和基本的观点。"},{f:"lenin",w:"《唯物主义和经验批判主义》",y:1909,t:"我们的知识向客观的、绝对的真理接近的界限是受历史条件制约的,但是这个真理的存在是无条件的。"},{f:"lenin",w:"《唯物主义和经验批判主义》",y:1909,t:"任何真理都是具体的;没有抽象的真理。"},{f:"lenin",w:"《马克思主义的三个来源和三个组成部分》",y:1913,t:"马克思认为理论符合实际就是理论的唯一标准,所以他首先嘲笑那种妄想吃出超阶级科学的学者。"},{f:"lenin",w:"《卡尔·马克思》",y:1914,t:"马克思的学说有极强的生命力,因为它把严格的和高度的科学性同革命性结合起来。"},{f:"lenin",w:"《卡尔·马克思》",y:1914,t:"这一理论之所以万能,就是因为它正确。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"资本主义最典型的特点之一,就是工业蓬勃发展和对自然力的征服,同群众生活毫无出路、备受折磨的现象并存。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"如果殖民地和附属国的垄断被打破,那么世界财富的分配就会按照新的标准来进行。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"马克思认为,国家是阶级统治的机关,是一个阶级压迫另一个阶级的机关。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"只要阶级存在,自由就是不完整的;在无产阶级专政下,民主第一次成为供穷人享受的民主。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"共产主义的第一阶段即社会主义,已经把生产资料变为公共财产,但还没有消除按劳分配中所固有的资产阶级权利。"},{f:"lenin",w:"《无产阶级革命和叛徒考茨基》",y:1918,t:"没有自由,没有民主,社会主义是不可能的;但社会主义也不能不限制剥削者的自由。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"我们不但要推翻剥削者,我们还要组织新的建设;这是比推翻剥削者更困难、更伟大的任务。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"必须使全体劳动者都来参加国家的管理,使他们在实践中学习管理。"},{f:"lenin",w:"《伟大的创举》",y:1919,t:"共产主义劳动态度不是靠法令、不是靠强制推行的,而是群众自己创造出来的。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"要认识党,要善于对群众进行工作,而群众是不断变化的;这就是说,必须善于估计群众的情绪。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"不犯错误的革命者是没有的;聪明的人在于不犯重复性的错误,并且善于迅速纠正错误。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"旧社会留下的知识,只有同青年同工人劳动群众结合起来,才能成为建设新社会的力量。"},{f:"lenin",w:"《论战斗唯物主义的意义》",y:1922,t:"一个现代唯物主义者和一个现代无神论者,如果不研究辩证法,就会变成最坏的形而上学者。"},{f:"lenin",w:"《宁肯少些,但要好些》",y:1923,t:"我们的国家机构是承袭来的,只有在极有限的程度上才经过改造,它基本上还是旧时机构的遗物。"},{f:"lenin",w:"《论合作制》",y:1923,t:"文明的合作社工作者的制度就是社会主义的制度。"},{f:"lenin",w:"《论我国革命》",y:1923,t:"你们说,为了建立社会主义就需要文明;那末为什么不能首先在我国为这种文明创造前提呢?"},{f:"mao",w:"《关心群众生活,注意工作方法》",y:1934,t:"真正的铜墙铁壁是什么?是群众,是千百万真心实意地拥护革命的群众。"},{f:"mao",w:"《关心群众生活,注意工作方法》",y:1934,t:"贪污和浪费是极大的犯罪。"},{f:"mao",w:"《关心群众生活,注意工作方法》",y:1934,t:"革命战争是群众的战争,只有动员群众才能进行战争,只有依靠群众才能进行战争。"},{f:"mao",w:"《论反对日本帝国主义的策略》",y:1935,t:"我们中华民族有同自己的敌人血战到底的气概,有在自力更生的基础上光复旧物的决心,有自立于世界民族之林的能力。"},{f:"mao",w:"《中国革命战争的战略问题》",y:1936,t:"保存自己,消灭敌人——这是战争的一般目的。"},{f:"mao",w:"《中国革命战争的战略问题》",y:1936,t:"战争的规律,这是任何指导战争的人不能不研究和不能不解决的问题。"},{f:"mao",w:"《论新阶段》",y:1938,t:"中国必须独立,中国必须解放,中国的事情必须由中国人民自己作主张,自己来处理。"},{f:"mao",w:"《中国共产党在民族战争中的地位》",y:1938,t:"中国共产党是全中国人民中最无产阶级的、最进步的、最有组织性的部分。"},{f:"mao",w:"《〈共产党人〉发刊词》",y:1939,t:"统一战线,武装斗争,党的建设——正确地理解了这三个问题及其相互关系,就等于正确地领导了全部中国革命。"},{f:"mao",w:"《新民主主义论》",y:1940,t:"民族的形式,新民主主义的内容——这就是我们今天的新文化。"},{f:"mao",w:"《论政策》",y:1940,t:"人不犯我,我不犯人;人若犯我,我必犯人。"},{f:"mao",w:"《在陕甘宁边区参议会的演说》",y:1941,t:"国事是国家的公事,不是一党一派的私事。"},{f:"mao",w:"《机关领导法》",y:1943,t:"一般和个别相结合,领导和群众相结合。"},{f:"mao",w:"《必须学会做经济工作》",y:1945,t:"发展经济,保障供给。"},{f:"mao",w:"《愚公移山》",y:1945,t:"我们宣传大会的路线,就是要使全党和全国人民建立起一个信心,即革命一定要胜利。"},{f:"mao",w:"《论军队生产自给,兼论整风和生产两大运动的重要性》",y:1945,t:"我们的方针要放在什么基点上?放在自己力量的基点上。"},{f:"mao",w:"《关于重庆谈判》",y:1945,t:"我们的责任,是向人民负责;每句话,每个行动,每项政策,都要适合人民的利益。"},{f:"mao",w:"《目前形势和我们的任务》",y:1947,t:"没有一个人民的军队,便没有人民的一切。"},{f:"mao",w:"《论人民民主专政》",y:1949,t:"严重的问题是教育农民;没有农业社会化,就没有全部的巩固的社会主义。"},{f:"mao",w:"《不要四面出击》",y:1950,t:"我们不要四面出击;四面出击,全国紧张,很不好。"},{f:"mao",w:"《工作方法六十条(草案)》",y:1958,t:"党委要抓两件事:一是思想政治,一是生产关系和生产力。"},{f:"mao",w:"《在成都会议上的讲话》",y:1958,t:"道路是曲折的,前途是光明的。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"改良主义的道路,恰恰是通向旧制度的道路;只有革命,才能开辟通向新社会的道路。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"资本主义制度不能靠改良来克服它的弊病,正如它不能靠慈善来消除贫困一样。"},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:"罢工不是领袖制造出来的,它是历史进程中的必然环节,它以自然的必然性从社会关系的总和中产生出来。"},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:"革命不是被制造出来的,也不是被决定的;它是在历史的进程中以自然的必然性到来的。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"积极纠正自己的错误的党,对无产阶级来说,比绝不犯错误的党更有价值。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"公共生活一旦失去广泛的、不受约束的、富有活力的民主,便要窒息而死。"},{f:"luxemburg",w:"《资本积累论》",y:1913,t:"资本如果不能不断地吞噬非资本主义的世界,它便不能存在。"},{f:"luxemburg",w:"《资本积累论》",y:1913,t:"帝国主义是资本在世界上争夺尚未被吞噬的劳动领域和自然环境的竞赛。"},{f:"luxemburg",w:"《论纲领问题》",y:1895,t:"党不能把群众当作工具,而应当是群众自己的自觉意志的组织。"},{f:"luxemburg",w:"《论柏林纲领草案》",y:1895,t:"无产阶级如果不在斗争中自己教育自己,便不能完成自己的历史使命。"},{f:"luxemburg",w:"狱中致友人的信",y:1918,t:"无论如何,生活终究是美好的,它包含着那么多幸福和完美。"},{f:"luxemburg",w:"狱中致友人的信",y:1917,t:"我既不是悲观者,也不是乐观者;我只是一个意志坚定的人,永远准备为理想工作。"},{f:"gramsci",w:"《狱中札记》",y:1929,t:"怀疑一切,理解一切,评估一切,参与一切,忍受一切。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:'知识分子的特殊标志,不在于他们是否"纯粹",而在于他们在社会关系中是否起着组织者和领导者的作用。'},{f:"gramsci",w:"《狱中札记》",y:1932,t:"每一次历史危机,都要求有新的、特有的、独创的解决办法。"},{f:"gramsci",w:"《狱中札记》",y:1934,t:"机械的决定论绝不可能真正被克服,除非人们说服了群众,使他们自觉地参与到历史中去。"},{f:"gramsci",w:"《狱中札记》",y:1930,t:"一个没有热情的人,不可能在科学和艺术中做出伟大的东西。"},{f:"gramsci",w:"《狱中书简》",y:1927,t:"我整个人都在工作,连我的感情和我的脾气也都是工作的一部分。"},{f:"gramsci",w:"《狱中书简》",y:1926,t:"我并不灰心;我从来不曾灰心,我将来也不会灰心。"},{f:"gramsci",w:"《狱中札记》",y:1933,t:'在市民社会中,统治阶级是靠"同意"而不是单靠强制来维持自己的领导的。'},{f:"dengxiaoping",w:"《目前的形势和任务》",y:1980,t:"没有安定团结的政治局面,不可能搞建设,更不可能实行改革开放政策。"},{f:"dengxiaoping",w:"《贯彻调整方针,保证安定团结》",y:1980,t:"我们要建设的社会主义国家,不但要有高度的物质文明,而且要有高度的精神文明。"},{f:"dengxiaoping",w:"《党在组织战线和思想战线上的迫切任务》",y:1983,t:"思想战线不能搞精神污染;精神污染的实质是散布形形色色的资产阶级和其他剥削阶级腐朽没落的思想。"},{f:"dengxiaoping",w:"《改革是中国的第二次革命》",y:1985,t:"我们现在的改革是全面的改革,包括经济体制改革、政治体制改革和相应的其他各个领域的改革。"},{f:"dengxiaoping",w:"《中国是维护世界和平的力量》",y:1984,t:"中国永远不会称霸,永远不会欺负别人,永远站在第三世界一边。"},{f:"dengxiaoping",w:"《社会主义必须摆脱贫穷》",y:1987,t:"社会主义阶段的最根本任务就是发展生产力;贫穷不是社会主义。"},{f:"dengxiaoping",w:"《在武昌、深圳、珠海、上海等地的谈话要点》",y:1992,t:"中国只要不搞两极分化,坚持公有制占主体,坚持共同富裕,就不会走向资本主义。"},{f:"dengxiaoping",w:"《邓小平文选》第二卷",y:1977,t:"一定要在党内造成一种空气:尊重知识,尊重人才,不尊重人才,不尊重知识,事业就不能成功。"},{f:"lidazhao",w:"《青春》",y:1916,t:"吾愿吾亲爱之青年,生于青春死于青春,生于少年死于少年也。"},{f:"lidazhao",w:"《青春》",y:1916,t:'青年之字典,无"困难"之字;青年之口头,无"障碍"之语;纯凭自觉,冲决历史之桎梏。'},{f:"lidazhao",w:"《晨钟之使命》",y:1916,t:"青年之觉悟,实为民族之觉悟;青年之再生,实为国家之再生。"},{f:"lidazhao",w:"《自然的伦理观与孔子》",y:1916,t:"道德者,生活之本领也;与时俱进,则与俱新。"},{f:"lidazhao",w:"《庶民的胜利》",y:1918,t:"人道的警钟响了,自由的曙光现了!"},{f:"lidazhao",w:"《我的马克思主义观》",y:1919,t:"马克斯的唯物史观,把从前种种的历史,都说明为阶级斗争的历史。"},{f:"lidazhao",w:"《狱中自述》",y:1927,t:"在野的军阀政府对于本党的一切压迫,只能增加本党同志的奋斗精神,绝不能消灭本党的主义。"},{f:"fangzhimin",w:"《可爱的中国》",y:1935,t:"朋友,我相信,到那时,中国一定是一个有意思的国家,一个亲爱美丽的国家。"},{f:"fangzhimin",w:"《可爱的中国》",y:1935,t:"假如我能生存下来,我愿把我的全部生命,献给这伟大的革命事业。"},{f:"fangzhimin",w:"《清贫》",y:1935,t:"我毫不希罕那华丽的大厦,却宁愿居住在卑陋潮湿的茅棚;不希罕美味的西餐大菜,宁愿吞嚼刺口的苞粟和菜根。"},{f:"fangzhimin",w:"《死!——共产主义的殉道者的记述》",y:1935,t:"我们是共产党员,为着革命,为着阶级和民族的解放,为着党的事业的成功,一切都在所不惜。"},{f:"fangzhimin",w:"《我从事革命斗争的略述》",y:1935,t:"我对于事业的妄想和忧虑,本是很少的;我只知道照着一定的方向走下去。"},{f:"xiaminghan",w:"就义前的遗言",y:1928,t:"共产党人从来就是不怕死的,怕死就不做共产党人。"},{f:"xiaminghan",w:"《夏明翰诗集》",y:1925,t:"壮士头颅为党落,好汉身躯为群裂。"},{f:"zetkin",w:"《在哥本哈根第二次国际妇女代表会议上的发言》",y:1910,t:"妇女的选举权不是同男子争夺什么,而是为了劳动者共同的解放。"},{f:"zetkin",w:"《保护妇女劳动的决议》",y:1907,t:"怀孕与生育不是私人的事情,而是社会的事情;保护母亲,就是保护未来。"},{f:"zetkin",w:"《致各国社会主义妇女书》",y:1915,t:"无产阶级妇女不应把希望寄托在统治阶级的仁慈上,而应寄托在自己的组织与斗争上。"},{f:"zetkin",w:"《国际妇女节的号召》",y:1911,t:"让妇女节成为劳动妇女要求选举权与面包的斗争日。"},{f:"zetkin",w:"《纪念三月十八日》",y:1921,t:"没有无产阶级的国际团结,就没有妇女的真正解放。"},{f:"plekhanov",w:"《论一元论历史观之发展》",y:1897,t:"社会心理,归根到底是由社会的经济关系决定的。"},{f:"plekhanov",w:"《论艺术(没有地址的信)》",y:1900,t:"原始人跳舞,不是为了审美,而是为了劳动;艺术起源于劳动。"},{f:"plekhanov",w:"《论艺术(没有地址的信)》",y:1900,t:"在美的事物中,我们欣赏的是人本身的生活。"},{f:"plekhanov",w:"《个人在历史上的作用》",y:1898,t:"必然性为自己开辟道路,而偶然性则是必然性的补充和表现形式。"},{f:"plekhanov",w:"《社会主义与政治斗争》",y:1883,t:"俄国革命,只有在俄国成为工人阶级革命的舞台时,才能取得胜利。"},{f:"stalin",w:"《论列宁主义基础》",y:1924,t:"列宁主义是无产阶级革命的理论策略,首先是无产阶级专政的理论策略。"},{f:"stalin",w:"《在党的第十七次代表大会上关于中央委员会工作总结的报告》",y:1934,t:"干部既然成为决定全局的东西,就必须特别注意到挑选干部的工作。"},{f:"stalin",w:"《苏联社会主义经济问题》",y:1952,t:"政治经济学是研究人们生产关系发展的规律的科学。"},{f:"stalin",w:"《论经济工作人员的任务》",y:1931,t:"在改造时期,技术决定一切;布尔什维克应当掌握技术,否则就不能前进。"},{f:"stalin",w:"《在克里姆林宫招待红军学院学员毕业典礼时的演说》",y:1935,t:"干部是最宝贵最有决定的资本。"},{f:"dimitrov",w:"《在莱比锡法庭上的自我辩护》",y:1934,t:"我受审,不是作为一个个人,而是作为一个为共产主义事业而斗争的战士。"},{f:"dimitrov",w:"《在共产国际第七次代表大会上的报告》",y:1935,t:"统一战线,就是使工人阶级的团结成为反对法西斯主义斗争的基础。"},{f:"dimitrov",w:"《在共产国际第七次代表大会上的报告》",y:1935,t:"在反对法西斯主义的斗争中,共产党人应当同社会民主党人、同一切劳动者、同一切民主分子联合起来。"},{f:"dimitrov",w:"《论工人阶级的统一》",y:1936,t:"工人阶级分裂,法西斯主义便得势;工人阶级团结,法西斯主义便失败。"},{f:"hochiminh",w:"《抗法号召书》",y:1946,t:"我们宁可牺牲一切,决不肯做亡国奴。"},{f:"hochiminh",w:"《革命道德》",y:1958,t:"革命道德的第一条,是勤俭廉洁,公而忘私。"},{f:"hochiminh",w:"《改造我们的工作作风》",y:1947,t:"工作要依靠群众;离开群众,我们便一事无成。"},{f:"hochiminh",w:"《论青年》",y:1951,t:"青年要不怕困难,不怕失败,要从失败中学习。"},{f:"castro",w:"《历史将宣判我无罪》",y:1953,t:"我控诉的,不是一个人,而是一种制度;我要求改变的,不是几个人,而是整个社会的公正。"},{f:"castro",w:"《对知识分子的讲话》",y:1961,t:"在革命之内,一切;反对革命,没有革命。"},{f:"castro",w:"《在古巴全国教育工作者大会上的讲话》",y:1961,t:"我们进行的不只是一场政治革命,我们进行的是一场反对无知的革命。"},{f:"moore",w:"《乌托邦》",y:1516,t:"任何地方私有制不取消,产品就不可能公平地分配,人类就不可能获得幸福。"},{f:"moore",w:"《乌托邦》",y:1516,t:"你们的共和国,不过是富人为了自己的利益而假借国家之名所策划的阴谋。"},{f:"moore",w:"《乌托邦》",y:1516,t:"乌托邦的公民,每天劳动六小时,其余的时间用于科学和艺术。"},{f:"moore",w:"《乌托邦》",y:1516,t:"黄金之所以被轻视,是因为人们把它看得不如泥土;乌托邦人把夜壶便器都做成金银的。"},{f:"campanella",w:"《太阳城》",y:1602,t:"太阳城的居民,认为一切财富应当归公,而不是归私。"},{f:"campanella",w:"《太阳城》",y:1602,t:"在太阳城,没有人是富的,也没有人是穷的;因为大家共有,而又各取所需。"},{f:"campanella",w:"《太阳城》",y:1602,t:"他们把科学分成九门,从文法到神学,人人都按自己的能力去学习。"},{f:"campanella",w:"《太阳城》",y:1602,t:"谁要是游手好闲,谁就不能在太阳城生活。"},{f:"campanella",w:"《论西班牙的兴衰》",y:1609,t:"一个国家的强盛,不在于它的财富,而在于它的风俗与法律。"},{f:"saintsimon",w:"《实业家问答》",y:1823,t:"实业家是给社会直接生产产品的人;他们应当成为社会的第一阶级。"},{f:"saintsimon",w:"《论实业制度》",y:1817,t:"社会的最大改善,在于使人数最多和最贫困的阶级过着最安适的生活。"},{f:"saintsimon",w:"《新基督教》",y:1825,t:"人应当彼此相爱,应当像兄弟一样地劳动,应当协力把人间变成天堂。"},{f:"saintsimon",w:"《新基督教》",y:1825,t:"宗教的实质不在于信仰什么,而在于感情;新基督教应当以最普遍的利益为唯一的宗教。"},{f:"saintsimon",w:"《工业体系》",y:1821,t:"在未来的社会里,对人的管理,将变为对物的管理;政治,将成为生产的科学。"},{f:"owen",w:"《新社会观》",y:1813,t:"人类过去所犯的种种错误,并不是由于人的本性败坏,而是由于他所处的环境恶劣。"},{f:"owen",w:"《新社会观》",y:1813,t:"要改善人的品格,必先改善人所处的环境;人是环境的产物。"},{f:"owen",w:"《致不列颠人书》",y:1817,t:"现有制度的不合理,已经由千千万万劳动者的贫困与无知证明出来了。"},{f:"owen",w:"《新道德世界的宣言》",y:1838,t:"在合作与联合的新制度下,产品将归劳动者所有,而不再被少数人占有。"},{f:"owen",w:"《人类思想和实践中的革命》",y:1849,t:"在联合劳动、联合占有、联合消费的新制度中,每个人都将得到他应有的一份。"},{f:"fourier",w:"《新的工业世界》",y:1829,t:"在文明制度下,贫困竟是从富裕本身产生出来的。"},{f:"fourier",w:"《新的工业世界》",y:1829,t:"在文明制度下,利益同安全、同正义处于不断的矛盾之中。"},{f:"fourier",w:"《论家务农业协作》",y:1822,t:"在和谐制度下,劳动将同人的爱好一致起来,因而人人都愿意劳动。"},{f:"fourier",w:"《四种运动论》",y:1808,t:"社会的命运,要经过七个阶段,正如我们的寿命要经过七个时期一样。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"不论财富的社会形式如何,使用价值总是构成财富的物质内容。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"价值是凝结的无差别的人类劳动;每个商品的价值,是由生产它所需要的社会必要劳动时间决定的。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"社会必要劳动时间,是在现有的社会正常的生产条件下,在社会平均的劳动熟练程度和劳动强度下,制造某种使用价值所需要的劳动时间。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"劳动生产力是由多种情况决定的:工人的平均熟练程度,科学的发展水平和它在工艺上应用的程度,生产过程的社会结合,生产资料的规模和效能,以及自然条件。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"商品世界的拜物教性质,来源于生产商品的劳动所特有的社会性质。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"在商品世界里,人类劳动的一切自身运动,都取得了物的形式,即采取了一个离开生产者而独立存在的对象的形式。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"货币持有者发现,在商品市场上有一种特殊的商品,它的使用价值本身具有成为价值源泉的独特属性,这就是劳动力。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"工人出卖的不是劳动,而是劳动力;劳动不过是劳动力使用的结果。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本不能从流通中产生,又不能不从流通中产生;它必须既在流通中又不在流通中产生。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"货币的流通形式 W—G—W 是为买而卖;资本流通形式 G—W—G 是为卖而买,而它的目的是价值的增殖。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本是自我增殖的价值;它一旦停止运动,就停止生存。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"劳动过程的一切正常条件,在资本那里都表现为被牺牲掉的东西。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"不变资本与可变资本的区分,是理解资本主义生产过程的第一条线索。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"剩余价值率是劳动受资本剥削程度的准确表现。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本由于无限度地追逐剩余价值,好像狼一样贪婪地吞噬着活劳动。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"协作在历史上和逻辑上,是资本主义生产过程的起点。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"结合工作日的特殊生产力,表现为资本的生产力;协作本身不费资本家分文。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"工场手工业内部的分工,和社会内部的分工,是两种完全不同性质的分工。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"在工场手工业中,局部工人作为总体工人的一个肢体,他的片面性甚至缺陷,反而成了他的完善。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"机器大工业使科学作为独立的力量被卷入劳动过程,使自然力为资本服务。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"机器本身是减轻劳动的,可是机器的资本主义应用,却使劳动延长到极限,使劳动强度提高到极限。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"机器成了资本对付工人暴乱的武器,是使劳动从属于资本的最完备的物质生产形式。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"工厂内部实行的是专制主义;资本在自己的工厂里,就是绝对的立法者、法官和行政官。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本没有人性,它只有资本的本性;这个本性就是追逐剩余价值。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"相对过剩人口是劳动产业所创造的,并且是以这种形式创造,使它是资本增殖的条件。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"一极是财富的积累,另一极,即在把自己的产品作为资本来生产的阶级方面,是贫困、劳动折磨、受奴役、无知、粗野和道德堕落的积累。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"竞争使资本主义生产方式的内在规律,作为外在的强制规律支配着每一个资本家。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"资本主义的私有制,是对个人的、以自己劳动为基础的私有制的第一个否定;但资本主义生产由于自然过程的必然性,造成了对自身的否定。这是否定的否定。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"这种否定不是重新建立私有制,而是在协作和对土地及靠劳动本身生产的生产资料的共同占有的基础上,重新建立个人所有制。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"所谓原始积累,不过是生产者和生产资料分离的历史过程。"},{f:"marx",w:"《资本论》第二卷",y:1885,t:"资本循环是生产过程和流通过程的统一。"},{f:"marx",w:"《资本论》第二卷",y:1885,t:"流通时间是价值创造的中断,因此它是资本价值增殖的界限。"},{f:"marx",w:"《资本论》第二卷",y:1885,t:"资本在流通领域内停留的时间越长,它在生产领域内执行职能的时间就越短,生产的剩余价值也就越少。"},{f:"marx",w:"《资本论》第二卷",y:1885,t:"货币资本的循环,是产业资本循环最典型、最引人注目的形式。"},{f:"marx",w:"《资本论》第二卷",y:1885,t:"社会总资本的再生产和流通,要求生产资料生产和消费资料生产两大部类之间保持一定的比例。"},{f:"marx",w:"《资本论》第二卷",y:1885,t:"资本的周转速度,决定着一年内所生产的剩余价值的量。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"利润率趋向平均化,是通过不同生产部门之间的竞争、通过资本在各部门之间的转移来实现的。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"商业资本不过是产业资本的一个部分在流通领域中的转化形式。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"生息资本的形式 G—G′,是资本关系最拜物教的形式。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"利息表现为资本所有权的单纯结果,好像它本身就会生出利息来,而不涉及任何现实的生产过程。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"地租是剩余价值的一部分,是土地所有权在经济上实现自己的形式。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"资本主义农业的任何进步,不仅是掠夺劳动者技巧的进步,而且是掠夺土地肥力的进步。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"信用制度是资本主义生产方式在资本主义生产方式本身范围内的扬弃。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"股份公司是在资本主义体系本身的基础上,对资本主义私人产业的扬弃。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"在这个必然王国的彼岸,作为目的本身的人类能力的发挥,真正的自由王国,就开始了。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"自由王国只是在由必需和外在目的规定要做的劳动终止的地方才开始;因而按照事物的本性来说,它存在于真正物质生产领域的彼岸。"},{f:"marx",w:"《剩余价值理论》",y:1863,t:"一定的社会生产关系,是生产过程本身的历史地发展着的、因而也是过渡的形式。"},{f:"marx",w:"《剩余价值理论》",y:1863,t:"把价值当作劳动的产物,把剩余价值当作无酬劳动的产物,这就揭穿了资本主义生产的神秘性。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"一个社会即使探索到了本身运动的自然规律,它还是既不能跳过也不能用法令取消自然的发展阶段;它能做的只是缩短和减轻分娩的痛苦。"},{f:"engels",w:"《自然辩证法》导言",y:1886,t:"自然界是检验辩证法的试金石。"},{f:"engels",w:"《资本论》第一卷书评",y:1867,t:"这是一部论证了工人阶级和资产阶级之间关系的最重要的著作,它将对工人阶级运动发生巨大的影响。"},{f:"engels",w:"《卡尔·马克思〈政治经济学批判〉》",y:1859,t:"一种新的科学的世界观,第一次在这里得到系统的阐述。"},{f:"engels",w:"《德国农民战争》序言",y:1870,t:"德国革命将是一次农民战争,否则它就是一场毫无意思的悲剧。"},{f:"engels",w:"《法兰西阶级斗争》导言",y:1895,t:"历史表明,我们以及所有和我们有同样想法的人,都是不对的;历史清楚地显示,当时欧洲大陆经济发展的状况,还远没有成熟到可以铲除资本主义生产的程度。"},{f:"engels",w:"《法兰西阶级斗争》导言",y:1895,t:"旧式的突然袭击革命的时代,已经永远过去了。"},{f:"engels",w:"《反杜林论》第三版序言",y:1885,t:"这一著作绝不是要宣布一些教条,而是要提供一个系统的、多方面论述的观点。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"共产主义不是学说,而是运动;它不是从原则出发,而是从事实出发。"},{f:"engels",w:"《论住宅问题》",y:1872,t:"任何社会的分配方式,都直接由生产方式决定。"},{f:"engels",w:"《家庭、私有制和国家的起源》第一版序言",y:1884,t:"历史中的决定性因素,归根结底是直接生活的生产和再生产;生产本身又有两种,一方面是生活资料,另一方面是人本身的生产。"},{f:"muntzer",w:"《布拉格宣言》",y:1523,t:"现存的一切制度都是建立在欺骗之上的;只有当一切财产成为公共的,一切人才是平等的。"},{f:"muntzer",w:"《布拉格宣言》",y:1523,t:"如果选举出来的政府行事不公正,人民就有权立刻把它废黜。"},{f:"muntzer",w:"布道词",y:1524,t:"一切人应当在财产、权力和地位上一律平等。"},{f:"muntzer",w:"恩格斯《德国农民战争》所述其纲领",y:1524,t:"天国不是在彼岸,而是在此岸;它要在人间、在活人的社会里被建立起来。"},{f:"muntzer",w:"致阿尔施塔特书",y:1524,t:"穷人的苦难不是上帝的旨意,而是掌权者的不义。"},{f:"weitling",w:"《和谐与自由的保证》",y:1847,t:"旧的制度不是被废除的,而是被抛弃的,像蛇褪下的皮一样。"},{f:"weitling",w:"《和谐与自由的保证》",y:1847,t:"人类不是被命令引向自由的;自由必须由每个人自己去争取、去组织。"},{f:"weitling",w:"《贫困论》",y:1842,t:"贫困不是偶然的灾祸,而是现有制度的必然产物。"},{f:"weitling",w:"《和谐与自由的保证》",y:1847,t:"在和谐的社会里,货币不再统治人,而只是交换的记号。"},{f:"weitling",w:"《和谐与自由的保证》",y:1847,t:"一切人都应当有自己的位置、自己的工作,也有自己的享受。"},{f:"chernyshevsky",w:"《怎么办?》",y:1863,t:"美是生活;任何事物,凡是自身依照我们的概念应当如此生活的,那就是美的。"},{f:"chernyshevsky",w:"《艺术对现实的审美关系》",y:1855,t:"一切合理的、真实的东西,同时也就是伟大的和美的。"},{f:"chernyshevsky",w:"《怎么办?》",y:1863,t:"谁也不能替别人获得幸福;人在为自己工作的同时,才是在为共同的事业工作。"},{f:"chernyshevsky",w:"《怎么办?》",y:1863,t:"未来的劳动将不再是苦役,而会成为创造的快乐和自由的游戏。"},{f:"chernyshevsky",w:"狱中书信",y:1864,t:"生活就是这样:有时是悲剧,有时是喜剧,而大多数时候,两者都同样枯燥。"},{f:"chernyshevsky",w:"《哲学中的人本主义原则》",y:1860,t:"人的意识不是独立的实体,而是活的有机体的机能。"},{f:"bebel",w:"《妇女与社会主义》",y:1879,t:"在一切社会里,妇女的地位都是衡量一般文化发展程度的天然尺度。"},{f:"bebel",w:"《妇女与社会主义》",y:1879,t:"被压迫阶级的解放,总是以妇女的解放为条件、为标志、为自然的结果。"},{f:"bebel",w:"《妇女与社会主义》",y:1879,t:"两性间的一切特权,将和阶级特权一起,在未来的社会中消失。"},{f:"bebel",w:"在德意志国会的演说",y:1891,t:"社会民主党的力量,在于它的组织、它的理想和它的纪律。"},{f:"bebel",w:"《妇女与社会主义》",y:1879,t:"妇女的解放不能靠赐予,只能靠妇女自己争取。"},{f:"bebel",w:"《国会主义与军国主义》",y:1911,t:"无产阶级不是为帝王的虚荣去送死,而是要把战争交还给决定它的人民。"},{f:"lafargue",w:"《懒惰的权利》",y:1883,t:"懒惰吧,你们千百万受劳动之苦的人,懒惰吧,至少每天要有八个小时不劳动!"},{f:"lafargue",w:"《懒惰的权利》",y:1883,t:"工人阶级竟然也崇拜劳动这个女神,这真是无产阶级理论家多么可耻的失策!"},{f:"lafargue",w:"《懒惰的权利》",y:1883,t:"劳动的法律,是奴隶制的法律;它使工人像机器一样,把自己的血肉交给资本。"},{f:"lafargue",w:"《懒惰的权利》",y:1883,t:"只有懒惰才能把人从机械化劳动的奴隶状态中解放出来。"},{f:"lafargue",w:"《思想的起源》",y:1890,t:"人的理性不是先天的,它是经验的产物,是世代积累下来的遗产。"},{f:"lafargue",w:"《忆马克思》",y:1890,t:"他把书当作自己的奴隶,让它们为他服务,而不是他去为它们服务。"},{f:"lafargue",w:"《忆马克思》",y:1890,t:"在马克思书房里,堆满了书,而他从不容许别人把它们弄乱。"},{f:"morris",w:"《乌有乡消息》",y:1890,t:"在那儿,人劳动不是为了工钱,而是为了创造本身的喜悦。"},{f:"morris",w:"《乌有乡消息》",y:1890,t:"工作的快乐来自工作本身;现代劳动的全部痛苦,恰恰来自它没有这份快乐。"},{f:"morris",w:"演说《生活的艺术与人民的艺术》",y:1879,t:"如果艺术是少数人的特权,那它就不值得存在。"},{f:"morris",w:"演说",y:1885,t:"切勿期待完美的结果。"},{f:"morris",w:"《我为什么成为社会主义者》",y:1894,t:"我不能相信,幸福可以建立在多数人的痛苦之上;所以我成了社会主义者。"},{f:"morris",w:"《乌有乡消息》",y:1890,t:"不要把你认为不配拥有的东西留给后代;要像我们从祖先那里接过的那样,把它交给后代。"},{f:"guevara",w:"《摩托日记》",y:1952,t:"南美大陆只有一个,它不分上下,它是一个整体。"},{f:"guevara",w:"《摩托日记》",y:1952,t:"写下这些文字的双脚,曾经走过这片大陆的每一个地方。"},{f:"guevara",w:"在阿尔及利亚的演说",y:1965,t:"真正的革命者,是靠爱情来引导的;一个真正的革命者,永远不会停止为人民流泪。"},{f:"guevara",w:"《游击战》",y:1960,t:"游击队员,必须是武装起来的群众组织中最纯粹的产品。"},{f:"guevara",w:"《游击战》",y:1960,t:"革命不是等待条件成熟,而是创造条件使它成熟。"},{f:"guevara",w:"告别信",y:1965,t:"我随时准备献出我的生命,即使是在最遥远的土地上。"},{f:"guevara",w:"就义前的话",y:1967,t:"告诉古巴人民,我胜利了。"},{f:"mariategui",w:"《关于秘鲁国情的七篇论文》",y:1928,t:"我们绝不模仿,即使模仿最先进的模式也不干;我们要用秘鲁自己的现实,创造我们自己的文明。"},{f:"mariategui",w:"《关于秘鲁国情的七篇论文》",y:1928,t:"在拉丁美洲,包括秘鲁在内,没有任何东西是可以原样照搬的。"},{f:"mariategui",w:"《关于秘鲁国情的七篇论文》",y:1928,t:"社会主义在这里不是移植来的植物,它必须长在这片土地自己的根上。"},{f:"mariategui",w:"《为革命而行动的青年》",y:1929,t:"信仰是行动的动力;没有信仰,既没有殉道者,也没有英雄。"},{f:"mariategui",w:"《时代与革命》",y:1928,t:"我们的时代是一个英雄辈出的时代,而英雄,是那些敢于行动的人。"},{f:"quqiubai",w:"《多余的话》",y:1935,t:"中国的豆腐也是很好吃的东西,世界第一。"},{f:"quqiubai",w:"《多余的话》",y:1935,t:"我不过是一介书生,偶然被时代的浪潮卷到了这个地方。"},{f:"quqiubai",w:"《多余的话》",y:1935,t:"从我那里去找出一个政治家来,那是找不到的;我始终是文艺队伍里的人。"},{f:"quqiubai",w:"《饿乡纪程》",y:1923,t:"我要求于生活的不是别的,只是光明;我愿为大家辟一条光明的路。"},{f:"quqiubai",w:"《赤都心史》",y:1924,t:"革命者不是没有感情的人,而是把感情交给了多数人的人。"},{f:"quqiubai",w:"译作《国际歌》",y:1923,t:"起来,饥寒交迫的奴隶!起来,全世界受苦的人!"},{f:"quqiubai",w:"就义时的话",y:1935,t:"此地甚好。"},{f:"caihesen",w:"致毛泽东的信",y:1920,t:"明目张胆正式成立一个中国共产党。"},{f:"caihesen",w:"致毛泽东的信",y:1920,t:"先要组织共产党,因为它是革命运动的发动者、宣传者、先锋队、作战部。"},{f:"caihesen",w:"致毛泽东的信",y:1920,t:"一个真正的马克思主义政党,必须有铁的纪律,必须有明确的主义。"},{f:"caihesen",w:"《社会进化史》",y:1924,t:"家庭、婚姻和财产的形态,都是随着经济关系的变化而变化的。"},{f:"caihesen",w:"《中国共产党二年》",y:1926,t:"党的历史,就是路线斗争的历史;忘记这一点,就是忘记怎样做一个共产党员。"},{f:"dengzhongxia",w:"就义前的话",y:1933,t:"就是烧成灰,我邓中夏也是共产党人!"},{f:"dengzhongxia",w:"在长辛店的演说",y:1921,t:'"工"字和"人"字合起来就是"天";工人阶级,要做自己的天。'},{f:"dengzhongxia",w:"《中国职工运动简史》",y:1930,t:"中国工人阶级,是中国革命最觉悟、最坚决、最有力量的部分。"},{f:"dengzhongxia",w:"《论青年的修养》",y:1924,t:"力量集中,目的明确,信心坚定——这三条是一个革命青年所必需的。"},{f:"dengzhongxia",w:'《论"劳动运动"》',y:1923,t:"工人的解放,只能靠工人自己的团结与斗争。"},{f:"zhaoyiman",w:"给儿子宁儿的遗书",y:1936,t:"母亲不用千言万语来教育你,就用实行来教育你。"},{f:"zhaoyiman",w:"给儿子宁儿的遗书",y:1936,t:"在你长大成人之后,希望不要忘记,你的母亲是为国而牺牲的!"},{f:"zhaoyiman",w:"《滨江述怀》",y:1935,t:"未惜头颅新故国,甘将热血沃中华。"},{f:"zhaoyiman",w:"《滨江述怀》",y:1935,t:"誓志为国不为家,涉江渡海走天涯。"},{f:"zhaoyiman",w:"在狱中的供词",y:1936,t:"我的目的、我的主义、我的信念,就是反满抗日。"},{f:"yundaiying",w:"《狱中诗》",y:1930,t:"浪迹江湖忆旧游,故人生死各千秋;已摈忧患寻常事,留得豪情作楚囚。"},{f:"yundaiying",w:"《怎样做一个社会主义者》",y:1921,t:"社会主义者不是空谈家,而是实行家。"},{f:"yundaiying",w:"《中国青年》发刊词",y:1923,t:"中国青年底责任,是救中国;而要救中国,先要认识中国。"},{f:"yundaiying",w:"《怎样做一个社会主义者》",y:1921,t:"我们不是没有热血,我们是要为真理而流血。"},{f:"yundaiying",w:"《狱中诗》",y:1930,t:"为了革命而死,虽死犹生。"},{f:"asiqi",w:"《大众哲学》",y:1936,t:"哲学并不神秘;哲学的问题,就是我们生活里的问题。"},{f:"asiqi",w:"《大众哲学》",y:1936,t:"世界观是实践的武器,而不是书斋里的玩具。"},{f:"asiqi",w:"《大众哲学》",y:1936,t:"思想从实践发生,又反转来指导实践;这是认识的全部路程。"},{f:"asiqi",w:"《大众哲学》",y:1936,t:"唯心论不是胡说,它有自己的社会根源和认识根源。"},{f:"asiqi",w:"《哲学与生活》",y:1937,t:"要做一个革命者,先要做一个明白人。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"取得政权与实行社会主义改造,对社会民主党来说不是两个分隔的时期,而是同一个不可分割的过程。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"改良的斗争是为改善工人生活而进行的日常斗争,但它本身并不能通向社会主义。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"工人阶级如果不在日常斗争中锻炼自己,就决不能完成伟大的战斗。"},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:'群众罢工不是领袖所能随意"决定"出来的手段,它是历史的产物,在特定的时刻以既成的事实出现。'},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:"在群众罢工中,工人阶级是在学习自己应当怎样行动;这是他们自己的学校。"},{f:"luxemburg",w:"《群众罢工、党和工会》",y:1906,t:"罢工的政治形式和经济形式,在现实中是互相穿插、互相依存的,把它们割裂开来的只是书本。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"革命最大的危险,恰恰是它的胜利;胜利会使它忘记自己是怎么来的。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"把苏维埃的选举排除在自由的竞争之外,那末独裁就代替了无产阶级的专政。"},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:'世界上再没有比"多数"这个字眼更容易被滥用的了。'},{f:"luxemburg",w:"《论俄国革命》",y:1918,t:"一个党如果害怕群众的自觉运动,害怕群众自己所犯的错误,它就不再是革命的党。"},{f:"luxemburg",w:"《社会民主党的危机》(尤尼乌斯小册子)",y:1916,t:"帝国主义是资本在世界上争夺尚未被吞噬的劳动环境与自然环境的竞争,军国主义是它的世界政策的手段。"},{f:"luxemburg",w:"《社会民主党的危机》(尤尼乌斯小册子)",y:1916,t:"资本主义世界政策,是用炮舰、放火、屠杀和破产,来开辟它所要吞噬的土地。"},{f:"luxemburg",w:"《资本积累论》",y:1913,t:"资本积累是一个历史过程,它以吞噬非资本主义的生产方式和社会层次为生。"},{f:"luxemburg",w:"《资本积累论》",y:1913,t:"剩余价值不能从资本家与工人之间的交换中实现,它必须找到第三种购买者。"},{f:"luxemburg",w:"《论芬兰的独立》",y:1918,t:"民族自决权与民主,一旦同社会主义分离,就会变成空洞的口号。"},{f:"luxemburg",w:"《论纲领问题》",y:1895,t:"党不是群众之上的领袖,而是群众自觉意志的组织。"},{f:"luxemburg",w:"狱中致友人的信",y:1917,t:"不要为我担心;我浑身是意志、信心和不可摧毁的快意。"},{f:"luxemburg",w:"狱中致友人的信",y:1917,t:"我是在世界历史的春天里醒来的;即使被关在牢里,我仍然感到自己是自由的。"},{f:"luxemburg",w:"《斯巴达克斯》报社论",y:1919,t:'革命将创造奇迹;它靠的不是领袖的"天才",而是活着的群众。'},{f:"luxemburg",w:"在耶拿党代表大会上的发言",y:1911,t:"我们既要求面包,也要求玫瑰;我们既要求劳动的时间,也要求生活的意义。"},{f:"luxemburg",w:"《社会改良还是革命?》",y:1899,t:"最终目的无论是什么,对我来说都是次要的,运动本身就是目的。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"工人单靠自己的力量,只能形成工联主义的意识;社会主义学说,是从哲学、历史学和经济学的理论范畴中被创造出来的。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"对社会主义意识形态的任何轻视和任何脱离,都意味着资产阶级意识形态的加强。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"我们必须到一切阶级中去,把无产阶级的一切先锋队都组织起来。"},{f:"lenin",w:"《怎么办?》",y:1902,t:"政治同经济相比不能不占首位;谁把这个原理忘记,谁就滚到工联主义的泥坑里去。"},{f:"lenin",w:"《进一步,退两步》",y:1904,t:"党应当是有组织的,而不是无组织的;遵守党纲、党章和党的纪律,是每一个党员的条件。"},{f:"lenin",w:"《进一步,退两步》",y:1904,t:"无产阶级在争取政权的斗争中,除了组织,没有别的武器。"},{f:"lenin",w:"《进一步,退两步》",y:1904,t:"集中制的思想,就是要有统一的党章、统一的可服从的党的领导机关、少数服从多数。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"没有政权,任何一个被压迫的阶级都不能实现自己的解放。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"革命的首要问题是国家政权问题;不弄清这一点,就谈不上参加革命。"},{f:"lenin",w:"《社会民主党在民主革命中的两种策略》",y:1905,t:"谁想把无产阶级和农民的领导权让给自由派,谁就是事实上背叛革命。"},{f:"lenin",w:"《唯物主义和经验批判主义》",y:1909,t:"从物到感觉和思想呢,还是从思想和感觉到物?这是认识论的两条基本的、对立的路线。"},{f:"lenin",w:"《唯物主义和经验批判主义》",y:1909,t:"客观真理的存在是不依赖于人类的;承认客观真理,也就是在这样或那样地承认唯物主义。"},{f:"lenin",w:"《唯物主义和经验批判主义》",y:1909,t:"人不能完全地把握=反映=描绘整个自然界,但这一反映的近似的正确性是在不断增长的。"},{f:"lenin",w:"《黑格尔〈逻辑学〉一书摘要》",y:1914,t:"没有人的情感,则过去、现在和将来从来就没有也不可能有对真理的追求。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"帝国主义最深厚的经济基础就是垄断;垄断是从资本主义转到更高级的资本主义的一个过渡阶段。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"资本输出是帝国主义的最重要的特征之一,它使资本主义在世界范围内成为剥削和压迫绝大多数居民的制度。"},{f:"lenin",w:"《帝国主义是资本主义的最高阶段》",y:1916,t:"金融资本追求的不是自由,而是垄断;不是民主,而是政治反动。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"民主共和国是无产阶级在阶级斗争中政治自由的、最完善的形式,它同时是无产阶级走向社会主义的最短道路。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"在资本主义和共产主义之间,不能不有一个相当长的过渡时期;这个时期的国家只能是无产阶级的革命专政。"},{f:"lenin",w:"《国家与革命》",y:1917,t:"马克思的学说,正是无产阶级解放的条件的学说。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"共产主义的物质技术基础,是大机器工业;没有它,社会主义就无从谈起。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"我们必须利用资本主义所积累起来的一切科学和技术的成果,来建设社会主义。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"劳动纪律,是有组织的、自觉的、统一的劳动;这是社会主义的首要条件之一。"},{f:"lenin",w:"《布列斯特和约时期的笔记》",y:1918,t:"苏维埃政权加普鲁士的铁路秩序,加美国的技术和托拉斯组织,加美国的国民教育等等,总和就是社会主义。"},{f:"lenin",w:"《伟大的创举》",y:1919,t:"共产主义星期六义务劳动,是工人自己创造的、比资本主义更高的社会劳动组织形式的萌芽。"},{f:"lenin",w:"《伟大的创举》",y:1919,t:"推翻资本主义,是比组织新社会更简单的事情;后者的困难要大得多。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"旧学校死记硬背,强迫人们学习一大堆死的知识;但这一堆知识无论如何是必要的,不掌握它就建不成新社会。"},{f:"lenin",w:"《青年团的任务》",y:1920,t:"我们的事业是正义的;胜利是属于我们的。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"历史上还没有过一个政党像布尔什维克那样,经受住这样长期、这样艰苦的考验。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"共产党人的责任不是幻想不必妥协,而是善于区别两种妥协:一种加强了革命,一种出卖了革命。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1920,t:"革命阶级如果拒绝利用一切活动舞台,那它就是最大的冒险家,就是不自量力。"},{f:"lenin",w:"《论民族自决权》",y:1914,t:"反对帝国主义的斗争,如果不同民族问题联系起来,就会变成空洞的、毫无意义的口号。"},{f:"lenin",w:"《日记摘录》",y:1923,t:"文盲是站在政治之外的;不识字的人,只能听到传闻、流言和毫无根据的臆说。"},{f:"lenin",w:"《论战斗唯物主义的意义》",y:1922,t:"不研究辩证法,不研究黑格尔,就不能做一个现代的唯物主义者。"},{f:"lenin",w:"《俄共(布)第十次代表大会》",y:1921,t:"党的统一不是靠空谈,而是靠组织的巩固、靠一致的、有纪律的行动。"},{f:"lenin",w:"《远方通信》",y:1917,t:"面包!和平!土地!——群众的要求这样简单,这样明确,而临时政府却回答不了。"},{f:"lenin",w:"《无产阶级革命的军事纲领》",y:1915,t:"战争从来不是偶然的事,它是战前政策的继续和另一种手段的继续。"},{f:"lenin",w:"《革命时期的职责》",y:1905,t:"革命是被压迫者和被剥削者的节日;在革命时期,群众的创造力是惊人的。"},{f:"lenin",w:"《苏维埃政权的当前任务》",y:1918,t:"要学会组织,要学会计算,要学会管理——这是我们现在的主要任务。"},{f:"lenin",w:"《全俄苏维埃第八次代表大会》",y:1920,t:"共产主义的物质基础,就是现代化大工业;电气化就是这个基础。"},{f:"lenin",w:'《共产主义运动中的"左派"幼稚病》',y:1921,t:"铁的纪律,不是靠面包和娱乐来维持,而是靠觉悟、忠诚、坚韧和自我牺牲精神来维持。"},{f:"lenin",w:"《给美国工人的信》",y:1918,t:"革命的基本规律是:被压迫阶级如果不努力学会掌握新的事物,就不会得到解放。"},{f:"lenin",w:"《俄共(布)中央政治教育委员会的报告》",y:1921,t:"第一,学习;第二,学习;第三,还是学习。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"工人除了锁链以外一无所有,而他们所获得的,却是创造这一切财富的劳动本身被夺走。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"每一个工业城市的繁荣,都是建立在工人的贫困之上的;这是英国社会一切弊病的集中表现。"},{f:"engels",w:"《英国工人阶级状况》",y:1845,t:"资产阶级的道德,只有在它对生意有利的时候才被遵守。"},{f:"engels",w:"《英国工人阶级状况》1892年导言",y:1892,t:"工人阶级已经正式提出要求分享社会财富,而这一切财富正是他们自己创造出来的。"},{f:"engels",w:"《反杜林论》",y:1878,t:"平等观念本身是一种历史的产物,这个观念的形成,需要全部以往的历史。"},{f:"engels",w:"《反杜林论》",y:1878,t:"人们自觉地或不自觉地,归根到底总是从他们阶级地位所依据的实际关系中,吸取自己的道德观念。"},{f:"engels",w:"《反杜林论》",y:1878,t:"一旦社会占有了生产资料,社会生产内部的无政府状态,将为有计划的自觉的组织所代替;个体生存斗争停止了。"},{f:"engels",w:"《反杜林论》",y:1878,t:"到目前为止,一切社会发展的目的是:人本身作为历史的结果,现在应当第一次成为历史的自由自觉的前提。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"物质及其运动的属性,既不能创造,也不能消灭;这两句话应当成为现代自然科学的公理。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"运动是物质的存在方式;无论何时何地,都没有没有运动的物质,也没有没有物质的运动。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"机械的、物理的、化学的、生物的运动,构成一个由低到高的序列,高级的运动包含低级运动,却不能归结为它。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"自然界中的规律,只有通过盲目的、作为外在的强制性的规律来为自己开辟道路;而在社会中,规律是通过有意识的人来实现的。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"氏族制度已经被分工及其后果即社会分裂为阶级所炸毁;它被国家代替了。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"国家承认公民有支配财产的完全自由,也就是说,国家承认私有制。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"当有一天,资本关系被消灭了,国家将被放到古物陈列馆去,同纺车和青铜斧陈列在一起。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"在自然界中,起作用的是盲目的、无意识的力量;在社会历史中,起作用的是有意识、有目的的人。"},{f:"engels",w:"《路德维希·费尔巴哈和德国古典哲学的终结》",y:1886,t:"最终的结果总是从许多单个的意志的相互冲突中产生出来的,而其中每一个意志,又是由于许多特殊的生活条件才成为它所成为的那样。"},{f:"engels",w:"《德国农民战争》",y:1850,t:"1525年的德国农民战争失败以后,德国在政治上不复存在了;它一直睡到1848年。"},{f:"engels",w:"《德国农民战争》",y:1850,t:"官长的、教师的、书报的、地方的、邦级的以及最高级的臣仆,构成了德国的真正的存在。"},{f:"engels",w:"《法德农民问题》",y:1894,t:"当我们掌握了国家政权的时候,我们根本不能设想用暴力去剥夺小生产者,如同我们对待大土地占有者那样。"},{f:"engels",w:"《法德农民问题》",y:1894,t:"我们的任务,是把小者的私人生产和私人占有,变为合作社的生产和占有,而不是通过暴力手段。"},{f:"engels",w:"《1891年社会民主党纲领草案批判》",y:1891,t:"我们的党和工人阶级,只有在民主共和国这种政治形式下,才能取得统治;民主共和国甚至是无产阶级专政的特殊形式。"},{f:"engels",w:"《论住宅问题》",y:1872,t:"住宅问题,只有当它同社会问题、同资本主义生产方式联系起来的时候,才能得到解决。"},{f:"engels",w:"《在爱北斐特的演说》",y:1845,t:"共产主义不是从原则出发,而是从事实出发;它不是学说,而是运动。"},{f:"engels",w:"《英国状况》",y:1845,t:"历史就是我们的一切;我们比任何一个哲学学派,甚至比黑格尔,都更重视历史。"},{f:"engels",w:"《卡尔·马克思》",y:1869,t:"马克思首先是一个革命家;毕生的真正使命,就是以这样或那样的方式参加现代无产阶级的解放事业。"},{f:"engels",w:"致弗·阿·左尔格的信",y:1886,t:"马克思主义,就是马克思的观点和学说;这两个名字是分不开的。"},{f:"engels",w:"致奥·倍倍尔的信",y:1884,t:"为了党,我牺牲了我的健康、我的安宁和我的一切;但是我从来不后悔。"},{f:"engels",w:"致弗·梅林的信",y:1893,t:"马克思和我不能分担这些过错,因为这是我们大家都犯过的过错;但是形式上我们应当承认,我们对哲学的批判不够充分。"},{f:"engels",w:"《俄国沙皇政府的对外政策》",y:1890,t:"旧的西欧的文明,如果不愿意同它的社会基础一起灭亡,它就应当消灭这种文明。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"共产主义革命,将不是单独地在某一个国家内发生;它将在一切文明国家里同时发生。"},{f:"engels",w:"《共产主义原理》",y:1847,t:"新的社会制度将消灭公民政治上的不平等,正如它将消灭财产上的不平等一样。"},{f:"engels",w:"《反杜林论》",y:1878,t:"政治统治的执行,到处都是以它同时执行着某种社会职能为基础的,而且只有它执行着这种社会职能,它才能维持下去。"},{f:"engels",w:"《自然辩证法》",y:1886,t:"经验自然科学,由于积累起来的材料日益庞大,已经越来越陷入没有理论的混乱状态。"},{f:"engels",w:"《劳动在从猿到人转变过程中的作用》",y:1876,t:"劳动和自然界一起才是一切财富的源泉;自然界为劳动提供材料,劳动把材料变为财富。"},{f:"engels",w:"《在伦敦举行的各族人民庆祝大会》",y:1845,t:"工人阶级的解放,只能是工人阶级自己的事业;谁也不能把它当作礼物送给他们。"},{f:"engels",w:"《论权威》",y:1874,t:"想消灭大工业中的权威,就等于想消灭工业本身,即想消灭蒸汽纺纱机而恢复手纺车。"},{f:"engels",w:"《家庭、私有制和国家的起源》",y:1884,t:"结婚的充分自由,只有在消灭了资本主义生产和它所造成的财产关系,从而把今日对选择配偶还有巨大影响的一切附加的经济考虑消除以后,才能普遍实现。"},{f:"engels",w:"《自然辩证法》",y:1886,t:'自然科学家由于受传统哲学的影响,总是以为哲学是"多余的";而实际上他们不过做了最坏的一种哲学的奴隶。'},{f:"mao",w:"《关于纠正党内的错误思想》",y:1929,t:"红军是一个执行革命的政治任务的武装集团,决不是单纯地打仗的。"},{f:"mao",w:"《反对自由主义》",y:1937,t:"自由主义是一种腐蚀剂,使团结涣散,关系松懈,工作消极,意见分歧。"},{f:"mao",w:"《反对自由主义》",y:1937,t:"革命的集体组织中的自由主义,客观上是起着助敌的作用的。"},{f:"mao",w:"《〈农村调查〉的序言和跋》",y:1941,t:"群众是真正的英雄,而我们自己则往往是幼稚可笑的;不了解这一点,就不能得到起码的知识。"},{f:"mao",w:"《〈农村调查〉的序言和跋》",y:1941,t:"没有满腔的热忱,没有眼睛向下的决心,没有求知的渴望,没有放下臭架子、甘当小学生的精神,是一定不能做,也一定做不好的。"},{f:"mao",w:"《反对本本主义》",y:1930,t:'调查就像"十月怀胎",解决问题就像"一朝分娩";调查就是解决问题。'},{f:"mao",w:"《总政治部关于调查人口和土地状况的通知》",y:1931,t:"不做正确的调查,同样没有发言权。"},{f:"mao",w:"《在陕甘宁边区高级干部会议上的报告》",y:1942,t:"一切空话都是无用的,必须给人民以看得见的物质福利。"},{f:"mao",w:"《党委会的工作方法》",y:1949,t:"抓而不紧,等于不抓。"},{f:"mao",w:"《党委会的工作方法》",y:1949,t:'要把问题摆到桌面上来;不仅"互通情报",还要不耻下问。'},{f:"mao",w:"《党委会的工作方法》",y:1949,t:"弹钢琴——要产生好音乐,必须十个指头都动作,不能有的动,有的不动。"},{f:"mao",w:"《党委会的工作方法》",y:1949,t:'对情况和问题一定要注意到它们的数量方面,要有基本的数量的分析——胸中有"数"。'},{f:"mao",w:"在中国共产党第七届中央委员会第二次全体会议上的报告",y:1949,t:"我们不但善于破坏一个旧世界,我们还将善于建设一个新世界。"},{f:"mao",w:"《论人民民主专政》",y:1949,t:"对人民内部的民主方面和对反动派的专政方面,互相结合起来,就是人民民主专政。"},{f:"mao",w:"《论人民民主专政》",y:1949,t:"总结我们的经验,集中到一点,就是工人阶级经过共产党领导的以工农联盟为基础的人民民主专政。"},{f:"mao",w:"《论联合政府》",y:1945,t:"和最广大的人民群众取得最密切的联系,全心全意地为人民服务,一刻也不脱离群众——这是共产党人区别于其他任何政党的又一个显著的标志。"},{f:"mao",w:"《论联合政府》",y:1945,t:"有无认真的自我批评,也是我们和其他政党互相区别的显著的标志之一。"},{f:"mao",w:"《论联合政府》",y:1945,t:"房子是应该经常打扫的,不打扫就会积满了灰尘;脸上的灰尘应该经常洗,不洗也会积满灰尘。"},{f:"mao",w:"《中国共产党在民族战争中的地位》",y:1938,t:"政治路线确定之后,干部就是决定的因素。"},{f:"mao",w:"《论十大关系》",y:1956,t:"我们提出向外国学习的口号,我想是提得对的;一切民族、一切国家的长处都要学。"},{f:"mao",w:"《关于正确处理人民内部矛盾的问题》",y:1957,t:"我们的教育方针,应该使受教育者在德育、智育、体育几方面都得到发展,成为有社会主义觉悟的有文化的劳动者。"},{f:"mao",w:"《关于正确处理人民内部矛盾的问题》",y:1957,t:"将我国建设成为一个具有现代工业、现代农业和现代科学文化的社会主义国家。"},{f:"mao",w:"《关于正确处理人民内部矛盾的问题》",y:1957,t:"调动一切积极因素,化消极因素为积极因素,团结全国各族人民进行一场新的战争——向自然界开战。"},{f:"mao",w:"《中国农村的社会主义高潮》按语",y:1955,t:"青年是整个社会力量中的一部分最积极最有生气的力量;他们最肯学习,最少保守思想。"},{f:"mao",w:"《星星之火,可以燎原》",y:1930,t:"中国革命高潮快要到来;它是站在海岸遥望海中已经看得见桅杆尖头了的一只航船。"},{f:"mao",w:"《抗日时期的经济问题和财政问题》",y:1942,t:"发展经济,保障供给,是我们的经济工作和财政工作的总方针。"},{f:"mao",w:"《论持久战》",y:1938,t:"战争的胜负,固然决定于双方军事、政治、经济、地理、战争性质、国际援助诸条件,然而不仅仅决定于这些。"},{f:"mao",w:"《中国革命战争的战略问题》",y:1936,t:"敌进我退,敌驻我扰,敌疲我打,敌退我追。"},{f:"mao",w:"《目前形势和我们的任务》",y:1947,t:"以歼灭敌人有生力量为主要目标,不以保守或夺取城市和地方为主要目标。"},{f:"mao",w:"转战陕北时的讲话",y:1947,t:"存地失人,人地皆失;存人失地,人地皆存。"},{f:"mao",w:"《打退资产阶级右派的进攻》",y:1957,t:"工、农、商、学、兵、政、党这七个方面,党是领导一切的。"},{f:"mao",w:"《送瘟神》",y:1958,t:"春风杨柳万千条,六亿神州尽舜尧。"},{f:"mao",w:"《送瘟神》",y:1958,t:"坐地日行八万里,巡天遥看一千河。"},{f:"mao",w:"《送瘟神》",y:1958,t:"红雨随心翻作浪,青山着意化为桥。"},{f:"mao",w:"《七律·到韶山》",y:1959,t:"红旗卷起农奴戟,黑手高悬霸主鞭。"},{f:"mao",w:"《七律·到韶山》",y:1959,t:"喜看稻菽千重浪,遍地英雄下夕烟。"},{f:"mao",w:"《水调歌头·游泳》",y:1956,t:"一桥飞架南北,天堑变通途;更立西江石壁,截断巫山云雨,高峡出平湖。"},{f:"mao",w:"《蝶恋花·答李淑一》",y:1957,t:"我失骄杨君失柳,杨柳轻飏直上重霄九。"},{f:"mao",w:"《蝶恋花·答李淑一》",y:1957,t:"忽报人间曾伏虎,泪飞顿作倾盆雨。"},{f:"mao",w:"《七绝·为女民兵题照》",y:1961,t:"中华儿女多奇志,不爱红装爱武装。"},{f:"mao",w:"《清平乐·六盘山》",y:1935,t:"今日长缨在手,何时缚住苍龙?"},{f:"mao",w:"《七绝·改西乡隆盛诗赠父亲》",y:1906,t:"孩儿立志出乡关,学不成名誓不还;埋骨何须桑梓地,人生无处不青山。"},{f:"mao",w:"《奋斗自勉》",y:1917,t:"与天奋斗,其乐无穷;与地奋斗,其乐无穷;与人奋斗,其乐无穷。"},{f:"mao",w:"在莫斯科接见中国留学生时的讲话",y:1957,t:'世界上怕就怕"认真"二字,共产党就最讲认真。'},{f:"mao",w:"开国大典时的口号",y:1949,t:"中国人民万岁!"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"意识在任何时候都只能是被意识到了的存在,而人们的存在就是他们的现实生活过程。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"思想、观念、意识的生产,最初是直接与人们的物质活动、与人们的物质交往、与现实生活的语言交织在一起的。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:'解放是一种历史活动,而不是思想活动;"历史"活动是由人们的生活条件、由工业和交往的状况造成的。'},{f:"marx",w:"《德意志意识形态》",y:1845,t:"个人怎样表现自己的生活,他们自己就是怎样的;因此,他们是什么样的,这同他们的生产是一致的——既和他们生产什么一致,又和他们怎样生产一致。"},{f:"marx",w:"《神圣家族》",y:1845,t:"历史活动是群众的活动;随着历史活动的深入,必将是群众队伍的扩大。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"共产主义是人的本质的现实的生成,是人的本质对人说来的真正实现,是人的本质作为某种现实的东西的实现。"},{f:"marx",w:"《〈黑格尔法哲学批判〉导言》",y:1843,t:"宗教是人的本质在幻想中的实现,因为人的本质不具有真正的现实性。"},{f:"marx",w:"《评普鲁士最近的书报检查令》",y:1842,t:"风格就是人;可是这里却要求我不写我的风格,而写柏林的风格。"},{f:"marx",w:"《评普鲁士最近的书报检查令》",y:1842,t:"检查制度的精神就是审查制度的精神,因此它必然是伪善的。"},{f:"marx",w:"《摩泽尔记者的辩护》",y:1843,t:"在研究国家生活现象时,很容易走入歧途,即注意各种政府形式的口号和声明,而忽视现实生活的状况。"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"如果斗争只有在极顺利的成功机会的条件下才着手进行,那么创造世界史也就不会有什么困难了。"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"资产阶级的经济繁荣,在每次革命以前都出现过;在每次革命以前,都有一段疯狂时期、一段预言时期和一段英雄时期。"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"一个独立的、有组织的无产阶级政党的成立,是无产阶级革命的首要条件。"},{f:"marx",w:"《1848年至1850年的法兰西阶级斗争》",y:1850,t:"推翻资产阶级!工人阶级专政!——这就是革命的口号,它把一切中间阶段都宣布为多余的了。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"在法国,事情如果没有达到荒谬绝顶的地步,就不会发生变化。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"他们为了反对一种新的罪恶,却回到了旧的迷信;他们把自己的迷信当作对过去的回忆。"},{f:"marx",w:"《路易·波拿巴的雾月十八日》",y:1852,t:"法国人似乎是通过自己过去的革命传统来教育自己的;他们使死人复活,是为了弄清新的斗争。"},{f:"marx",w:"《致约·魏德迈的信》",y:1852,t:"至于我,那末我所作出的新贡献,就是证明下列几点:(1)阶级的存在,仅仅同生产发展的一定历史阶段相联系;(2)阶级斗争必然导致无产阶级专政;(3)这个专政不过是达到消灭一切阶级和进入无阶级社会的过渡。"},{f:"marx",w:"《不列颠在印度的统治》",y:1853,t:"英国在印度要完成双重的使命:一个是破坏的使命,即消灭旧的亚洲式的社会;另一个是重建的使命,即在亚洲为西方式的社会奠定物质基础。"},{f:"marx",w:"《中国革命和欧洲革命》",y:1853,t:"一个人口几乎占人类三分之一的大帝国,不顾时势,安于现状,人为地隔绝于世,并因此竭力以天朝尽善尽美的幻想自欺;这样一个帝国注定最后要在一场殊死的决斗中被打垮。"},{f:"marx",w:"《中国革命和欧洲革命》",y:1853,t:"中国革命将不是个别的孤立的事件,而是整个亚洲新纪元的前兆。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"生产剩余价值或赚钱,是这个生产方式的绝对规律;资本对剩余劳动的欲望,是无止境的。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"工作日的一部分,是用来再生产工人自身劳动力价值的必要劳动时间;其余部分,则是为资本家无偿生产的剩余劳动时间。"},{f:"marx",w:"《资本论》第一卷",y:1867,t:"每个资本家,都代表总资本的一个特殊部分;作为总体,资本家阶级就是总资本。"},{f:"marx",w:"《国际工人协会共同章程》",y:1871,t:"工人阶级在反对有产阶级联合权力的斗争中,只有组织成为与一切旧政党不同的政党,才能作为一个阶级来行动。"},{f:"marx",w:"《巴枯宁〈国家制度和无政府状态〉一书摘要》",y:1874,t:"无产阶级专政的国家,已经不是原来意义上的国家;它从成立之日起,就应当立即着手消灭这个国家。"},{f:"marx",w:"《论土地所有制》",y:1872,t:"土地所有制,是近代社会的基础;资本的利润,建立在土地所有权的垄断之上。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"一切阶级斗争都是政治斗争;无产阶级组织成为阶级,从而组织成为政党,这是阶级斗争达到一定阶段的产物。"},{f:"marx",w:"《共产党宣言》",y:1848,t:"工人阶级的解放,应当是工人阶级自己的事业;而工人阶级要获得解放,就必须首先把自己的国家政权掌握在自己手里。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"经济范畴,只不过是生产方面社会关系的理论表现,即关系的抽象。"},{f:"marx",w:"《哲学的贫困》",y:1847,t:"人们按照自己的物质生产率建立相应的社会关系,正是这些人又按照自己的社会关系创造了相应的原理、观念和范畴。"},{f:"marx",w:"《雇佣劳动与资本》",y:1847,t:"资本也是一种生产关系;它是资产阶级社会的生产关系。"},{f:"marx",w:"《工资、价格和利润》",y:1865,t:"一种商品的价值,是由生产它时所用的必要劳动时间决定的;这个规律,同样适用于劳动。"},{f:"marx",w:"《工资、价格和利润》",y:1865,t:"工人阶级必须反对的,不是资本主义生产方式所造成的后果,而是这种生产方式本身。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"生产、分配、交换、消费,构成一个总体的各个环节;生产既支配着与其他要素相对而言的其他要素,同时也由它们所支配。"},{f:"marx",w:"《〈政治经济学批判〉导言》",y:1857,t:"艺术生产的发展,同社会的一般进步、同整个艺术发展的一般状况,并不总是成比例的。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"资本本身是处于过程中的价值;它只有在不断增殖中才能保存自己。"},{f:"marx",w:"《1857—1858年经济学手稿》",y:1858,t:"自由时间,是劳动的休息;同时也是发展智力、在精神上有所成就的时间。"},{f:"marx",w:"《给维·伊·查苏利奇的复信草稿》",y:1881,t:"农村公社是俄国社会复兴的因素;它有可能不通过资本主义制度的卡夫丁峡谷,而占有它的一切积极成果。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"真正的节约,是劳动时间的节约;而这要求把劳动时间分配到其他各种用途上去。"},{f:"marx",w:"《资本论》第三卷",y:1894,t:"在一切社会形态中,都有一种起支配作用的生产,它决定其他一切生产的地位,以及其他一切关系的比例。"},{f:"marx",w:"《德意志意识形态》",y:1845,t:"分工,是从生产力一经出现就随之产生的;它也是所有制各种不同形式赖以产生的基础。"},{f:"marx",w:"《神圣家族》",y:1845,t:"批判的批判除了自己以外,在世界上什么也没有看到;而工人阶级却在创造着整个现实的生活。"},{f:"marx",w:"《1844年经济学哲学手稿》",y:1844,t:"人以一种全面的方式,就是说,作为一个总体的人,占有自己的全面的本质。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"费尔巴哈没有看到,感性世界决不是某种开天辟地以来就直接存在的、始终如一的东西,而是工业和社会状况的产物。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"教育者本人一定是受教育的;因此,教育者的教育,本身必须以环境的改变为前提。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"旧唯物主义的立脚点是市民社会,新唯物主义的立脚点则是人类社会或社会的人类。"},{f:"marx",w:"《关于费尔巴哈的提纲》",y:1845,t:"对对象、现实、感性,当作感性的人的活动,当作实践去理解——这就是从主体方面去理解。"}],Td=[[-.2838,-.2755],[-.0374,-.9395],[.517,.0027],[-.1837,-.9594],[-.4751,-.7874],[.0665,.5014],[-.284,-.9428],[.5081,-.9603],[.1465,-.339],[.0756,-.3171],[-.2305,-.3058],[.1258,.9051],[.0012,.0984],[.2819,.7199],[.2465,-.43],[.1656,.6949],[.6293,-.8547],[.6195,-.8295],[.1884,-.8952],[-.0579,.8702],[.0201,.6937],[-.6276,-.8701],[.6314,-.2756],[-.4485,-.9226],[-.0192,.7272],[.461,-.1119],[.384,-.7415],[.2052,-.637],[.6271,-.2487],[-.3542,-.8548],[.0446,-.3322],[-.104,.067],[-.0672,.9767],[-.0459,.6589],[-.2862,-.3275],[.3187,-.6516],[-.2498,-.291],[.26,.1998],[.5,-.9239],[.1623,-.4203],[.1578,-.6747],[-.1883,-.802],[.5473,-.938],[-.0789,.9194],[.0166,.0334],[.0619,-.857],[-.2675,-.7834],[.2073,.9654],[.611,-.1967],[-.5407,-.7589],[.5186,.0056],[.3963,-.7522],[.4631,-.7696],[.0594,-.9133],[.0414,.5495],[.4629,-.8694],[.2982,-.6472],[.099,.526],[.2435,.9696],[.4626,-.8535],[-.4733,-.8761],[.0563,-.7929],[.1397,.9235],[.248,-.4989],[-.0498,-.3416],[.2334,.9432],[.3866,.1403],[.0498,.8882],[.1979,.7836],[.5566,-.6756],[-.2777,-.3501],[-.0138,.6999],[-.1129,-.3426],[-.4226,-.6655],[.3228,.047],[.1041,.6841],[.5939,-.5889],[-.049,-.8841],[.5733,-.7843],[-.5736,-.8122],[-.1838,-.2307],[.0188,.9118],[-.1014,.7187],[-.4814,-.8999],[.2105,.1716],[.6299,-.8508],[.0166,.6398],[.1526,.8118],[.3533,-.7329],[.4924,-.4154],[.1077,.0164],[-.0777,.9234],[-.4719,-.6253],[.0439,.648],[-.1417,-.2812],[.0886,.4909],[.2121,.7657],[.1929,.1821],[-.0408,-.9742],[-.1879,.0511],[.3841,-.7825],[.0376,.5929],[-.3523,-.8024],[-.2053,-.0973],[-.4489,-.2379],[.028,-.8158],[.2563,.2191],[-.5502,-.9597],[.2149,-.7541],[-.423,-.7657],[-.1586,-.7879],[-.069,-.0953],[.2124,.754],[.2222,.96],[-.0519,-.3956],[-.1417,.7144],[-.3284,-.1185],[.1767,.2489],[-.1878,-.8974],[.259,-.838],[.6029,-.8808],[.3437,.6705],[.1459,.8132],[.0967,.8507],[-.077,-.3382],[-.196,.6771],[-.5496,-.8032],[.4515,-.0135],[-.0486,-.9994],[.1035,-.6214],[.031,.5838],[.2275,-.7053],[-.1623,.0773],[.0076,.6751],[-.3711,-.7724],[.3345,-.6536],[-.0169,-.4938],[-.0751,-.361],[.3261,.0449],[.4934,-.4304],[-.1091,-.4071],[-.2899,-.0353],[.0697,.8767],[-.3966,-.2734],[-.043,-.3548],[-.1675,-.9832],[.3366,-.7589],[-.0967,.0674],[.1426,.8992],[-.2828,-.8771],[-.3553,-.152],[.4947,-.8113],[-.0433,.7853],[-.0296,.0228],[.019,.6373],[-.2022,-.8382],[.1458,.733],[-.2903,-.2492],[-.0866,-.9855],[.4452,-.1308],[.2799,-.9294],[-.1737,.0817],[.6219,-.4886],[.4202,-.8313],[-.3258,-.7854],[-.1189,-.9588],[.55,-.405],[.0314,-.0516],[.1309,.7306],[.4269,-.189],[-.4561,-.7139],[.0693,-.7931],[-.1198,-.3972],[.5339,-.7719],[-.481,-.9804],[-.5123,-.8185],[.4781,-.0444],[-.2489,-.9574],[-.5626,-.8819],[.19,.9235],[-.1704,-.1918],[.4094,-.4528],[.5156,-.3439],[.5929,-.3873],[-.1678,-.0891],[-.6323,-.8917],[.5094,-.8258],[-.0434,.9534],[.1525,-.9574],[-.4199,-.2683],[-.0219,.8889],[.292,-.7092],[.0319,.902],[-.1838,-.0289],[.3099,-.7393],[-.1567,-.046],[.4012,-.5593],[.55,-.3726],[.303,.6664],[-.3713,-.8682],[.2572,.1186],[-.1404,-.1169],[-.0429,.6674],[.0655,.6422],[-.4437,-.89],[.0831,.5523],[-.5738,-.9084],[-.0739,.7669],[-.1337,-.2345],[.0576,-.5011],[.112,.0155],[.0292,-.9381],[.0667,-.807],[.2085,.7637],[.0435,.8326],[-.0976,.6666],[.4163,.0479],[-.3189,-.3847],[.2795,.0999],[.1228,-.7757],[-.2938,-.2978],[.0888,-.4217],[-.0916,.9745],[-.2189,-.802],[-.0484,-.2676],[.4397,.0659],[-.4882,-.9869],[-.3776,-.3929],[.0388,-.316],[.4659,-.6777],[.1578,-.5443],[-.4724,-.2203],[-.5658,-.8689],[.4412,-.7438],[.5175,-.8253],[.0493,.0849],[.0617,-.3035],[.0333,.1006],[-.3039,-.3504],[.1827,.8708],[-.241,-.0854],[-.5135,-.9093],[-.1681,.6873],[.4654,.0693],[.6369,-.8521],[-.3791,-.343],[.524,-.9018],[.1196,-.8948],[-.1433,-.3434],[.595,-.2743],[-.1036,-.0201],[-.0758,.0039],[-.1511,-.9447],[-.0072,.726],[.006,.7924],[.5722,-.4022],[.5069,-.1029],[-.4059,-.883],[.3739,-.0384],[-.0584,-.9503],[-.1535,-.786],[.0569,-.9942],[.4791,-.1126],[-.3843,-.2823],[-.5602,-.6557],[.2494,-.438],[.1926,-.6394],[-.1295,.6853],[-.184,-.0425],[-.047,-.3706],[.2137,-.7498],[-.1762,-.0837],[.4302,-.9464],[.1259,.7316],[.0411,-.3597],[-.2982,-.7428],[.1281,-.7734],[-.0521,.0729],[-.1407,-.2892],[-.3767,-.8983],[.1338,-.3224],[.596,-.8028],[-.0588,-.0188],[.4989,-.5193],[-.193,-.7824],[-.3623,-.382],[.314,-.6932],[-.1784,-.7838],[-.5393,-.9726],[-.0161,-.0981],[.2294,.9501],[.3838,.1435],[.5649,-.1285],[.4253,-.7536],[-.1156,.6673],[.0252,-.5399],[-.2723,-.7561],[.4855,-.4253],[.1747,.8157],[.1173,-.3479],[-.1129,.7105],[.5842,-.8214],[-.0428,.9126],[-.5837,-.9911],[-.0412,-.8067],[-.0158,-.8013],[.0987,.7825],[.2421,-.4773],[.3722,-.6909],[-.1199,-.9201],[.1905,-.3774],[-.2379,-.2916],[-.1032,-.9498],[.4948,-.8336],[-.2493,-.803],[-.4222,-.7958],[.4184,-.8934],[.0596,.5172],[-.0191,.0073],[-.0511,-.0323],[-.3544,-.8573],[-.0261,-.9391],[.5013,-.2142],[.469,-.9853],[-.1098,.0092],[.3177,-.6755],[.0823,.0531],[.3924,-.5823],[.5199,-.0734],[.4524,-.7854],[.1841,-.4209],[.0018,-.0816],[.3694,-.7652],[.4634,-.7116],[-.5752,-.7164],[.4365,-.289],[.1654,-.3557],[.0024,.9234],[-.2247,-.9675],[-.1533,-.2188],[.033,.5743],[-.0875,-.1191],[.4593,-.3408],[-.1428,-.842],[-.2291,-.3],[-.2407,-.3133],[.0516,.5515],[-.0837,-.0421],[.135,-.488],[.3144,-.5514],[.2949,.1162],[.4944,-.0913],[-.0139,-.9963],[-.5446,-.8225],[.1847,.7943],[.4103,.1245],[.2704,-.7349],[.4267,-.763],[.2495,.753],[.1779,-.6916],[.6091,-.1748],[.2778,-.8147],[-.5354,-.6533],[.1197,-.469],[-.4441,-.7027],[.3776,-.6856],[.2828,-.5155],[.1494,.8785],[-.0032,-.514],[-.1406,-.7907],[-.3926,-.2282],[.3892,-.0204],[-.2933,-.2607],[.2746,-.7787],[.043,-.3003],[.0988,-.5322],[.397,-.0439],[-.5953,-.9824],[.4175,-.6751],[-.3295,-.8377],[.2174,.9689],[-.4124,-.365],[-.2468,-.2362],[.541,-.0967],[.5978,-.8853],[.2304,.9459],[-.4913,-.723],[-.5159,-.785],[-.0307,-.8942],[.0209,.7429],[.1516,-.6492],[-.1617,-.3322],[-.382,-.3318],[.0789,.6474],[.2248,-.481],[.6362,-.8461],[.403,-.4786],[-.1196,-.0216],[.1412,-.7951],[-.4668,-.7102],[-.2403,-.8153],[-.3885,-.8908],[-.0943,-.2022],[-.0406,-.2376],[.3335,.6634],[.2322,-.7703],[.6131,-.824],[-.0813,.939],[.406,-.6111],[.1061,-.6219],[.0169,.8103],[.0186,-.264],[-.2071,-.3055],[.5539,-.2967],[-.2244,-.8014],[-.5088,-.8536],[-.0596,-.8024],[.4317,-.6247],[-.14,-.8795],[.4044,.0894],[-.2889,-.3627],[-.3838,-.2128],[-.2249,-.7707],[.5184,-.1636],[.327,-.8057],[-.0139,-.4389],[-.0839,-.3834],[.1691,-.5963],[-.4049,-.8008],[.2995,-.4979],[-.0155,.9165],[-.329,-.2772],[.58,-.4524],[.3438,-.5729],[.2577,.6605],[.2143,-.5617],[.1636,.848],[.4064,-.5414],[.051,.2657],[.4512,-.4752],[-.1884,.0025],[-.1901,-.1097],[-.2563,-.7597],[.4393,-.3215],[-.0063,-.0928],[-.0583,-.4498],[-.0271,.9455],[-.4023,-.1483],[.0491,.0122],[-.3107,-.7367],[-.2138,-.044],[-.3615,-.4052],[.4509,-.8934],[-.5243,-.8075],[.2508,.7386],[-.348,-.4183],[.2142,.7263],[-.3353,-.4013],[.2417,.2057],[.5578,-.8821],[.0969,.6919],[.3297,.6801],[.0716,.8449],[-.2563,-.9405],[-.3222,-.0673],[.4526,-.0815],[.4961,-.0192],[.1506,.7297],[.1666,.1989],[.432,-.3502],[-.0381,.8176],[.4987,-.4944],[.0843,.5305],[.5298,-.1673],[.6055,-.2134],[.1767,.7199],[.1845,.6607],[-.1998,-.8145],[-.2655,-.2844],[-.0712,-.2289],[.0372,.0382],[-.0431,.8012],[-.4431,-.8716],[.0928,.8543],[-.4542,-.7869],[-.1482,.671],[-.196,.037],[.0077,.6521],[.5029,-.4798],[-.2203,-.1608],[-.2095,-.8836],[.5363,-.261],[-.0145,.8807],[.4913,-.8965],[.0866,.8856],[-.0282,.8324],[.0602,-.2561],[.0533,.5386],[-.4189,-.6756],[-.4248,-.7534],[.3329,-.9016],[.6108,-.8786],[.4142,-.5144],[.066,.2603],[-.0949,-.3474],[.0289,-.3601],[.2418,-.4827],[-.0744,-.1711],[.2651,.1833],[-.029,-.4493],[-.2942,-.3697],[-.0748,-.8448],[-.084,-.3509],[.0186,.0146],[-.5202,-.7541],[-.4842,-.7447],[-.4464,-.802],[.0491,-.9932],[.1205,-.6326],[.1303,.8971],[.232,-.7624],[.5115,-.5801],[-.2885,-.32],[.5674,-.0802],[.4279,-.9441],[.2069,.2417],[-.0943,.032],[-.2259,-.2434],[-.3402,-.3987],[.1,-.958],[-.3817,-.8827],[.4269,.1083],[.059,-.0209],[.021,-.5306],[-.3378,-.8266],[-.5228,-.7801],[.51,-.1657],[.5059,-.1814],[.3655,-.8878],[-.2433,-.7729],[-.1782,-.3361],[-.2704,-.1775],[-3e-4,.9059],[.5354,-.0412],[.5588,-.1285],[.5178,-.3095],[.1873,-.4134],[.3187,.1911],[.5929,-.5631],[-.0093,.6665],[.0975,.0062],[-.171,-.9822],[.0957,-.9911],[.1997,-.7132],[.0993,-.9161],[-.3921,-.2202],[.2383,-.5041],[-.5125,-.9958],[.281,-.6143],[-.5424,-.9256],[-.1953,.0532],[.2562,-.9412],[.1604,-.3516],[-.1022,.0463],[.094,.8658],[-.4962,-.7262],[-.177,.6826],[.2014,.8537],[.4332,-.3422],[.1257,-.9174],[.4153,-.1424],[.437,.0988],[-.0612,-.9992],[.5498,-.8558],[-.5714,-.7246],[.2337,.6682],[.6035,-.2484],[-.3244,-.3766],[.032,-.9461],[-.0379,-.162],[-.108,-.9319],[.0899,-.9164],[.4623,-.5068],[.4278,-.6411],[-.1029,.7257],[.4354,-.4576],[.0987,-.8999],[.1922,-.5583],[-.4777,-.7517],[.4248,-.1793],[-.5091,-.9941],[.4239,-.0253],[.3811,-.8946],[.4242,-.4009],[-.0115,-.9634],[6e-4,.7298],[-.003,.825],[.0392,-.0111],[.4053,.0174],[-.0311,-.4589],[-.4319,-.1877],[.355,-.536],[.5622,-.6614],[.6272,-.2398],[.0899,.5341],[.3286,.1066],[-.0216,.7499],[-.2786,-.7929],[.2254,-.9428],[.0865,.0467],[.157,-.4363],[-.1621,-.3392],[.1049,-.9561],[.4801,.0388],[-.0847,-.9721],[.1325,.807],[-.0644,-.9821],[.4677,-.4663],[.3023,-.9161],[.1627,.6906],[-.3503,-.9042],[.0537,.0867],[.2504,-.6698],[.0818,.5545],[.0404,-.8805],[.1798,.6699],[-.3003,-.3735],[.5246,-.6876],[.3627,-.5398],[.515,-.2675],[-.2144,.0382],[.0103,-.3777],[.0562,.7195],[-.1888,.0663],[.0541,-.3489],[.153,.2096],[-.118,-.172],[.5539,-.1531],[-.559,-.7396],[.1881,.6637],[.5535,-.3419],[-.4718,-.8028],[.5324,-.0139],[.5529,-.2431],[.3644,-.5973],[.4352,-.5265],[-.4989,-.9882],[.2933,-.8204],[-.002,.6571],[-.1027,-.7964],[.4121,-.5103],[.2796,.6863],[.5686,-.1869],[-.0688,-.297],[-.3289,-.3717],[-.2826,-.0281],[-.3223,-.2089],[.1373,-.3772],[-.0459,-.2647],[-.0485,.0499],[.1622,-.9691],[.3342,.0345],[.2238,-.6411],[-.0605,-.4547],[.1435,.8315],[-.0343,-.4837],[-.1484,-.7905],[.2442,-.6639],[-.1175,-.7943],[.429,-.3856],[.4216,-.9325],[.0183,-.8704],[.3884,-.5112],[.1745,-.9698],[.0533,-.4795],[.6377,-.3292],[-.0643,-.2038],[.3829,.0359],[-.1269,-.2956],[.5195,-.7477],[-.0677,.7655],[.0949,.8198],[.2153,.664],[-.1558,-.8367],[.5944,-.3382],[.4644,.0058],[-.3068,-.3094],[.3572,-.8776],[.0053,.9218],[-.4589,-.2088],[.5116,-.6019],[.137,.7562],[-.0313,.9462],[-.0946,.9808],[-.0852,-.8584],[-.0888,-.2825],[.341,.0197],[.1235,-.8361],[.2344,.1407],[.5108,.0181],[-.4601,-.7333],[.1696,.2573],[.5052,-.2264],[.6017,-.8848],[.4843,-.3827],[-.5512,-.8065],[-.3452,-.9125],[.2187,-.7683],[.2192,-.9577],[-.0158,-.9747],[.3082,.7058],[.6324,-.4366],[.1896,.9273],[.0846,-.4021],[.395,-.5021],[.0358,.5703],[.0981,.7333],[.4426,-.6858],[-.5326,-.9157],[.4316,-.2252],[.4495,.0694],[-.3103,-.1457],[-.2939,-.7467],[.2244,.9311],[.2151,-.8265],[-.514,-.7334],[.6067,-.2757],[.5522,-.2386],[.593,-.1343],[.2661,.1122],[.0113,-.3455],[-.1925,-.0188],[-.1718,-.2372],[-.3836,-.1992],[.041,-.4141],[.1455,-.7824],[.2198,-.7889],[-.2061,.6616],[-.2511,-.7635],[.4726,-.3748],[-.2545,-.2629],[-.3103,-.1704],[.5764,-.5799],[-.6001,-.9112],[.5126,-.1787],[-.3346,-.2947],[.2701,-.689],[-.0946,-.8992],[-.535,-.7659],[-.4856,-.2398],[.266,-.6214],[-.3376,-.3713],[.4738,-.7626],[.2782,.7283],[-.3527,-.7679],[.1676,-.9193],[-.0082,-.9974],[-.0559,-.9968],[.0944,-.288],[-.5179,-.7781],[-.2561,-.1046],[-.2483,-.2274],[.1287,.6341],[.2836,-.4681],[.5018,-.9465],[.3639,-.0244],[.2146,.7644],[.0964,-.5179],[.2491,.712],[.2293,.926],[.179,-.953],[-.6296,-.8815],[-.3046,-.8405],[-.1194,.0049],[-.1636,-.8973],[.4339,-.0831],[.5926,-.2333],[-.393,-.7658],[.1553,-.8793],[-.3436,-.8965],[-.3314,-.2797],[-.0487,.8645],[.4196,-.1605],[.4585,-.3033],[-.0725,.9178],[-.0325,-.9167],[-.421,-.7011],[-.2581,-.0061],[5e-4,-.0838],[.4864,-.4384],[-.5903,-.8896],[-.05,-.3023],[.2314,-.6141],[-.4703,-.8647],[-.0226,-.9298],[-.0869,.9732],[.0292,.6039],[-.0246,-.1849],[.0898,.7681],[.3067,-.9167],[.5226,-.3099],[.2161,.8952],[-.329,-.3081],[-.0402,.0542],[.5304,-.5818],[-.4842,-.7484],[-.1274,-.9012],[-.0378,.6725],[-.2276,-.8092],[.3801,.0764],[-.1294,-.3009],[.3107,-.7014],[.0476,.5403],[.5521,-.3629],[.0885,-.8559],[.0852,-.4931],[.065,.7995],[.5072,-.3599],[-.2012,-.778],[-.2041,-.9479],[-.0885,.9811],[-.1232,-.2218],[-.447,-.6492],[-.1859,-.8236],[-.3273,-.3781],[.2753,.6926],[.0926,-.3765],[.5545,-.0994],[.4449,.0894],[-.2347,-.1963],[-.2331,-.1091],[.2496,.7466],[-.0172,-.4905],[.0397,-.7911],[.1399,.8839],[.3872,-.0102],[.144,.8525],[.3313,.183],[-.0891,-.2307],[.5081,.0155],[.1609,.663],[-.6339,-.911],[-4e-4,.6648],[.4578,-.2155],[-.4525,-.941],[.5291,-.3299],[-.1156,-.2715],[-.2209,-.2362],[.1851,.1874],[-.1096,.7282],[-.0389,.8131],[-.3292,-.782],[.1589,-.3705],[.2194,-.8202],[.2074,.9277],[-.1115,.0177],[-.0257,.7246],[.339,.0442],[.309,-.6961],[.0464,-.8484],[.4684,-.86],[.1928,.8365],[-.5823,-.9712],[.614,-.1903],[.2568,-.6732],[-.384,-.8107],[.0238,.7362],[-.2232,-.246],[.6157,-.8477],[.4371,-.3216],[.4622,-.075],[.0426,.0055],[.1759,.1944],[-.575,-.6714],[.5023,-.9019],[.0657,.2638],[-.3414,-.9072],[-.4512,-.3081],[.1108,.266],[.3757,-.0357],[-.0809,.7347],[-.459,-.3181],[-.0448,.7292],[-.5872,-.7076],[.0209,-.4655],[.0924,-.9313],[.1332,-.8958],[.2049,-.6226],[.0372,.2723],[-.1491,-.9291],[.3947,-.9029],[.2465,-.6528],[.1064,-.5129],[-.5126,-.262],[-.4,-.6841],[.3666,.0906],[.2292,.7619],[-.0919,-.992],[-.3011,-.0637],[-.5426,-.6778],[.185,-.5411],[.2239,.6699],[.6008,-.4959],[.6051,-.2672],[-.4855,-.6121],[.4498,-.1837],[.3115,-.912],[.0291,-.3009],[-.4554,-.9239],[.0933,-.4767],[-.6136,-.9244],[-.1358,-.3078],[-.1347,-.837],[.0606,.7468],[.2851,-.5315],[-.0305,-.0652],[-.5144,-.2635],[-.1706,-.3139],[.6,-.8137],[-.4445,-.1904],[.315,.1054],[-.3079,-.9084],[-.0951,-.991],[.3351,.6835],[.4739,-.2275],[.0832,.8115],[-.1283,-.0579],[.1882,.8015],[-.0398,.6591],[.1971,.8422],[-.0197,.6595],[.2859,.1154],[.4777,-.0611],[.3529,.6727],[.4842,-.0784],[-.3974,-.8771],[-.3057,-.7357],[.1089,.8198],[-.2785,-.1073],[-.1741,-.9386],[-.4466,-.3279],[-.1355,.0659],[.4175,-.6693],[.3027,.698],[.6184,-.2024],[-.0035,-.0709],[-.123,-.9082],[.2508,.1647],[.5664,-.8167],[.0865,.6592],[.5261,-.1035],[-.1144,.0653],[.0992,-.7771],[.4101,-.8343],[-.4379,-.8525],[-.1075,.054],[.6094,-.314],[.5017,.0287],[.4479,-.4036],[.0156,-.3316],[-.4632,-.954],[-.0446,-.8518],[-.0083,-.4393],[-.1348,-.9872],[.1518,-.9742],[-.1854,.6831],[-.208,-.8239],[.3933,-.9083],[.3507,.664],[-.5543,-.9994],[.0877,-.8194],[.4103,-.4934],[.2693,.1718],[.2256,-.6784],[.3531,-.78],[.0982,.8054],[.2533,.1372],[.2451,-.8819],[-.4678,-.2544],[.2657,.2126],[.0874,.6505],[.5707,-.3019],[.5522,-.9336],[-.1894,-.9163],[.191,-.816],[.4605,-.7452],[-.6118,-.8406],[-.2071,-.9097],[-.2327,-.9489],[.1437,-.7642],[.0082,-.0048],[-.3825,-.2391],[.3361,.1105],[.454,-.446],[.4832,-.0244],[.0469,-.3558],[.3413,-.746],[.1136,-.4485],[.5165,-.4112],[-.5156,-.9344],[.1613,.2165],[.316,-.8985],[.1547,-.6703],[.456,-.6829],[-.0325,.6981],[.3204,-.7344],[.4562,.0424],[.2598,-.9004],[-.0163,-.012],[.3401,.1793],[.4948,-.2297],[.6013,-.2235],[-.3003,-.9406],[.473,-.5338],[-.0501,.8611],[.2961,.2],[.4263,.0114],[-.3558,-.2679],[-.2808,-.2557],[.0538,-.384],[-.1433,-.324],[.3697,-.8217],[.0826,.7455],[.3631,.082],[.0167,-.0268],[-.085,.73],[.198,.9234],[-.1715,-.1094],[.5469,-.3588],[.2979,-.7133],[.342,-.5465],[.0771,-.466],[.5248,-.5134],[.4966,-.5371],[.1954,-.7444],[-.0692,-.2621],[-.1716,-.8963],[-.6371,-.8947],[.0133,-.9963],[.404,.0681],[.4887,-.3099],[.3939,-.5028],[.0885,.8289],[.1754,-.5375],[-.4437,-.3256],[.4768,-.2137],[.2616,-.6521],[.5423,-.2829],[.5872,-.2652],[-.545,-.7539],[.5848,-.1138],[.5406,-.6705],[.5714,-.0924],[.2655,.7375],[.6049,-.8122],[.0728,.6427],[.0053,-.201],[-.0511,-.0037],[-.3255,-.8545],[.6119,-.2887],[.5458,-.3824],[.0634,-.581],[.4342,-.2284],[.3718,-.8055],[.3328,-.8907],[.4317,-.1455],[-.2364,-.96],[.3693,.1424],[-.4871,-.2527],[.1022,-.6166],[.4047,-.4844],[.348,.1704],[.2647,-.9399],[.1925,-.5171],[.1256,-.8752],[.4251,-.4277],[-.5255,-.6186],[-.2619,-.9548],[.3555,-.7173],[-.0517,-.8303],[.5135,-.7983],[-.1031,-.8739],[-.1637,-.0028],[.2194,.884],[-.035,-.4743],[-.5983,-.9675],[.1769,-.3818],[-.1313,-.2393],[.521,-.0692],[-.3472,-.152],[-.4351,-.6938],[-.2288,-.1599],[-.0992,-.0994],[.0628,-.3528],[-.3049,-.8677],[-.0609,-.3225],[.0471,-.5641],[.5999,-.1551],[.5352,-.7459],[.2475,.6594],[.2045,-.6537],[.547,-.9009],[-.1469,-.0317],[-.038,.662],[-.5357,-.654],[-.2133,-.3037],[-.2446,.0077],[-.1418,-.9903],[-.5925,-.8699],[-.3033,-.1841],[.2246,-.827],[.0215,-.8116],[-.0531,-.1487],[-.2023,.0456],[.1552,.926],[-.0398,-.8005],[.0934,.0112],[.0356,.7209],[.6174,-.4775],[-.4787,-.9254],[.3711,-.0266],[-.3129,-.3872],[-.0737,-.9454],[-.5546,-.7257],[.576,-.1011],[-.4501,-.6709],[-.0215,.8153],[.1783,-.5134],[-.1349,-.3403],[-.0391,.8281],[-.6271,-.9147],[-.4854,-.287],[.3955,.0775],[-.0062,-.9405],[-.0147,.8678],[.5877,-.3183],[-.0121,-.9907],[.3883,-.559],[.1277,-.4597],[.1879,-.5525],[.3777,.1457],[.1516,-.6679],[-.5004,-.6542],[.2893,-.6398],[.3653,.1542],[-.4397,-.1835],[-.3965,-.3415],[-.0454,-.4595],[.1907,.8127],[-.0261,-.1085],[.1769,-.9294],[-.2112,-.1802],[-.3157,-.0901],[-.0936,-.7982],[-.0101,-.4751],[-.0564,-.9999],[.5423,-.7526],[.2625,.1175],[-.0653,.8997],[.2648,-.8787],[.2581,.2174],[.0853,.8212],[.1544,.6717],[.3601,.1593],[.5426,-.2913],[.4908,-.856],[.6314,-.8559],[-.2072,-.8582],[.0936,.2471],[.2158,.9044],[-.4676,-.2179],[-.0027,.9309],[.161,-.5359],[.5914,-.2102],[.0951,-.2884],[-.4958,-.2441],[-.2865,-.3124],[.5333,-.6318],[-.0959,-.9948],[.5367,-.7054],[.4558,-.3227],[-.3942,-.2674],[.1302,.7836],[.3645,-.5438],[-.0787,.7355],[.5426,-.5853],[.0031,.0636],[-.5889,-.6998],[-.1806,-.1259],[-.0346,-.22],[-.0679,.6704],[.0889,-.7834],[.4097,-.9236],[.0059,.0054],[-.4411,-.6778],[.0653,.4923],[-.1916,-.7806],[-.082,-.1052],[.4346,-.3609],[-.079,-.8285],[.1617,.7914],[.1056,-.4425],[.0532,.0639],[.0907,-.2838],[.3834,.1107],[-.3076,-.8378],[.6193,-.4376],[.2791,-.4623],[-.0216,-.2632],[.3695,.1542],[.1722,.7503],[.1674,.2551],[.6323,-.8392],[.1309,.915],[.0748,.0396],[-.3184,-.0634],[-.0121,.7986],[.0496,-.3425],[-.1982,-.1678],[-.3092,-.7983],[-.1474,.7045],[.3667,-.7298],[.1271,-.8656],[.2143,-.6287],[-.0566,.9642],[.0144,-.9399],[.3006,-.4821],[.1838,-.7651],[.4975,-.4416],[.1308,-.3532],[.4214,-.9044],[.1376,.627],[.0347,.6252],[.1099,.2363],[-.2185,-.9733],[.2949,.1012],[.5526,-.851],[-.2996,-.0746],[.3378,-.7711],[.4446,-.3076],[-.1163,.7308],[.4501,-.0515],[-.0144,.8397],[-.2038,-.8518],[.6081,-.5175],[.455,-.8871],[.4844,-.2781],[.56,-.3177],[.3099,-.7185],[-.0738,.7518],[.5713,-.4502],[.2749,-.6133],[-.4444,-.2175],[.0643,.2678],[.0224,.8869],[.1729,-.8936],[-.2281,-.7678],[-.1422,.0707],[.5239,-.0811],[-.0739,.9365],[.0328,-.5182],[.5973,-.5811],[.4344,-.0643],[.124,-.3959],[-.1931,-.0088],[.3338,.1784],[-.3474,-.2458],[-.4477,-.3001],[-.2835,-.8687],[-.1672,-.3055],[-.1107,-.1341],[.3474,.01],[.5189,-.9678],[-.1087,-.0944],[-.0372,-.9991],[.1432,-.6076],[-.3579,-.1968],[.6337,-.3169],[.5426,-.2148],[.4052,-.4662],[-.2846,-.8917],[.2583,-.7812],[-.5847,-.9077],[.3562,-.8892],[-.3046,-.7431],[-.316,-.8376],[.0648,.2607],[.4336,-.0721],[.4778,-.1711],[.4346,-.4743],[-.1164,.7307],[-.5449,-.6456],[-.2793,-.2418],[.1136,.021],[.1145,.0232],[.1035,.0363],[-.0514,-.129],[.1659,-.7622],[.3185,-.6942],[.0695,-.0176],[-.3099,-.0537],[-.4948,-.7522],[.0603,-.2964],[-.2826,-.0855],[-.4447,-.2767],[.2248,-.955],[-.2542,-.9571],[-.4755,-.6924],[.3189,-.7679],[.3517,-.5826],[-.068,-.4454],[-.6167,-.9114],[.3947,-.0793],[.1119,.8656],[.4188,-.8927],[.3322,-.5136],[-.5705,-.9951],[-.4903,-.2901],[-.0754,-.8577],[-.0861,.0153],[.1922,-.8493],[.115,.7833],[-.0051,-.2172],[.3469,.1465],[.4272,-.4804],[-.0598,.9246],[.0225,.6355],[-.0475,.9642],[.2371,-.5993],[-.216,-.1354],[.0406,-.3243],[-.173,-.791],[.4426,.0912],[.6299,-.4357],[.1779,-.8049],[-.0649,.0647],[.2991,.0817],[.6361,-.3348],[-.1917,-.3051],[-.1051,-.4092],[.4833,.0174],[.0457,-.2873],[.5634,-.066],[.1963,.2443],[-.1197,-.1657],[.0135,.8639],[.6056,-.23],[.386,.1452],[.2282,.6696],[-.0813,-.9579],[.338,.0794],[-.5447,-.9212],[-.3847,-.1302],[.3184,.0549],[-.357,-.2979],[-.0231,-.3678],[.362,.664],[.5205,-.0555],[.5351,-.2063],[.5215,-.3829],[-.2717,-.0975],[.123,-.8049],[.439,-.2779],[-.0549,-.9319],[-.1804,-.1928],[-.2952,-.0412],[.459,-.0752],[-.5967,-.9293],[.0577,.8208],[-.2435,-.1725],[.5447,-.6607],[.4081,-.0335],[.0087,-.8188],[.0229,-.0381],[-.2399,-.9607],[-.1089,.7337],[.039,-.9239],[.3491,-.6845],[.0723,.7646],[.162,.7112],[-.0806,-.1816],[.1421,-.4699],[.2579,.6725],[.0359,-.2365],[.2785,.1873],[.0891,.5026],[-.042,.7842],[.2289,-.9534],[.4355,-.3725],[.5722,-.086],[.4501,.0381],[.1422,-.9793],[.1742,.9451],[-.335,-.7529],[.0737,-.4019],[.1724,.1996],[.2402,-.6565],[-.0814,-.9],[-.3054,-.9345],[.2591,.122],[-.3265,-.7279],[.2037,.9633],[.4546,-.2857],[.4939,-.9391],[.4018,-.0685],[-.1804,.6608],[-.5411,-.9021],[.2759,-.458],[.0712,.0314],[.1916,.723],[-.2407,-.1257],[-.0387,-.104],[.583,-.569],[.1237,-.348],[.2851,-.5147],[-.5664,-.6663],[.3351,-.5341],[-.395,-.861],[.4315,-.467],[.1847,.7571],[.4234,-.8739],[.6372,-.34],[.0714,.8781],[.5664,-.5934],[.2344,-.4417],[-.489,-.2729],[.55,-.4781],[-.5034,-.8894],[.2969,-.8335],[.0905,.0477],[.2201,.7168],[.3545,.1712],[-.2642,-.2235],[-.0411,-.998],[.4236,-.0059],[-.6224,-.8574],[.0349,-.2281],[-.3388,-.1138],[.2454,.6708],[-.3653,-.1124],[-.0443,-.1596],[.1843,-.8023],[.4922,-.0347],[-.3649,-.9053],[-.1826,-.0498],[.2434,-.7489],[-.0595,-.2768],[.1012,-.3901],[-.5729,-.8216],[.432,-.7896],[.1296,-.562],[-.0492,-.4684],[.4983,-.4154],[.4128,.0873],[-.1936,-.7759],[.2189,-.4703],[-.3535,-.2986],[-.0892,.66],[-.1655,-.1807],[.1854,.1885],[.0723,.4902],[.1719,-.5087],[.0325,-.2983],[.586,-.2359],[.6143,-.1834],[-.0098,.8161],[.2078,.8744],[.0611,-.8623],[.0577,-.9048],[.238,.9417],[-.3715,-.399],[-.3833,-.6994],[.0285,-.7982],[.1678,-.7894],[.1754,-.5441],[-.0781,.756],[.3813,-.6893],[.2543,-.5471],[.512,.0108],[.5979,-.5749],[.2511,-.6599],[-.5,-.8188],[.0839,.6112],[-.046,-.2159],[-.0644,-.3264],[.3972,-.4947],[.1684,.6686],[-.4858,-.8975],[-.0655,.8792],[.0618,-.9465],[.258,.7459],[-.084,-.1907],[.2405,.955],[-.0092,.939],[-.3489,-.1318],[.4025,.0806],[.5302,-.6006],[-.556,-.745],[.1071,.695],[.0634,-.4973],[-.2347,-.3118],[.5585,-.1019],[.5223,-.5622],[.5099,-.7362],[.4629,-.6847],[.0457,-.4379],[-.1315,-.961],[.5568,-.1715],[-.0614,.7757],[-.2675,-.0136],[.5205,-.9653],[-.1078,-.9925],[.1154,.265],[-.5749,-.6686],[-.2083,-.9691],[-.1942,-.8717],[-.0047,.9246],[.5802,-.6225],[-.2103,-.9716],[.6224,-.8616],[-.2358,-.2116],[.5849,-.897],[-.1303,-.8861],[-.4997,-.2827],[-.4375,-.7727],[.0636,.7057],[.2116,-.733],[.3939,-.6637],[-.2639,-.0115],[.5835,-.3478],[-.425,-.866],[.476,.0628],[-.0284,-.1805],[-.4281,-.6853],[.5479,-.0363],[-.1234,-.7964],[.2334,-.9371],[-.572,-.9312],[-.2863,-.7519],[.084,-.3646],[.5317,-.9527],[.2118,-.6991],[-.0184,-.9975],[.0357,-.9082],[-.5837,-.6879],[.0724,.4738],[.4838,-.1725],[-.0212,-.9988],[-.4618,-.8684],[.5934,-.879],[.418,-.0493],[.0276,.9082],[.4143,.0822],[.0837,-.0036],[-.1344,-.2213],[.0899,.0017],[-.1632,-.3209],[-.4417,-.3168],[.6225,-.4972],[.4205,.0793],[-.2727,-.2085],[-.1829,.0486],[-.0454,-.2826],[-.409,-.8691],[.1261,.2431],[.5055,-.0594],[.1098,.7164],[.4028,-.1045],[.3905,.1345],[-.1771,-.1836],[-.24,-.9224],[-.4569,-.9542],[.459,-.8851],[.035,.8196],[.0061,-.9523],[-.0368,-.972],[-.1823,-.136],[-.2669,-.2661],[.3264,.1321],[-.1613,-.1311],[-.3345,-.0925],[.6375,-.3554],[-.2734,-.2628],[.2004,.6679],[.3784,-.7676],[.461,-.503],[-.0768,.0098],[.3581,.0183],[.4979,-.8835],[.0574,.2655],[.1654,-.7956],[.0561,.0711],[.3665,-.7572],[.0249,-.3451],[-.1513,-.2394],[.1772,-.8461],[-.0791,-.2224],[.073,-.8053],[.1138,.7926],[.3043,.6931],[.0841,.7803],[.2947,-.7398],[.3576,.0869],[.2857,.1888],[.0951,-.6115],[-.2385,-.1625],[-.1327,.0683],[.1965,-.7937],[-.0607,.0703],[.6181,-.2112],[.3886,-.0669],[-.3039,-.3798],[.4889,-.4319],[-.172,-.272],[.3326,.1781],[-.0614,-.1403],[.0251,.6109],[-.3599,-.9068],[.053,.7339],[-.068,-.8958],[.514,-.3582],[.5567,-.79],[-.2161,-.955],[.1085,-.7769],[-.0373,-.8011],[.1522,-.6207],[-.0655,.7003],[.5465,-.8372],[-.6086,-.8348],[-.0374,.7459],[.265,-.4953],[.0492,-.53],[-.0241,.7914],[.4288,-.6284],[.1873,.8304],[-.2465,-.316],[.4423,-.4517],[.4417,-.7556],[-.0686,-.8635],[.1689,.7867],[.1335,-.9806],[-.417,-.3169],[.6271,-.4665],[-.0643,-.4113],[.2674,-.9359],[-.0703,.6725],[.3734,.1498],[-.1415,-.3753],[-.3782,-.7995],[.607,-.8171],[-.0924,.9648],[.0101,.856],[-.0317,.0683],[.0587,.6353],[.372,.0254],[-.355,-.1238],[-.233,-.7879],[-.2404,-.9212],[-.6268,-.9429],[-.0657,-.3706],[.083,-.5973],[.0241,.6231],[.3528,.0033],[-.2417,-.2979],[-.5133,-.7277],[.2503,.2248],[.2441,.9883],[.2179,.7682],[-.0321,-.3863],[.5807,-.4483],[.4282,-.1491],[.174,-.9422],[.1594,-.9666],[.1621,.2018],[-.0755,.9788],[.5555,-.0748],[-.1677,-.867],[-.0132,-.8441],[.13,-.772],[-.2778,-.8717],[-.4241,-.27],[.5817,-.5254],[-.3978,-.6899],[-.2684,-.7644],[.1216,-.3982],[-.117,-.9782],[.4778,-.8273],[-.0781,-.0789],[.2474,-.4389],[.5093,-.5614],[-.0571,-.2463],[.0135,.8938],[.3431,-.8693],[-.0395,-.9333],[.099,-.4058],[.2007,-.743],[-.0941,-.0685],[-.1524,-.9845],[.096,.243],[-.0575,.6597],[.0529,.0434],[.0433,.0945],[-.193,-.9345],[.0799,-.0094],[-.0227,-.1763],[.1275,.2476],[-.5923,-.688],[-.1185,.066],[-.2104,.6618],[-.2738,-.8468],[.2375,-.6135],[-.2733,-.1128],[.1643,.2315],[-.3815,-.2971],[-.1507,-.1609],[-.2306,-.1165],[-.2957,-.0587],[-.0062,.8527],[-.0606,-.3613],[.0158,-.2111],[-.5094,-.7602],[-.16,-.9832],[.355,-.5939],[-.1951,-.8247],[.4256,-.5972],[-.1543,.6845],[.0048,-.2305],[.1584,-.5575],[-.0915,-.4223],[.4387,-.9544],[-.1842,-.0071],[.5297,-.798],[.4567,-.1599],[-.1898,-.9319],[.1521,-.5717],[.1763,.2528],[-.3484,-.1921],[.178,-.399],[-.2302,.0199],[.2647,.2189],[.3273,-.5093],[-.6266,-.8669],[-.2214,-.0112],[.6191,-.4806],[.0499,-.5662],[-.6148,-.8666],[.0483,-.8166],[-.0463,-.3853],[.0336,.851],[.2469,-.6055],[.5701,-.859],[.0062,-.7976],[-.0066,-.3783],[.5365,-.3366],[-.2605,-.1624],[-.5711,-.9602],[-.4996,-.9785],[-.1631,-.2441],[-.0676,-.8316],[.174,.8697],[.0295,.0346],[-.3632,-.1988],[-.0051,-.9202],[-.2521,-.0194],[.5275,-.2677],[-.0913,.7554],[.5128,-.2555],[.0092,-.4091],[-.3413,-.1345],[-.2323,-.9412],[.4094,-.4591],[.0241,-.4162],[.3581,-.5965],[-.2401,-.8069],[.1162,.6311],[-.0926,-.1707],[.559,-.8125],[.2582,.149],[.4253,-.4077],[.0551,.8109],[-.0552,.871],[-.2854,-.9107],[.3866,-.0734],[-.4217,-.8708],[-.0277,-.4181],[.5374,-.8509],[.1991,-.476],[.6096,-.2744],[-.0748,-.4172],[-.0394,.0338],[.245,-.813],[.0699,.2708],[.3055,.0653],[.1224,-.7914],[-.5566,-.6834],[-.1502,-.1956],[-.047,.9582],[-.2575,-.955],[.4925,-.9947],[.1716,.2494],[-.2666,-.014],[.282,-.872],[-.1093,-.2315],[.5679,-.9016],[.3556,-.5614],[.1487,-.7646],[.3929,-.7799],[-.2665,-.843],[-.3913,-.7723],[-.3339,-.8533],[.1882,-.7507],[.0176,.7987],[.1321,-.3285],[-.1414,-.0082],[-.6053,-.9739],[.0994,.6794],[.1083,.5614],[.3226,.1878],[.0356,-.7956],[.1099,.7534],[.2906,.2057],[-.0039,.888],[-.0469,-.962],[.1392,.261],[.1243,.5989],[.3248,-.6262],[.5054,-.9796],[.3343,.1804],[-.5259,-.8477],[.23,-.9471],[.0134,.6968],[.3186,-.79],[.3564,.0902],[.423,.0386],[-.0557,-.1048],[.3173,.6916],[.2421,.227],[.1068,.898],[-.1462,-.368],[-.1299,-.7936],[-.3696,-.7456],[.4894,-.0743],[-.4618,-.8346],[.1908,-.3802],[-.0309,-.997],[-.3973,-.3745],[.0087,.7818],[.52,-.5593],[-.087,-.9367],[-.072,-.0304],[.4846,.0531],[-.0383,.7751],[-.2407,-.964],[-.1492,.6827],[.2256,.1518],[.0664,-.9006],[.1806,.9414],[.582,-.9022],[-.1728,-.3436],[.0457,.0873],[.427,-.8508],[.1052,-.349],[-.102,-.1712],[.6241,-.2246],[.3164,.1926],[-.2777,-.1428],[-.5062,-.7519],[-.0677,-.1445],[-.0313,-.9541],[.5699,-.3347],[.5741,-.1141],[-.258,-.0323],[.1885,-.4309],[-.0681,-.0289],[.0415,.6109],[.4325,-.2346],[.6284,-.4755],[.3242,.6943],[-.4852,-.6762],[.0638,.0695],[.42,-.9369],[-.4501,-.9189],[.0126,-.9457],[-.0534,.6739],[-.6188,-.9419],[-.5795,-.9086],[-.2607,-.1992],[-.3093,-.753],[.0774,.5071],[-.0312,.6671],[.1383,-.8862],[.4789,-.7525],[.5183,-.1558],[-.3801,-.7262],[.5268,-.0478],[.0601,-.5709],[.0668,-.7866],[.0723,.8735],[-.4799,-.652],[.5847,-.6077],[.0424,.2703],[.4807,-.5751],[.1922,-.7041],[-.3799,-.1862],[.2478,.9869],[-.4481,-.2725],[-.586,-.8851],[-.1984,-.3135],[.2113,-.547],[-.1671,.0681],[-.007,.0262],[-.1734,-.9242],[.405,.0361],[.5444,-.6211],[.4468,-.2035],[.5855,-.1197],[-.1551,-.9043],[.1557,-.4313],[-.225,-.1973],[-.5409,-.7432],[.6251,-.8384],[.0711,-.2657],[.1211,.2331],[.5919,-.8967],[.4565,-.6715],[.3731,-.0432],[.522,-.1072],[.1537,-.4086],[-.5131,-.7896],[.1585,.813],[-.6157,-.9494],[.4704,-.0834],[-.0196,-.2207],[-.0419,.8361],[.6367,-.375],[.4843,-.4427],[-.6226,-.9355],[.5232,0],[-.011,.9296],[.208,.9694],[-.1589,-.0597],[.4178,-.4199],[.1564,-.6567],[.0951,.8698],[.2016,.8571],[.4179,.103],[.293,-.5145],[-.2015,.6707],[-.3627,-.2378],[.4266,-.6957],[.5501,-.5607],[-.272,-.9501],[.2131,-.9146],[-.3611,-.316],[-.1044,-.3417],[-.0689,-.375],[.4766,-.3283],[.4074,-.8048],[.3024,.1847],[-.0808,-.9977],[-.0824,-.3423],[.0646,-.0255],[.1476,-.6618],[.5335,-.7101],[-.3047,-.2406],[.44,-.9506],[.022,-.7959],[.4028,-.4866],[-.4827,-.6216],[.4108,-.6236],[.0674,.4768],[-.0757,-.2766],[.6049,-.5644],[-.232,-.8905],[-.5036,-.8084],[.0454,-.8621],[-.2884,-.7806],[.5666,-.2118],[-.0282,-.1128],[.5434,-.5909],[-.3404,-.1718],[-.0396,-.4059],[.397,-.7109],[-.4489,-.9345],[.0881,-.9489],[-.1989,.6698],[.0582,.6604],[.3869,-.8662],[-.3509,-.8613],[-.0877,-.4295],[.0125,.764],[.593,-.5179],[-.579,-.8591],[.2951,-.8721],[.5933,-.8587],[-.0024,-.9058],[.3156,.0522],[-.0861,.6606],[-.1434,-.137],[.4763,-.518],[.1555,-.765],[-.4363,-.277],[.0488,-.2768],[.3812,-.595],[-.3705,-.3879],[.5772,-.6258],[.0922,-.987],[.1558,-.3489],[.0879,-.783],[.5572,-.1334],[.0591,.2703],[-.1413,-.1605],[.5676,-.8156],[-.5093,-.8063],[.3995,-.911],[.2715,.7145],[.2632,-.5504],[.4909,-.9152],[.2066,-.7392],[-.4087,-.3536],[-.412,-.8789],[.3137,-.5463],[-.1217,-.3937],[-.1793,-.2158],[.5785,-.3282],[.0814,-.9447],[.4227,-.1707],[-.2249,-.8619],[-.1076,-.7953],[-.5499,-.8633],[-.6063,-.9304],[.4255,-.1849],[.1277,.6177],[.3964,-.6591],[.2536,-.7585],[.1194,-.9832],[.2204,.9797],[.4892,.0431],[.5488,-.7586],[.0613,-.2809],[-.4204,-.166],[.0521,.8905],[-.1773,-.9541],[.3905,-.7923],[.6093,-.5386],[.4574,.0605],[-.0843,.0645],[-.316,-.2273],[.2263,-.4411],[-.464,-.2255],[.4352,-.3522],[-.5455,-.6889],[.2624,-.4446],[-.3499,-.2919],[-.2085,-.0593],[.0682,.7784],[.4816,-.6376],[.4621,.0758],[-.5476,-.9832],[-.1391,-.3451],[.5598,-.6475],[.1234,-.4095],[-.2068,-.2748],[.3791,.1279],[-.2558,-.9026],[.1973,-.6777],[.2033,-.6569],[-.1801,-.2723],[.3064,-.7089],[.1305,-.4945],[.5827,-.6151],[.0746,-.3827],[-.4006,-.3678],[.1156,.6031],[-.1496,-.2534],[.4327,-.2482],[-.4971,-.7934],[-.1116,-.3987],[-.2779,-.3423],[-.0724,-.9825],[.5398,-.1574],[.1224,.6013],[.5592,-.7681],[-.0136,.0869],[-.1937,-.9737],[-.0246,-.8456],[.1073,.0139],[.3597,-.8663],[-.3315,-.0759],[-.0478,-.8167],[-.0481,-.1515],[.25,1],[-.0608,.8647],[.2205,.9697],[.2171,.6635],[.4448,.0291],[.1713,-.6367],[-.149,-.0693],[.5268,-.7703],[-.2778,-.9457],[-.0405,-.3576],[-.3051,-.0493],[-.3272,-.0731],[-.1613,-.1065],[.1323,.6413],[-.0306,-.8311],[-.2874,-.8044],[.4836,-.9991],[.5502,-.0454],[.5565,-.8661],[.1929,-.4218],[.2242,.2196],[.3732,.1248],[.513,-.6521],[.5594,-.1253],[.5682,-.1409],[.001,-.08],[-.4434,-.911],[.1875,-.5187],[-.0922,-.9111],[.4501,-.9142],[.451,-.1539],[.5078,-.712],[.2274,.7449],[-.0843,-.9815],[.1108,-.806],[.1639,.9315],[.4136,-.9294],[.2835,-.497],[.1788,.6902],[-.5642,-.886],[-.0569,-.3722],[.6292,-.2972],[-.4847,-.7577],[.3089,-.7732],[-.3764,-.7018],[-.1227,.0105],[-.3958,-.3266],[.565,-.7755],[.3648,-.7753],[.2447,-.7925],[-.4371,-.2391],[-.0381,.8079],[.551,-.5958],[.1886,-.5066],[.0463,-.3431],[.3376,.6787],[-.3072,-.2807],[.1875,-.6079],[.0875,.8778],[.0356,-.3578],[.3708,-.8872],[.4954,.034],[-.1139,-.0826],[.0345,-1],[-.0627,.7721],[.5739,-.4868],[.1561,.9302],[-.0987,-.3701],[.195,-.7475],[.167,-.754],[.4367,-.1043],[.5569,-.8759],[.1219,.2274],[.1157,-.3192],[.6299,-.4536],[-.2219,-.2748],[.4291,-.2076],[.4659,-.8706],[-.2203,-.1321],[.099,.5196],[-.0258,-.8006],[.1063,.5376],[-.1474,-.115],[-.0629,.8823],[.533,-.5903],[-.2989,-.094],[.1038,-.7774],[.1243,-.4226],[.5044,-.1295],[.2669,.7081],[-.5624,-.9804],[.5787,-.3602],[.5277,-.6974],[.2431,.6615],[.6151,-.5375],[-.0061,.7779],[.2365,-.9351],[.4745,-.9882],[.5065,-.7969],[.2755,.6598],[.0733,.7577],[.2266,.1671],[-.073,.6646],[-.0883,-.9867],[-.5478,-.7566],[.4383,-.7736],[.3791,-.0122],[.5723,-.9114],[-.0468,-.1309],[-.3322,-.9202],[.2119,-.8173],[-.3461,-.803],[-.4852,-.6316],[.5319,-.7979],[.2157,.9522],[-.0189,-.3751],[.1062,-.3872],[.0664,.5047],[.3119,-.5985],[-.1651,.6648],[-.4818,-.2445],[-.3417,-.2594],[-.1096,-.8585],[-.0332,-.1688],[.2315,.9366],[.4945,-.6352],[.5301,-.5773],[-.2306,-.9578],[-.4656,-.2579],[.1292,-.8061],[-.2508,-.7665],[-.2896,-.9448],[-.3348,-.9041],[.5429,-.6323],[-.1683,-.798],[.0918,.2678],[-.4279,-.345],[.0395,-.3117],[.5549,-.2367],[-.019,-.1824],[.5935,-.5808],[.0253,-.2622],[-.1966,-.2875],[.1066,.8959],[-.5126,-.6128],[.2851,-.5603],[.077,-.815],[.4038,-.4861],[-.3016,-.3753],[.3506,-.6437],[-.4709,-.3107],[-.0694,-.381],[.0572,.5529],[-.5187,-.89],[-.622,-.861],[.5023,-.3666],[.472,-.0965],[-.0964,-.1839],[.4155,.1144],[.0239,-.3204],[-.63,-.9237],[.4852,-1],[.2569,-.8549],[.4454,-.2381],[.0172,.6523],[-.1633,-.9362],[-.2891,-.946],[-.4594,-.9593],[-.4213,-.8404],[.5217,-.8154],[-.3438,-.0895],[-.6226,-.95],[-.3986,-.1499],[.5505,-.0595],[.1653,-.6741],[.2116,-.8016],[.0704,-.9144],[-.4641,-.2658],[-.0148,-.8795],[.3604,-.8878],[.2361,-.8593],[-.453,-.2005],[.3382,.167],[.6351,-.3949],[.2545,-.4769],[.6337,-.3873],[-.3114,-.7519],[-.2151,-.0042],[.0784,.2489],[.0197,.0103],[.6033,-.282],[.022,.0687],[-.0955,-.8166],[.5347,-.6514],[.5761,-.8072],[.1108,.5656],[.3426,-.524],[-.0524,-.4658],[-.5753,-.8442],[.0962,-.2862],[.1174,-.3711],[.0612,-.3956],[.2132,-.9396],[.1188,-.8995],[.153,-.935],[-.1816,-.1831],[-.5811,-.8209],[.4347,-.2454],[.5639,-.8903],[.263,-.4673],[-.1822,.6641],[.0353,-.9963],[.1932,.7874],[-.1345,-.8257],[-.3119,-.0688],[.2903,-.4723],[-.427,-.8717],[.6084,-.4967],[-.1849,-.921],[.4246,.0697],[-.3011,-.2223],[.0481,-.933],[.3962,-.646],[.5581,-.5479],[-.55,-.7497],[.6335,-.3044],[.3864,-.7639],[-.5611,-.8177],[.1252,-.7872],[.5534,-.9313],[-.0629,.9768],[.6018,-.8513],[-.068,-.7999],[-.6011,-.9793],[.0586,.7498],[-.0211,-.311],[-.4493,-.2235],[.5609,-.571],[.2315,.9611],[.4967,-.1948],[.2324,.9863],[-.1077,.0183],[.3821,-.7741],[.4345,-.6139],[.2104,-.8451],[.1131,-.6296],[-.1515,-.7905],[.1946,.6922],[.5732,-.0876],[.0791,-.2744],[-.0054,-.9997],[.1741,.2528],[.326,.6844],[-.0072,-.488],[.6347,-.3566],[.0549,-.3795],[.1184,.7187],[-.1032,.9998],[-.1656,-.2338],[-.2094,-.0821],[.6064,-.5493],[.231,.9568],[.1897,-.9684],[-.4299,-.2505],[-.5825,-.8367],[.0935,.8896],[.5313,-.2336],[-.2459,-.7693],[.4853,-.0926],[-.0484,-.9401],[.0692,-.4923],[.3123,.0608],[-.6079,-.8576],[-.0343,.9506],[.2018,.9568],[.1764,-.7564],[-.1548,.6701],[.3949,.1233],[.3357,-.6891],[.0105,-.7953],[.2948,-.6121],[.0894,.2643],[.1727,-.7791],[-.2464,-.0466],[-.2687,-.3126],[-.0361,-.3897],[-.1407,-.8579],[-.0944,-.375],[.4623,-.9737],[-.2108,-.0081],[-.26,-.096],[-.046,.0103],[.2871,-.7154],[.0269,-.4862],[.3001,.0749],[.6156,-.4913],[.2371,-.4227],[.2526,-.4428],[.44,-.2577],[.6109,-.848],[-.0055,.0156],[.15,.9315],[.4783,-.7325],[.3402,-.818],[-.3986,-.3725],[-.399,-.8844],[-.0355,-.8903],[-.5011,-.681],[.1877,-.7561],[.0735,.5789],[-.2156,-.2757],[.3648,-.7796],[.0451,-.0407],[-.1354,-.7929],[.0488,.2671],[-.2494,-.2811],[-.2982,-.0453],[-.3722,-.1427],[-.5343,-.9097],[.1194,.8226],[.0957,.2683],[-.0258,.0129],[.0341,.0133],[.194,-.383],[-.0086,.8395],[-.1775,-.1751],[.0285,.9041],[.0052,-.5231],[-.5034,-.6845],[.5524,-.6814],[-.0424,-.875],[.1626,.2557],[-.4684,-.9319],[.1923,-.5431],[.4365,-.9517],[.6349,-.3744],[.0089,.8385],[.0411,.5635],[.5919,-.4262],[.4396,-.5598],[.0045,.7588],[.3477,-.6759],[-.6377,-.9037],[.1366,-.8012],[-.0554,-.9857],[-.0356,-.0609],[.0213,-.5361],[-.127,.6716],[.2254,-.8643],[-.056,-.0926],[-.4695,-.7489],[.2833,-.7689],[-.5343,-.9401],[-.1813,-.845],[.0777,-.5932],[.4581,-.4879],[-.181,-.9623],[-.0431,-.2689],[-.5158,-.6391],[.4259,.0525],[.1709,.6921],[-.1256,-.9892],[.5985,-.8207],[.1532,-.823],[-.055,-.3481],[.0315,.2737],[.304,-.704],[.1237,-.8511],[-.2941,-.1017],[.2924,-.5995],[.5471,-.4675],[-.4562,-.3232],[.2268,-.4216],[.3284,.0978],[-.3467,-.72],[-.2002,-.222],[.5274,-.5843],[-.0991,-.2157],[.6362,-.4011],[.3872,.1078],[-.0559,-.4607],[.2382,.1379],[.6138,-.5302],[.1016,-.88],[-.0247,-.3195],[-.1053,.6615],[-.1396,.6628],[.0597,.7673],[-.0881,.6708],[.2755,.1572],[.2844,.1665],[-.3672,-.7858],[.0706,.0665],[.1166,-.9494],[-.4344,-.1797],[.3625,.0064],[-.3127,-.9323],[-.3387,-.2791],[-.317,-.1981],[.2956,-.4826],[-.2633,-.0791],[-.477,-.7899],[-.505,-.9918],[.6262,-.859],[-.2604,-.0309],[.3938,-.7403],[-.535,-.8155],[-.0999,.993],[.23,-.6875],[-.0948,-.1671],[.2764,.1235],[.4363,-.7268],[.0742,-.5472],[.0603,.5089],[-.4846,-.2335],[.5344,-.6855],[-.481,-.7582],[-.2007,.0528],[-.0572,-.0506],[.0717,.8206],[-.4097,-.1563],[-.1172,2e-4],[-.0734,-.9659],[.523,-.1395],[.2401,.9527],[.1839,-.6965],[-.3921,-.1399],[.3369,.1009],[-.4122,-.6806],[.3475,-.8967],[.064,.8117],[.0791,.7736],[.0623,-.9933],[-.5769,-.988],[-.3036,-.1278],[-.0776,.6626],[-.1115,-1e-4],[.0706,.0508],[.4376,-.3267],[-.2043,-.2168],[.2346,-.8045],[.6172,-.5222],[.1321,.7238],[.165,.8184],[-.1264,-.8604],[.5921,-.5948],[.402,-.8807],[-.6197,-.8484],[-.1671,.0558],[.5279,-.8633],[.4348,-.9266],[.1039,.8588],[-.2842,-.7678],[.4441,-.5677],[-.0846,.7119],[.4028,.0542],[-.6314,-.8805],[-.0074,.0516],[-.1655,-.0669],[.1784,.9142],[.1244,.6298],[-.3092,-.3833],[.1506,-.5518],[.0452,.6422],[.2174,.1701],[.1781,-.75],[-.2865,-.155],[.4295,-.3879],[-.4971,-.6028],[.2061,-.7442],[.1453,-.7647],[.0605,-.7928],[.2824,-.6314],[-.1751,-.0491],[.4157,-.4364],[.2179,-.9557],[.3304,-.5719],[.351,-.0014],[-.2741,-.0521],[-.1828,.6764],[.1249,-.3303],[.2473,.1294],[.5027,-.3955],[.4271,-.884],[-.2388,-.1993],[.0251,-.9511],[-.1003,.7018],[.2696,-.7144],[.0538,-.8057],[-.1997,-.0867],[.058,.0779],[.1208,-.7948],[-.1576,-.0063],[.136,-.347],[.0417,.5532],[-.0639,.8788],[-.4362,-.3217],[.3773,-.0477],[-.19,-.9362],[.2998,.0931],[-.0432,-.8782],[.1507,-.4126],[-.386,-.7213],[.6364,-.3174],[.4163,-.7858],[.0253,.8219],[.5577,-.3997],[.2608,-.9248],[.2453,-.5892],[.0898,.6661],[.3798,.1428],[.2019,-.673],[.1043,.2377],[.5303,-.8182],[-.1008,-.9923],[.1143,-.3105],[.6082,-.4357],[.3808,-.0465],[.1963,-.5022],[.0622,.8051],[.2043,.8297],[-.1133,-.235],[.3747,-.0409],[-.1573,-.0443],[-.4581,-.7732],[.2953,-.8493],[-.0905,.7066],[.1042,.545],[-.4179,-.6728],[.1648,.8368],[.0116,.7087],[.2155,-.7643],[-.4979,-.9035],[.1187,.2646],[.6053,-.2518],[-.1693,-.9455],[.5498,-.2563],[.0221,.6104],[-.0025,-.9974],[-.0741,-.3816],[.637,-.3605],[-.4663,-.3133],[-.3689,-.1466],[.4918,-.0524],[-.52,-.7254],[.5372,-.065],[.6281,-.2436],[-.2572,-.294],[.356,-.5373],[-.1873,-.2932],[-.0661,.9127],[.3323,-.5195],[-.0817,.6908],[.2302,.9786],[.0128,.8259],[.0737,-.3114],[.4478,-.9463],[.4713,-.6737],[-.0231,-.0274],[-.4481,-.8429],[.6161,-.5106],[-.3837,-.8852],[-.0454,.6655],[.4196,-.5836],[.0127,.9237],[-.2137,.0405],[.5339,-.6637],[.409,-.6023],[.004,.897],[-.0859,-.7958],[-.2472,.0035],[-.3169,-.2538],[.1531,.9318],[.331,-.759],[.3792,-.0498],[-.0117,.9336],[-.5587,-.996],[.0554,-.0307],[.1947,.8822],[-.1296,-.9913],[-.048,-.7995],[.1079,-.8652],[-.1334,.0388],[-.3396,-.2039],[-.3857,-.7158],[.5552,-.3217],[-.63,-.9335],[.0453,-.4783],[-.4261,-.172],[-.4736,-.7708],[.3385,-.6926],[.0254,.0919],[.2565,-.8212],[.6252,-.47],[.2705,-.9348],[-.2865,-.1747],[-.627,-.8635],[-.3939,-.8897],[-.0695,-.9374],[-.2259,-.8689],[.1493,.2101],[-.1374,-.9469],[-.5575,-.81],[.4483,-.5596],[-.4859,-.6529],[.4814,-.568],[.45,-.23],[.2646,.1768],[.2114,.8617],[-.4112,-.8569],[-.0313,.0411],[.406,-.7848],[.1633,.8974],[-.1112,-.7942],[.081,.7788],[-.0269,.664],[.3995,-.0964],[-.3934,-.3791],[-.3663,-.397],[.08,-.9919],[.1232,-.9865],[-.024,.6818],[.0331,-.9635],[.0383,-.4468],[-.2416,-.2842],[.5648,-.1155],[.4472,-.4202],[-.4648,-.2995],[-.4668,-.3164],[-.133,.7247],[-.5676,-.8088],[.5452,-.689],[.4508,-.9163],[.4112,-.1211],[.3765,-.741],[.4128,-.6048],[.1182,.6809],[.3048,-.8525],[.2635,-.7898],[-.0216,-.4739],[.1416,.7827],[-.1391,-.2018],[.5676,-.1328],[.5549,-.9323],[.0398,-.4389],[-.1174,-.9505],[.2169,.236],[-.4027,-.3672],[-.207,-.1242],[.3175,-.8102],[.1729,-.7554],[.4469,-.734],[.5387,-.1295],[.108,.5479],[.0282,-.9747],[.316,-.7363],[-.0221,-.1044],[.2443,-.4956],[.0151,-.0711],[.0954,.2654],[-.4615,-.3191],[.3891,-.5146],[.5611,-.2733],[-.0406,-.931],[.4245,-.4795],[.4204,-.9206],[-.18,-.2766],[-.5175,-.9917],[-.5368,-.9978],[.5939,-.8054],[.2554,-.4462],[.1242,.6202],[-.2901,-.1972],[-.0512,.6688],[.4659,-.8774],[.0182,-.5367],[.2752,-.748],[.2205,-.8445],[.2444,.9641],[.3887,.0818],[-.0872,-.7959],[-.2682,-.9065],[.2895,.1629],[-.1319,.0401],[.6369,-.3269],[.4131,-.845],[.2649,-.594],[-.3224,-.3328],[.6008,-.8088],[-.2336,-.9124],[.634,-.3409],[.339,-.7797],[-.5102,-.2576],[.2058,-.6959],[.0785,-.9288],[.3444,-.5867],[.0592,-.4174],[.6213,-.4938],[.4904,-.4953],[.046,.6549],[.5058,-.1903],[-.3356,-.768],[.4566,-.047],[.6362,-.3518],[-.2577,-.8566],[-.3411,-.0877],[.0561,-.5471],[.4287,.052],[.6058,-.1673],[-.5632,-.7244],[-.1781,-.8139],[-.2864,-.118],[-.1736,-.1034],[-.3946,-.2941],[-.245,-.8099],[.055,-.8752],[.0434,.7097],[-.6037,-.8319],[.5485,-.8164],[-.2465,-.8134],[-.1035,.7384],[.6248,-.257],[.4664,-.609],[.339,.6741],[-.5229,-.6227],[-.128,.6646],[.4743,-.1762],[.5118,-.2801],[-.4675,-.3092],[.1076,-.5048],[.3331,-.5791],[-.1082,-.8761],[-.5892,-.9868],[-.3236,-.1572],[.1019,-.8574],[-.4278,-.8166],[.2716,.2148],[.0503,.6987],[-.043,-.1269],[.3456,.1376],[.1132,.5841],[-.3428,-.8534],[.5777,-.5585],[-.051,.8477],[.224,-.8141],[.5468,-.9419],[-.4491,-.8498],[.2153,.8948],[-.5185,-.929],[.0023,-.0093],[-.2139,-.1053],[.4143,-.4464],[-.035,-.0492],[.0014,-.2169],[.3262,.6649],[-.1287,-.0427],[.3531,.0486],[-.0376,.6824],[.3067,.1344],[.3154,-.6799],[.0719,-.5422],[.0226,.6037],[.4853,-.2213],[-.5708,-.9562],[-.0498,.7606],[.0303,.1067],[-.5247,-.6202],[-.0761,-.9931],[.1948,.7379],[.5488,-.3545],[-.3941,-.3724],[-.1588,-.3347],[.5523,-.6853],[.1494,.7077],[-.3545,-.8899],[.565,-.146],[-.0302,.8249],[.3064,-.5168],[-.0878,.0657],[.6272,-.4405],[.1371,.2177],[-.5336,-.9651],[.1432,-.6541],[.1119,.0324],[.55,-.7589],[.4516,.0849],[-.1595,.0745],[.1705,.6929],[-.3534,-.8311],[.4366,-.5198],[.1507,.8348],[.309,.1905],[-.1316,.7185],[.4066,-.5143],[-.1734,-.2013],[.071,.4672],[.1744,-.5281],[.3391,-.6463],[.0702,.4744],[.3756,.1535],[.0757,.5716],[.1956,-.6577],[-.4931,-.9858],[.184,.8921],[.1724,-.3836],[-.0679,.763],[-.0876,-.0371],[-.2455,-.2013],[.6338,-.4069],[-.0776,.9558],[.186,-.7496],[-.6362,-.9151],[.1255,.6871],[-.0978,-.9546],[-.0365,.8089],[.0159,-.7952],[.4434,-.1252],[.0617,-.4685],[-.5106,-.7981],[.3329,-.7408],[.5786,-.8707],[.0102,-.2061],[.549,-.7897],[.4038,-.1064],[.4947,-.8386],[.1238,.587],[.5775,-.8013],[.5253,-.325],[.2019,-.4653],[.5444,-.8799],[-.5927,-.8256],[-.0011,.8369],[.1336,.6441],[-.2012,-.8624],[.1217,-.3951],[-.4787,-.2253],[-.524,-.6343],[.4137,-.4429],[-.2433,-.3214],[.0419,-.9317],[.0593,.526],[-.0579,-.3371],[-.0738,.9049],[-.3572,-.7134],[-.2009,-.0254],[.0022,.9188],[-.361,-.1074],[-.4539,-.2187],[-.4359,-.8823],[-.4277,-.343],[-.0303,.7605],[-.246,-.0098],[-.4983,-.2903],[.5118,-.4104],[-.4107,-.702],[.3341,-.5181],[.4625,-.0208],[.0862,-.2929],[.4827,.0463],[-.0652,-.3054],[-.0741,.0661],[-.01,.0874],[-.4619,-.7273],[.3226,-.5052],[-.4533,-.6473],[.3752,.0591],[.2988,-.7597],[-.38,-.3903],[-.5685,-.872],[.3953,-.5948],[.431,-.1943],[.4822,-.1964],[.5958,-.1345],[-.578,-.9502],[-.4759,-.7136],[-.4323,-.2455],[.6252,-.2583],[.0154,.6635],[-.1095,-.2579],[-.0853,-.425],[.5725,-.6135],[.2314,-.8575],[-.0875,-.3629],[.0826,.2668],[.5971,-.89],[.6066,-.1803],[-.0173,.9455],[.1712,-.951],[-.0098,-.8907],[-.1479,.6624],[-.2997,-.2433],[.0355,.9088],[-.1156,.6602],[-.3159,-.2335],[-.6329,-.9356],[-.4253,-.2857],[-.5054,-.9165],[.1667,-.7979],[.0711,-.4189],[-.3789,-.8609],[.3408,.6639],[.5686,-.8844],[.0868,.2456],[.2232,.1569],[.1795,-.6826],[.5967,-.3007],[.0562,-.9659],[.5445,-.9202],[.2341,.1506],[.4264,-.5041],[.4887,-.1583],[.5047,-.405],[-.0138,.668],[-.0613,-.352],[.0329,.7979],[-.3558,-.141],[-.0038,.8078],[-.6338,-.9037],[-.0358,-.013],[.63,-.4568],[.0033,-.1964],[-.0383,.9388],[-.1468,-.861],[-.0589,-.973],[.5234,-.9619],[.5029,-.8599],[-.4467,-.8057],[-.0013,-.9564],[.4729,.0529],[-.349,-.9121],[-.0768,.9834],[.5119,-.0136],[.0089,-.5277],[.0491,-.3311],[-.3927,-.7115],[-.0219,-.2507],[.5611,-.667],[-.0694,-.4416],[.6352,-.3803],[.1085,.6033],[.2052,-.9618],[.305,-.7013],[.4394,-.6702],[-.1921,-.2665],[.0444,-.2662],[-.5657,-.6635],[-.5552,-.6536],[.0818,.4747],[.2815,-.6103],[-.3222,-.9243],[.1976,.8319],[.4,-.6948],[-.1786,-.1355],[.1759,-.8669],[.1065,-.8369],[.5997,-.1482],[.0346,.9006],[.2213,-.8149],[-.0533,-.0834],[.0349,-.547],[.2141,.2279],[.5059,-.0946],[-.6175,-.9608],[.0447,.2738],[.3965,.0375],[-.2432,-.077],[.1398,.2418],[.4181,-.4912],[.3006,-.5392],[.325,-.8791],[.5091,-.0046],[-.1412,-.1216],[-.3547,-.1015],[.5408,-.542],[.0745,.8787],[.2059,.7139],[-.1122,-.9925],[-.4223,-.3541],[.4178,-.0086],[.1039,-.2994],[.0346,.6041],[.2224,.6868],[-.2158,-.1706],[.6145,-.4237],[-.3992,-.2004],[-.1178,-.8406],[-.3583,-.3276],[.5217,-.6554],[-.6165,-.8514],[-.154,-.1738],[.4414,.0937],[.2797,.2103],[.4602,-.7859],[.2153,-.6089],[-.2436,-.0411],[.6067,-.5476],[.2169,-.4548],[-.2446,-.9148],[-.2352,-.2781],[-.3381,-.9157],[.5276,-.2767],[-.1949,.6636],[.0978,-.3631],[-.0736,-.3916],[.1034,.5328],[.0924,-.9794],[-.0778,-.318],[-.1457,.6975],[-.4738,-.7968],[-.013,.8167],[.104,.2657],[.0596,.5112],[.0803,.0576],[.6308,-.4549],[-.089,-.3298],[.2888,.7134],[.0809,-.7847],[.0134,.0118],[.2532,-.6457],[-.3306,-.3853],[.0398,.6562],[-.2417,-.2589],[.5876,-.3142],[.1574,-.9749],[.1332,.8333],[-.5102,-.6976],[-.5295,-.6235],[.1063,-.4228],[.5799,-.1103],[.4584,-.3276],[.1998,-.3888],[.4126,-.1282],[-.0697,-.9987],[-.3158,-.7342],[-.1982,-.8981],[.1032,-.2969],[.2587,-.8139],[-.4709,-.6868],[.144,.2152],[.3394,.6837],[.4147,-.1489],[-.053,.8749],[.5029,-.9482],[.1863,.8751],[-.2859,-.8835],[-.0501,.904],[-.4091,-.8718],[-.0653,.9451],[.1835,.8658],[-.0853,-.8105],[.2408,-.8531],[.4561,-.7559],[.2066,-.3972],[-.0934,-.4249],[.084,.6724],[.0888,-.3079],[.0884,-.9904],[.6107,-.1821],[.2082,-.9565],[.1922,-.9608],[-.1027,.0651],[.3656,-.018],[.1865,-.8542],[.447,-.6526],[.3768,-.836],[.2726,.7283],[.0584,.2585],[-.5645,-.7181],[-.5693,-.7296],[-.3017,-.335],[-.1084,-.1959],[.4981,.0343],[.4162,.0495],[.3199,.0586],[-.2079,-.0434],[-.1609,-.9248],[-.3383,-.4141],[-.2011,-.2576],[-.2162,-.7732],[.5604,-.384],[-.2536,-.1957],[.0658,-.4543],[.4534,-.2477],[.043,.662],[.5485,-.8934],[.1771,-.5892],[-.1661,-.818],[.5668,-.6536],[.4413,-.0325],[-.0819,-.2293],[.1948,.9308],[-.0572,-.9051],[.6348,-.8471],[.4832,-.3681],[.145,-.8763],[.5729,-.6337],[.2056,.8484],[.4578,-.5905],[.1318,-.6309],[.2783,.6654],[.5491,-.3217],[-.0485,.8395],[-.3429,-.4014],[.2967,-.5379],[.0411,.0929],[.4572,-.4351],[.2301,-.4202],[.1117,-.437],[.5288,-.837],[-.1628,-.2234],[.5921,-.2415],[.4682,-.702],[-.0855,-.0213],[-.23,.0228],[.1762,-.9455],[.3103,-.6358],[.3957,-.0032],[-.1138,-.27],[.4824,-.211],[-.1771,-.2929],[.5268,-.0395],[-.4124,-.3138],[-.0652,.9785],[.0687,-.5852],[-.299,-.1502],[.474,-.2373],[.2151,.1921],[-.1861,.0253],[.0546,-.5227],[.1046,.0108],[.0566,-.5562],[.4166,-.1475],[.4821,-.8394],[-.0569,-.1409],[.263,.6962],[.4844,-.9462],[.4838,-.1927],[-.3753,-.9015],[-.5829,-.9633],[.1893,.2469],[.3721,-.0064],[-.181,-.0028],[-.4513,-.721],[.0879,.27],[-.0359,.7993],[.5072,-.0014],[.151,-.5119],[.4607,-.6535],[.0325,-.8394],[.4263,-.1306],[.1793,-.5732],[-.3477,-.3841],[-.3966,-.7703],[-.0095,-.8528],[.0606,-.5521],[.4794,-.4924],[.152,-.3415],[.1205,-.3503],[.3165,.6644],[.0049,.0443],[.2535,-.7916],[-.1847,.0143],[-.1226,.0647],[-.5122,-.6449],[.6201,-.2323],[.0741,.5059],[-.5011,-.2821],[-.4346,-.8762],[.5115,-.6437],[.104,.567],[.4902,-.134],[.242,-.4284],[-.07,.8945],[-.1655,-.7857],[.0909,.5022],[-.5396,-.8892],[-.4604,-.2082],[.0704,-.5721],[-.1904,-.146],[.0781,.464],[-.4517,-.2424],[-.5192,-.7872],[-.052,-.9054],[.0306,-.0128],[.4304,-.2018],[-.5429,-.6669],[.4761,-.9927],[-.3565,-.2221],[.1825,-.9662],[-.599,-.826],[.4171,-.9324],[-.085,.6855],[-.274,-.9223],[.6196,-.3693],[.1884,-.4166],[.0566,.5926],[-.4564,-.6419],[-.0046,-.2274],[.4889,-.0531],[.3961,-.7664],[.0961,.6497],[-.2792,-.7502],[.1346,.6201],[.1598,.2059],[.2212,.8907],[-.3529,-.102],[-.0981,-.0252],[.3977,-.4943],[.0436,-.9961],[.2361,-.9502],[-.3343,-.8987],[-.1455,-.3534],[.5413,-.6999],[.539,-.2078],[-.111,-.2582],[.0252,-.999],[.1117,-.9844],[.0784,.8719],[.4576,-.5668],[.2523,.2215],[.1095,-.3023],[.2087,.8772],[-.1293,-.1476],[.2098,.6837],[-.1911,-.3259],[.4308,-.8524],[.3298,.6609],[-.4558,-.2043],[.0935,-.4066],[.619,-.8278],[-.3096,-.2368],[-.2892,-.9312],[-.2898,-.357],[-.6053,-.9008],[.079,-.2919],[.0588,-.9766],[.1664,.9122],[.3595,-.8837],[-.0218,-.8231],[-.3555,-.8905],[.2473,-.8495],[-.4998,-.2468],[-.0524,.0398],[-.4084,-.2018],[.2562,-.6222],[-.0361,-.9976],[.234,-.9231],[.5535,-.8695],[-.1018,-.0357],[.4303,-.6695],[.4611,-.1106],[.3191,-.6049],[-.5766,-.9016],[.4097,.0399],[.2681,-.4684],[-.1689,.6629],[.4262,-.0083],[.5947,-.4141],[.5077,.017],[.3579,-.8549],[.4585,-.8873],[.1436,-.915],[.1804,.7115],[.096,.0462],[.4241,-.4133],[-.2638,-.7595],[.5713,-.2177],[-.47,-.2156],[.2695,.7333],[-.3621,-.1866],[.0381,.755],[-.4141,-.1879],[-.576,-.719],[.4377,-.3128],[.4025,-.4799],[.3759,-.5403],[.5621,-.9188],[.113,-.5965],[.6086,-.2061],[.514,-.0483],[.1872,.2445],[-.2155,-.9509],[-.0036,-.795],[.1657,-.9731],[.3353,.0252],[-.0488,.0627],[.6336,-.366],[-.2678,-.3294],[-.2426,-.7657],[.0827,.2689],[.0386,.73],[-.2854,-.0409],[-.0605,.0082],[.0742,-.9929],[-.0252,-.2544],[.4358,-.2553],[-.5337,-.6733],[-.0227,-.2754],[-.0407,-.9648],[-.4085,-.249],[.1784,-.6716],[.4141,-.1401],[-.4368,-.747],[.0346,.0416],[.4045,-.4744],[-.5259,-.9996],[.3723,-.7902],[.5997,-.5718],[-.2916,-.8383]],An=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),_o=(i,t=26)=>i.length>t?i.slice(0,t)+"……":i;function bd(i,{counts:t,quotes:e,favs:n,onFilter:r,onSelect:a,onPickQuote:s}){const l=e.length,o={};e.forEach((f,E)=>{var M;(o[M=f.f]||(o[M]=[])).push(E)});const c=document.createElement("div");c.className="panel-head",c.innerHTML=`
    <input class="panel-search" type="search" placeholder="搜索姓名 / 字号 / 国别…(回车飞抵)" />
    <div class="panel-title">思想家</div>
    <button class="panel-all" type="button">全部思想星</button>
  `,c.querySelector(".panel-all").addEventListener("click",()=>{_(null),r(null)}),i.appendChild(c);const h=document.createElement("div");h.className="panel-favs",i.appendChild(h);function p(){const f=n?n.list():[];if(!f.length){h.innerHTML="",h.style.display="none";return}h.style.display="",h.innerHTML=`
      <div class="panel-group-label">拾遗 <span class="fav-n">${f.length}</span>
        <button class="fav-clear" type="button">清空</button>
      </div>
      ${f.map(E=>{const M=e[E],S=si[M.f];return`<button class="fav-row" type="button" data-q="${E}">
          <span class="dot" style="--c:${S.color}"></span>
          <span class="fav-text">${An(_o(M.t,22))}</span>
          <span class="fav-who">${An(S.name.split("·").pop())}</span>
        </button>`}).join("")}
    `,h.querySelectorAll(".fav-row").forEach(E=>{E.addEventListener("click",()=>s&&s(+E.dataset.q))}),h.querySelector(".fav-clear").addEventListener("click",()=>{n.clear(),p()})}p();for(const f of gs){const E=Oe.filter(S=>S.group===f.key);if(!E.length)continue;const M=document.createElement("div");M.className="panel-group",M.innerHTML=`<div class="panel-group-label">${f.label}</div>`;for(const S of E){const O=document.createElement("div");O.className="panel-row-wrap",O.dataset.fig=S.id;const C=o[S.id]||[];O.innerHTML=`
        <button class="panel-row" type="button" title="${An(S.name)}(${An(S.en)}) · ${An(S.blurb)}">
          <span class="dot" style="--c:${S.color}"></span>
          <span class="row-main">
            <span class="row-name">${S.name}</span>
            <span class="row-years">${S.years} · ${S.region}</span>
          </span>
          <span class="row-count">${t[S.id]||0}</span>
          <span class="row-caret" title="展开语录目录">${C.length?"▸":""}</span>
        </button>
        <div class="row-quotes"></div>
      `;const b=O.querySelector(".panel-row");b.addEventListener("click",()=>{const et=b.classList.contains("active");_(null),m(),et?r(null):(_(S.id),r(S.id),a&&a(S.id))});const L=O.querySelector(".row-caret");C.length&&L.addEventListener("click",et=>{et.stopPropagation();const g=O.querySelector(".row-quotes");if(g.dataset.open){m();return}g.dataset.open="1",g.innerHTML=C.map(y=>`
            <button class="q-row" type="button" data-q="${y}">
              <span class="q-num">${String(y+1).padStart(3,"0")}</span>
              <span class="q-text">${An(_o(e[y].t,20))}</span>
              <span class="q-work">${An(e[y].w)}</span>
            </button>`).join(""),g.querySelectorAll(".q-row").forEach(y=>{y.addEventListener("click",V=>{V.stopPropagation(),s&&s(+y.dataset.q)})}),g.classList.add("open")}),M.appendChild(O)}i.appendChild(M)}const d=document.createElement("div");d.className="panel-foot",d.innerHTML=`<span>${Oe.length} 位思想家</span><span>${l} 句经典</span>`,i.appendChild(d);function m(){i.querySelectorAll(".row-quotes").forEach(f=>{f.classList.remove("open"),delete f.dataset.open})}function _(f){i.querySelectorAll(".panel-row").forEach(E=>{E.classList.toggle("active",E.parentElement.dataset.fig===f)}),i.classList.toggle("filtering",!!f)}function w(f){_(f),r(f),a&&a(f)}const u=c.querySelector(".panel-search");return u.addEventListener("input",()=>{const f=u.value.trim().toLowerCase();i.querySelectorAll(".panel-row-wrap").forEach(E=>{const M=si[E.dataset.fig],S=[M.name,M.en,M.region,M.role,...M.aka||[]].join(" ").toLowerCase();E.style.display=!f||S.includes(f)?"":"none"}),i.querySelectorAll(".panel-group").forEach(E=>{const M=[...E.querySelectorAll(".panel-row-wrap")].some(S=>S.style.display!=="none");E.style.display=M?"":"none"})}),u.addEventListener("keydown",f=>{if(f.key!=="Enter")return;const E=[...i.querySelectorAll(".panel-row-wrap")].find(M=>M.style.display!=="none");E&&w(E.dataset.fig)}),{select:w,renderFavs:p}}function Ad(i){let t=null;function e(a,s){const l=a.textContent;a.textContent=s,a.disabled=!0,setTimeout(()=>{a.textContent=l,a.disabled=!1},1200)}function n({quote:a,figure:s,index:l,total:o,fished:c=!1,onNext:h=null,onCopy:p=null,onShare:d=null,onFav:m=null,isFav:_=!1,onPostcard:w=null}){t=h,i.innerHTML=`
      ${c?'<div class="card-fished">◌ 从虚空捞起</div>':""}
      <header class="card-head">
        <span class="dot" style="--c:${s.color}"></span>
        <span class="card-name">${s.name}</span>
        <span class="card-sub">${s.years} · ${s.region}</span>
        <button class="card-close" type="button" aria-label="关闭">×</button>
      </header>
      <blockquote class="card-quote">“${a.t}”</blockquote>
      <footer class="card-meta">
        <span class="card-work">${a.w}${a.y?` · ${a.y}`:""}</span>
        <span class="card-num">第 ${String(l+1).padStart(3,"0")} 句 / 共 ${o} 句</span>
      </footer>
      <div class="card-actions">
        ${h?'<button class="card-next" type="button">同人物下一条 →</button>':""}
        <button class="card-act" data-act="fav" type="button">${_?"已在拾遗 ✓":"收进拾遗"}</button>
        <button class="card-act" data-act="postcard" type="button" title="连星图一起导出成图片">留影</button>
        <button class="card-act" data-act="copy" type="button">复制原文</button>
        <button class="card-act" data-act="share" type="button">分享</button>
      </div>
    `,i.querySelector(".card-close").addEventListener("click",r);const u=i.querySelector(".card-next");u&&u.addEventListener("click",()=>t&&t()),i.querySelector('[data-act="fav"]').addEventListener("click",f=>{if(!m)return;const E=m();f.currentTarget.textContent=E?"已在拾遗 ✓":"收进拾遗"}),i.querySelector('[data-act="postcard"]').addEventListener("click",()=>{w&&w()}),i.querySelector('[data-act="copy"]').addEventListener("click",f=>{p&&Promise.resolve(p()).then(E=>E&&e(f.currentTarget,"已复制"))}),i.querySelector('[data-act="share"]').addEventListener("click",f=>{d&&Promise.resolve(d()).then(E=>E&&e(f.currentTarget,"已复制链接"))}),i.classList.add("show")}function r(){i.classList.remove("show")}return{show:n,hide:r}}function Rd(i,{onEnter:t,immediate:e=!1}){const n=[{cls:"s1",html:`
        <div class="intro-kicker">Marx Cloud</div>
        <h1 class="intro-title">思想云</h1>
        <p class="intro-sub">一张可漫游的马克思主义经典星图</p>
        <div class="intro-credit">灵感致敬刘慈欣《诗云》</div>
      `},{cls:"s2",html:`
        <p class="intro-line">两百年来,一代代思想家写下无数经典。</p>
        <p class="intro-line">它们不是散落的碎片,<em>而是一团云</em>。</p>
      `},{cls:"s3",html:`
        <p class="intro-line">万点星辰,随视角流转:</p>
        <p class="intro-line">每转过 <em>90°</em>,便汇聚成一位思想家的肖像。</p>
        <p class="intro-line">点击星尘,读到一句经典;点击虚空,<em>捞起一句</em>。</p>
        <p class="intro-line small">拖拽 / WASD 飞行 · 滚轮缩放 · 左侧点亮或搜索一位思想家 · H 隐藏界面 · F 全屏 · P 暂停巡游</p>
        <p class="intro-line small">卡片上可 <em>收进拾遗</em>、<em>留影</em>、复制与分享这一句</p>
        <button class="intro-enter" type="button">进入星图</button>
      `}];let r=0,a=!1;i.innerHTML=`
    <div class="intro-stage">
      <div class="intro-page"></div>
      <div class="intro-pager">1 / 3</div>
      <div class="intro-skip">跳过</div>
    </div>
  `;const s=i.querySelector(".intro-page"),l=i.querySelector(".intro-pager"),o=i.querySelector(".intro-skip");function c(){const m=n[r];s.className=`intro-page ${m.cls}`,s.innerHTML=m.html,l.textContent=`${r+1} / 3`,l.style.visibility=r===0?"hidden":"visible";const _=s.querySelector(".intro-enter");_&&_.addEventListener("click",w=>{w.stopPropagation(),p()})}function h(){if(!a){if(r+=1,r>=n.length){p();return}c()}}function p(){a||(a=!0,i.classList.add("leave"),setTimeout(()=>{i.classList.remove("show")},900),t&&t())}function d(){a=!1,r=0,i.classList.add("show"),i.classList.remove("leave"),c()}return i.addEventListener("click",h),o.addEventListener("click",m=>{m.stopPropagation(),p()}),window.addEventListener("keydown",m=>{m.key==="Enter"&&i.classList.contains("show")&&h()}),d(),e&&p(),{reopen:d}}const xo="marxcloud.favs.v1";function Cd(){let i=[];try{i=JSON.parse(localStorage.getItem(xo))||[]}catch{i=[]}const t=new Set(i.filter(n=>Number.isInteger(n)));function e(){try{localStorage.setItem(xo,JSON.stringify([...t]))}catch{}}return{has:n=>t.has(n),list:()=>[...t],toggle(n){return t.has(n)?t.delete(n):t.add(n),e(),t.has(n)},clear(){t.clear(),e()}}}const Ai='"Noto Serif SC","Source Han Serif SC","Songti SC",serif';function Pd(i,t,e){const n=[];let r="";for(const a of t)i.measureText(r+a).width>e&&r?(n.push(r),r=a):r+=a;return r&&n.push(r),n}function Ld({scene:i,quote:t,figure:e,index:n,total:r}){const o=document.createElement("canvas");o.width=1200,o.height=1500;const c=o.getContext("2d"),h=i.renderer.domElement;i.renderNow(),c.fillStyle="#07080f",c.fillRect(0,0,1200,1500);const p=Math.max(1200/h.width,1500/h.height),d=h.width*p,m=h.height*p;c.drawImage(h,(1200-d)/2,(1500-m)/2,d,m);const _=c.createLinearGradient(0,1500*.34,0,1500);_.addColorStop(0,"rgba(7,8,15,0)"),_.addColorStop(.45,"rgba(7,8,15,0.86)"),_.addColorStop(1,"rgba(7,8,15,0.97)"),c.fillStyle=_,c.fillRect(0,0,1200,1500),c.textBaseline="top",c.fillStyle="rgba(216,183,186,0.9)",c.font=`500 30px ${Ai}`,c.fillText(e.name+" · "+e.years,110,120),c.fillStyle="rgba(232,231,236,0.35)",c.font=`400 22px ${Ai}`,c.fillText("思想云 · Marx Cloud",110,170),c.fillStyle=e.color,c.beginPath(),c.arc(119,1030,9,0,Math.PI*2),c.fill();const w="“"+t.t+"”";let u=52,f;do c.font=`600 ${u}px ${Ai}`,f=Pd(c,w,1200-110*2),u-=3;while(f.length*u*1.72>560&&u>26);const E=u*1.72;let M=1030-f.length*E;c.fillStyle="#f3f1f4";for(const O of f)c.fillText(O,110,M),M+=E;c.fillStyle="rgba(232,231,236,0.55)",c.font=`400 26px ${Ai}`,c.fillText(t.w+(t.y?` · ${t.y}`:""),110,1260),c.fillStyle="rgba(232,231,236,0.32)",c.font=`400 22px ${Ai}`,c.fillText(`第 ${String(n+1).padStart(3,"0")} 句 / 共 ${r} 句`,110,1310);const S=document.createElement("a");S.href=o.toDataURL("image/png"),S.download=`思想云-${e.name}-第${n+1}句.png`,S.click()}const Ri=document.getElementById("scene"),ti=document.getElementById("tooltip"),ts=document.getElementById("loading"),Dd=document.getElementById("hint"),Id=document.getElementById("panel"),hn=document.getElementById("figure-caption"),es=document.body;let ns=null,lr=!0;const fa=Cd();document.getElementById("btn-panel").addEventListener("click",()=>es.classList.toggle("panel-open"));document.getElementById("btn-about").addEventListener("click",()=>ns&&ns.reopen());{const i=document.querySelector("#brand .back");if(i){const t=e=>e.replace(/index\.html$/,"");t(new URL("../",location.href).pathname)===t(location.pathname)&&i.remove()}}const Ud=Object.fromEntries(Oe.map((i,t)=>[i.id,t])),pn={};ni.forEach((i,t)=>{var e;(pn[e=i.f]||(pn[e]=[])).push(t)});const _s=Object.fromEntries(Oe.map(i=>[i.id,(pn[i.id]||[]).length])),cr=ni.length,is=gs.map(i=>i.key),vo=is.map(i=>{const t=Oe.filter(e=>e.group===i);return{figs:t.length,quotes:t.reduce((e,n)=>e+(_s[n.id]||0),0)}}),xr=matchMedia("(pointer: coarse)").matches||innerWidth<768;function Nd(){try{const i=document.createElement("canvas"),t=i.getContext("webgl2")||i.getContext("webgl");if(!t)return!0;const e=t.getExtension("WEBGL_debug_renderer_info"),n=e?t.getParameter(e.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER);return/swiftshader|llvmpipe|software|basic render/i.test(String(n))}catch{return!1}}const rs=new URLSearchParams(location.search).has("lite"),r0=Nd(),je=rs?9e3:r0?14e3:xr?2e4:28e3,ua=6.4,as=[{id:"marx",v:7},{id:"engels",v:3},{id:"lenin",v:3},{id:"luxemburg",v:3}],yo=as.map(i=>si[i.id]),a0=[];let ss=0;for(const i of Oe)ss+=Math.max(1,_s[i.id]),a0.push(ss);const Mo=new Array(je),fr=new Array(je),wo=new Array(je),So=new Array(je),Fd=async()=>{const i=await c0(as.map(N=>`./${N.id}-mask.png?v=${N.v}`),je);for(let N=0;N<je;N++){const j=Math.random()*ss;let q=0,_t=Oe.length-1;for(;q<_t;){const J=q+_t>>1;a0[J]<j?q=J+1:_t=J}const Lt=Oe[q];Mo[N]=q,wo[N]=is.indexOf(Lt.group);const k=pn[Lt.id]||[0];fr[N]=k[Math.random()*k.length|0]||0,So[N]=Lt.color}const t=yd({planes:i,figIndex:Mo,groupIdx:wo,emblem:Td,colors:So,height:ua});(xr||r0)&&(t.uniforms.uSize.value=.26);const e=Md(xr?900:1500),n=Sd(Ri,t,e,{planes:i.map(N=>({w:ua*N.aspect,h:ua}))});let r="portrait";function a(N){const j=si[N],q=r==="group"?is.indexOf(j.group):as.findIndex(_t=>_t.id===N);q>=0&&n.flyTo(q*Math.PI/2)}const s=Ad(document.getElementById("quote-card")),l=bd(Id,{counts:_s,quotes:ni,favs:fa,onFilter:N=>{t.uniforms.uFocus.value=N==null?-1:Ud[N]},onSelect:a,onPickQuote:N=>{l.select(ni[N].f),f(N)}}),o=t.uniforms.uSize.value;let c=!0;const h=document.getElementById("btn-quality"),p=["auto","high","low"];let d=rs?2:0;function m(){const N=p[d];c=N==="auto",N==="low"?(t.points.geometry.setDrawRange(0,Math.floor(je*.4)),t.uniforms.uSize.value=o*1.35):(t.points.geometry.setDrawRange(0,je),t.uniforms.uSize.value=o),h.textContent=N==="auto"?"画质·自动":N==="high"?"画质·高":"画质·低"}h.addEventListener("click",()=>{d=(d+1)%p.length,m()}),m(),document.getElementById("speed").addEventListener("input",N=>{n.setSpeed(parseFloat(N.target.value))});const _=document.getElementById("btn-void");_.addEventListener("click",()=>{lr=!lr,_.textContent=lr?"拾句·开":"拾句·关"});const w=document.getElementById("btn-view");let u=0;w.addEventListener("click",()=>{r=r==="portrait"?"group":"portrait",u=r==="group"?1:0,w.textContent=r==="group"?"视图·徽章":"视图·肖像",b=-2});function f(N,{fished:j=!1}={}){const q=ni[N],_t=si[q.f];s.show({quote:q,figure:_t,index:N,total:cr,fished:j,onNext:(pn[q.f]||[]).length>1?()=>f(E(q.f,N)):null,onCopy:()=>navigator.clipboard.writeText(`“${q.t}” —— ${_t.name},${q.w}${q.y?`(${q.y})`:""}`).then(()=>!0,()=>!1),onShare:()=>(history.replaceState(null,"",`#q=${N}`),navigator.clipboard.writeText(location.href).then(()=>!0,()=>!1)),isFav:fa.has(N),onFav:()=>{const Lt=fa.toggle(N);return l.renderFavs(),Lt},onPostcard:()=>Ld({scene:n,quote:q,figure:_t,index:N,total:cr})})}function E(N,j){const q=pn[N],_t=q.indexOf(j);return q[(_t+1)%q.length]}function M(){const N=t.uniforms.uFocus.value,j=N>=0?pn[Oe[N].id]:null;j&&j.length?f(j[Math.random()*j.length|0],{fished:!0}):f(Math.random()*cr|0,{fished:!0})}n.onClick((N,j)=>{const q=n.pickStar(N,j,18);q>=0?f(fr[q]):lr&&M()});let S=!1,O=0;Ri.addEventListener("pointermove",N=>{S||n.isDragging()||(S=!0,requestAnimationFrame(()=>{S=!1;const j=performance.now();if(j-O<40)return;O=j;const q=n.pickStar(N.clientX,N.clientY,14,2);if(q<0){C();return}const _t=ni[fr[q]],Lt=si[_t.f];ti.innerHTML=`
        <span class="dot" style="--c:${Lt.color}"></span>
        <b>${Lt.name}</b>
        <span class="tip-text">${_t.t.length>30?_t.t.slice(0,30)+"……":_t.t}</span>
      `,ti.classList.add("show");const k=16,J=Math.min(N.clientX+k,innerWidth-ti.offsetWidth-10),st=Math.min(N.clientY+k,innerHeight-ti.offsetHeight-10);ti.style.transform=`translate(${J}px, ${st}px)`,Ri.style.cursor="pointer"}))}),Ri.addEventListener("pointerdown",C);function C(){ti.classList.remove("show"),Ri.style.cursor="grab"}let b=-2;function L(N){const j=N.maxW>.55?N.active:-1;if(j!==b)if(b=j,j<0)hn.classList.remove("show");else{if(r==="group"){const q=gs[j];hn.querySelector(".cap-name").textContent=q.label,hn.querySelector(".cap-sub").textContent=`${vo[j].figs} 位思想家 · ${vo[j].quotes} 句经典`,hn.style.setProperty("--c","#e5484d")}else{const q=yo[j];hn.querySelector(".cap-name").textContent=q.name,hn.querySelector(".cap-sub").textContent=`${q.years} · ${q.role}`,hn.style.setProperty("--c",q.color)}hn.classList.add("show")}}const et=location.hash.match(/^#q=(\d+)$/),g=et?Math.min(cr-1,parseInt(et[1],10)||0):-1;ns=Rd(document.getElementById("intro"),{onEnter:()=>n.armAuto(),immediate:g>=0}),g>=0&&f(g),xr||es.classList.add("panel-open");let y=!1,V=performance.now();const G=[1,.65,.45,.3,.2];let Y=0,K=0,X=0,P=performance.now(),U=performance.now();n.onTick((N,j,q)=>{y||(y=!0,ts.classList.add("done"),setTimeout(()=>ts.remove(),1200),setTimeout(()=>Dd.classList.add("fade"),1e4));const _t=Math.min(2,(q-V)/1e3);V=q;const Lt=t.uniforms.uOpacity;Lt.value=Math.min(1,Lt.value+_t*.55),L(n.getOrientation());const k=t.uniforms.uView;if(k.value+=(u-k.value)*Math.min(1,N*3),c&&!rs&&q-n.lastRafAt<1200){const J=(q-P)/1e3;P=q,X+=J,K++,q-U>2200&&K>=6&&(K/Math.max(1e-6,X)<22&&Y<G.length-1&&(Y++,t.points.geometry.setDrawRange(0,Math.floor(je*G[Y]))),X=0,K=0,U=q)}}),window.addEventListener("keydown",N=>{var q,_t;if(N.target&&(N.target.tagName==="INPUT"||N.target.tagName==="TEXTAREA"))return;const j=N.key.toLowerCase();N.key==="Escape"?s.hide():j==="h"?es.classList.toggle("chrome-off"):j==="f"&&(document.fullscreenElement?document.exitFullscreen():(_t=(q=document.documentElement).requestFullscreen)==null||_t.call(q))}),window.__dbg={scene:n,cloud:t,camera:n.camera,quoteIdxByParticle:fr,planeFigures:yo}};Fd().catch(i=>{console.error(i),ts.innerHTML=`<div class="load-err">加载失败:${i.message}</div>`});
