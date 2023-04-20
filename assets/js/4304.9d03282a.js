"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[4304],{64174:(t,e,s)=>{s.d(e,{Z:()=>a});var n=s(4942),r=s(23881);const i={id:"request-scheduler",throttleRequests:!0,maxRequests:6};class a{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,n.Z)(this,"props",void 0),(0,n.Z)(this,"stats",void 0),(0,n.Z)(this,"activeRequestCount",0),(0,n.Z)(this,"requestQueue",[]),(0,n.Z)(this,"requestMap",new Map),(0,n.Z)(this,"deferredUpdate",null),this.props={...i,...t},this.stats=new r.Z({id:this.props.id}),this.stats.get("Queued Requests"),this.stats.get("Active Requests"),this.stats.get("Cancelled Requests"),this.stats.get("Queued Requests Ever"),this.stats.get("Active Requests Ever")}scheduleRequest(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>0;if(!this.props.throttleRequests)return Promise.resolve({done:()=>{}});if(this.requestMap.has(t))return this.requestMap.get(t);const s={handle:t,priority:0,getPriority:e},n=new Promise((t=>(s.resolve=t,s)));return this.requestQueue.push(s),this.requestMap.set(t,n),this._issueNewRequests(),n}_issueRequest(t){const{handle:e,resolve:s}=t;let n=!1;const r=()=>{n||(n=!0,this.requestMap.delete(e),this.activeRequestCount--,this._issueNewRequests())};return this.activeRequestCount++,s?s({done:r}):Promise.resolve({done:r})}_issueNewRequests(){this.deferredUpdate||(this.deferredUpdate=setTimeout((()=>this._issueNewRequestsAsync()),0))}_issueNewRequestsAsync(){this.deferredUpdate=null;const t=Math.max(this.props.maxRequests-this.activeRequestCount,0);if(0!==t){this._updateAllRequests();for(let e=0;e<t;++e){const t=this.requestQueue.shift();t&&this._issueRequest(t)}}}_updateAllRequests(){const t=this.requestQueue;for(let e=0;e<t.length;++e){const s=t[e];this._updateRequest(s)||(t.splice(e,1),this.requestMap.delete(s.handle),e--)}t.sort(((t,e)=>t.priority-e.priority))}_updateRequest(t){return t.priority=t.getPriority(t.handle),!(t.priority<0)||(t.resolve(null),!1)}}},39119:(t,e,s)=>{s.d(e,{Z:()=>n});const n={EPSILON1:.1,EPSILON2:.01,EPSILON3:.001,EPSILON4:1e-4,EPSILON5:1e-5,EPSILON6:1e-6,EPSILON7:1e-7,EPSILON8:1e-8,EPSILON9:1e-9,EPSILON10:1e-10,EPSILON11:1e-11,EPSILON12:1e-12,EPSILON13:1e-13,EPSILON14:1e-14,EPSILON15:1e-15,EPSILON16:1e-16,EPSILON17:1e-17,EPSILON18:1e-18,EPSILON19:1e-19,EPSILON20:1e-20,PI_OVER_TWO:Math.PI/2,PI_OVER_FOUR:Math.PI/4,PI_OVER_SIX:Math.PI/6,TWO_PI:2*Math.PI}},37695:(t,e,s)=>{s.d(e,{Xx:()=>c,KM:()=>f,Mh:()=>Q,F7:()=>O,JO:()=>D,du:()=>ot});const n=-1,r=0,i=1;var a=s(4942),o=s(59122);const h=new o.Z,u=new o.Z;class c{constructor(t=[0,0,0],e=[0,0,0],s){(0,a.Z)(this,"center",void 0),(0,a.Z)(this,"halfDiagonal",void 0),(0,a.Z)(this,"minimum",void 0),(0,a.Z)(this,"maximum",void 0),s=s||h.copy(t).add(e).scale(.5),this.center=new o.Z(s),this.halfDiagonal=new o.Z(e).subtract(this.center),this.minimum=new o.Z(t),this.maximum=new o.Z(e)}clone(){return new c(this.minimum,this.maximum,this.center)}equals(t){return this===t||Boolean(t)&&this.minimum.equals(t.minimum)&&this.maximum.equals(t.maximum)}transform(t){return this.center.transformAsPoint(t),this.halfDiagonal.transform(t),this.minimum.transform(t),this.maximum.transform(t),this}intersectPlane(t){const{halfDiagonal:e}=this,s=u.from(t.normal),a=e.x*Math.abs(s.x)+e.y*Math.abs(s.y)+e.z*Math.abs(s.z),o=this.center.dot(s)+t.distance;return o-a>0?i:o+a<0?n:r}distanceTo(t){return Math.sqrt(this.distanceSquaredTo(t))}distanceSquaredTo(t){const e=h.from(t).subtract(this.center),{halfDiagonal:s}=this;let n,r=0;return n=Math.abs(e.x)-s.x,n>0&&(r+=n*n),n=Math.abs(e.y)-s.y,n>0&&(r+=n*n),n=Math.abs(e.z)-s.z,n>0&&(r+=n*n),r}}var l=s(85975);const m=new o.Z,d=new o.Z;class f{constructor(t=[0,0,0],e=0){(0,a.Z)(this,"center",void 0),(0,a.Z)(this,"radius",void 0),this.radius=-0,this.center=new o.Z,this.fromCenterRadius(t,e)}fromCenterRadius(t,e){return this.center.from(t),this.radius=e,this}fromCornerPoints(t,e){return e=m.from(e),this.center=(new o.Z).from(t).add(e).scale(.5),this.radius=this.center.distance(e),this}equals(t){return this===t||Boolean(t)&&this.center.equals(t.center)&&this.radius===t.radius}clone(){return new f(this.center,this.radius)}union(t){const e=this.center,s=this.radius,n=t.center,r=t.radius,i=m.copy(n).subtract(e),a=i.magnitude();if(s>=a+r)return this.clone();if(r>=a+s)return t.clone();const o=.5*(s+a+r);return d.copy(i).scale((-s+o)/a).add(e),this.center.copy(d),this.radius=o,this}expand(t){const e=m.from(t).subtract(this.center).magnitude();return e>this.radius&&(this.radius=e),this}transform(t){this.center.transform(t);const e=l.Q$(m,t);return this.radius=Math.max(e[0],Math.max(e[1],e[2]))*this.radius,this}distanceSquaredTo(t){const e=this.distanceTo(t);return e*e}distanceTo(t){const e=m.from(t).subtract(this.center);return Math.max(0,e.len()-this.radius)}intersectPlane(t){const e=this.center,s=this.radius,a=t.normal.dot(e)+t.distance;return a<-s?n:a<s?r:i}}var Z=s(41737),p=s(41855);const w=new o.Z,M=new o.Z,g=new o.Z,y=new o.Z,x=new o.Z,I=new o.Z,q=new o.Z,P=0,b=1,E=2,A=3,N=4,S=5,R=6,_=7,v=8;class O{constructor(t=[0,0,0],e=[0,0,0,0,0,0,0,0,0]){(0,a.Z)(this,"center",void 0),(0,a.Z)(this,"halfAxes",void 0),this.center=(new o.Z).from(t),this.halfAxes=new Z.Z(e)}get halfSize(){const t=this.halfAxes.getColumn(0),e=this.halfAxes.getColumn(1),s=this.halfAxes.getColumn(2);return[new o.Z(t).len(),new o.Z(e).len(),new o.Z(s).len()]}get quaternion(){const t=this.halfAxes.getColumn(0),e=this.halfAxes.getColumn(1),s=this.halfAxes.getColumn(2),n=new o.Z(t).normalize(),r=new o.Z(e).normalize(),i=new o.Z(s).normalize();return(new p.Z).fromMatrix3(new Z.Z([...n,...r,...i]))}fromCenterHalfSizeQuaternion(t,e,s){const n=new p.Z(s),r=(new Z.Z).fromQuaternion(n);return r[0]=r[0]*e[0],r[1]=r[1]*e[0],r[2]=r[2]*e[0],r[3]=r[3]*e[1],r[4]=r[4]*e[1],r[5]=r[5]*e[1],r[6]=r[6]*e[2],r[7]=r[7]*e[2],r[8]=r[8]*e[2],this.center=(new o.Z).from(t),this.halfAxes=r,this}clone(){return new O(this.center,this.halfAxes)}equals(t){return this===t||Boolean(t)&&this.center.equals(t.center)&&this.halfAxes.equals(t.halfAxes)}getBoundingSphere(t=new f){const e=this.halfAxes,s=e.getColumn(0,g),n=e.getColumn(1,y),r=e.getColumn(2,x),i=w.copy(s).add(n).add(r);return t.center.copy(this.center),t.radius=i.magnitude(),t}intersectPlane(t){const e=this.center,s=t.normal,a=this.halfAxes,o=s.x,h=s.y,u=s.z,c=Math.abs(o*a[P]+h*a[b]+u*a[E])+Math.abs(o*a[A]+h*a[N]+u*a[S])+Math.abs(o*a[R]+h*a[_]+u*a[v]),l=s.dot(e)+t.distance;return l<=-c?n:l>=c?i:r}distanceTo(t){return Math.sqrt(this.distanceSquaredTo(t))}distanceSquaredTo(t){const e=M.from(t).subtract(this.center),s=this.halfAxes,n=s.getColumn(0,g),r=s.getColumn(1,y),i=s.getColumn(2,x),a=n.magnitude(),o=r.magnitude(),h=i.magnitude();n.normalize(),r.normalize(),i.normalize();let u,c=0;return u=Math.abs(e.dot(n))-a,u>0&&(c+=u*u),u=Math.abs(e.dot(r))-o,u>0&&(c+=u*u),u=Math.abs(e.dot(i))-h,u>0&&(c+=u*u),c}computePlaneDistances(t,e,s=[-0,-0]){let n=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY;const i=this.center,a=this.halfAxes,o=a.getColumn(0,g),h=a.getColumn(1,y),u=a.getColumn(2,x),c=I.copy(o).add(h).add(u).add(i),l=q.copy(c).subtract(t);let m=e.dot(l);return n=Math.min(m,n),r=Math.max(m,r),c.copy(i).add(o).add(h).subtract(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),c.copy(i).add(o).subtract(h).add(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),c.copy(i).add(o).subtract(h).subtract(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),i.copy(c).subtract(o).add(h).add(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),i.copy(c).subtract(o).add(h).subtract(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),i.copy(c).subtract(o).subtract(h).add(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),i.copy(c).subtract(o).subtract(h).subtract(u),l.copy(c).subtract(t),m=e.dot(l),n=Math.min(m,n),r=Math.max(m,r),s[0]=n,s[1]=r,s}transform(t){this.center.transformAsPoint(t);const e=this.halfAxes.getColumn(0,g);e.transformAsPoint(t);const s=this.halfAxes.getColumn(1,y);s.transformAsPoint(t);const n=this.halfAxes.getColumn(2,x);return n.transformAsPoint(t),this.halfAxes=new Z.Z([...e,...s,...n]),this}getTransform(){throw new Error("not implemented")}}var C=s(79332),L=s(28835);const T=new o.Z,z=new o.Z;class D{constructor(t=[0,0,1],e=0){(0,a.Z)(this,"normal",void 0),(0,a.Z)(this,"distance",void 0),this.normal=new o.Z,this.distance=-0,this.fromNormalDistance(t,e)}fromNormalDistance(t,e){return(0,C.Z)(Number.isFinite(e)),this.normal.from(t).normalize(),this.distance=e,this}fromPointNormal(t,e){t=T.from(t),this.normal.from(e).normalize();const s=-this.normal.dot(t);return this.distance=s,this}fromCoefficients(t,e,s,n){return this.normal.set(t,e,s),(0,C.Z)((0,L.fS)(this.normal.len(),1)),this.distance=n,this}clone(){return new D(this.normal,this.distance)}equals(t){return(0,L.fS)(this.distance,t.distance)&&(0,L.fS)(this.normal,t.normal)}getPointDistance(t){return this.normal.dot(t)+this.distance}transform(t){const e=z.copy(this.normal).transformAsVector(t).normalize(),s=this.normal.scale(-this.distance).transform(t);return this.fromPointNormal(s,e)}projectPointOntoPlane(t,e=[0,0,0]){t=T.from(t);const s=this.getPointDistance(t),n=z.copy(this.normal).scale(s);return t.subtract(n).to(e)}}const U=[new o.Z([1,0,0]),new o.Z([0,1,0]),new o.Z([0,0,1])],V=new o.Z,B=new o.Z;new D(new o.Z(1,0,0),0);class Q{constructor(t=[]){(0,a.Z)(this,"planes",void 0),this.planes=t}fromBoundingSphere(t){this.planes.length=2*U.length;const e=t.center,s=t.radius;let n=0;for(const r of U){let t=this.planes[n],i=this.planes[n+1];t||(t=this.planes[n]=new D),i||(i=this.planes[n+1]=new D);const a=V.copy(r).scale(-s).add(e);r.dot(a);t.fromPointNormal(a,r);const o=V.copy(r).scale(s).add(e),h=B.copy(r).negate();h.dot(o);i.fromPointNormal(o,h),n+=2}return this}computeVisibility(t){let e=i;for(const s of this.planes){switch(t.intersectPlane(s)){case n:return n;case r:e=r}}return e}computeVisibilityWithPlaneMask(t,e){if((0,C.Z)(Number.isFinite(e),"parentPlaneMask is required."),e===Q.MASK_OUTSIDE||e===Q.MASK_INSIDE)return e;let s=Q.MASK_INSIDE;const i=this.planes;for(let a=0;a<this.planes.length;++a){const o=a<31?1<<a:0;if(a<31&&0==(e&o))continue;const h=i[a],u=t.intersectPlane(h);if(u===n)return Q.MASK_OUTSIDE;u===r&&(s|=o)}return s}}(0,a.Z)(Q,"MASK_OUTSIDE",4294967295),(0,a.Z)(Q,"MASK_INSIDE",0),(0,a.Z)(Q,"MASK_INDETERMINATE",2147483647);new o.Z,new o.Z,new o.Z,new o.Z,new o.Z;new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,new o.Z,Math.PI;var K=s(39119);const X=new Z.Z,k=new Z.Z,F=new Z.Z,j=new Z.Z,W=new Z.Z;function Y(t,e={}){const s=K.Z.EPSILON20;let n=0,r=0;const i=k,a=F;i.identity(),a.copy(t);const o=s*function(t){let e=0;for(let s=0;s<9;++s){const n=t[s];e+=n*n}return Math.sqrt(e)}(a);for(;r<10&&J(a)>o;)$(a,j),W.copy(j).transpose(),a.multiplyRight(j),a.multiplyLeft(W),i.multiplyRight(j),++n>2&&(++r,n=0);return e.unitary=i.toTarget(e.unitary),e.diagonal=a.toTarget(e.diagonal),e}const G=[1,0,0],H=[2,2,1];function J(t){let e=0;for(let s=0;s<3;++s){const n=t[X.getElementIndex(H[s],G[s])];e+=2*n*n}return Math.sqrt(e)}function $(t,e){const s=K.Z.EPSILON15;let n=0,r=1;for(let u=0;u<3;++u){const e=Math.abs(t[X.getElementIndex(H[u],G[u])]);e>n&&(r=u,n=e)}const i=G[r],a=H[r];let o=1,h=0;if(Math.abs(t[X.getElementIndex(a,i)])>s){const e=(t[X.getElementIndex(a,a)]-t[X.getElementIndex(i,i)])/2/t[X.getElementIndex(a,i)];let s;s=e<0?-1/(-e+Math.sqrt(1+e*e)):1/(e+Math.sqrt(1+e*e)),o=1/Math.sqrt(1+s*s),h=s*o}return Z.Z.IDENTITY.to(e),e[X.getElementIndex(i,i)]=e[X.getElementIndex(a,a)]=o,e[X.getElementIndex(a,i)]=h,e[X.getElementIndex(i,a)]=-h,e}const tt=new o.Z,et=new o.Z,st=new o.Z,nt=new o.Z,rt=new o.Z,it=new Z.Z,at={diagonal:new Z.Z,unitary:new Z.Z};function ot(t,e=new O){if(!t||0===t.length)return e.halfAxes=new Z.Z([0,0,0,0,0,0,0,0,0]),e.center=new o.Z,e;const s=t.length,n=new o.Z(0,0,0);for(const o of t)n.add(o);const r=1/s;n.multiplyByScalar(r);let i=0,a=0,h=0,u=0,c=0,l=0;for(const o of t){const t=tt.copy(o).subtract(n);i+=t.x*t.x,a+=t.x*t.y,h+=t.x*t.z,u+=t.y*t.y,c+=t.y*t.z,l+=t.z*t.z}i*=r,a*=r,h*=r,u*=r,c*=r,l*=r;const m=it;m[0]=i,m[1]=a,m[2]=h,m[3]=a,m[4]=u,m[5]=c,m[6]=h,m[7]=c,m[8]=l;const{unitary:d}=Y(m,at),f=e.halfAxes.copy(d);let p=f.getColumn(0,st),w=f.getColumn(1,nt),M=f.getColumn(2,rt),g=-Number.MAX_VALUE,y=-Number.MAX_VALUE,x=-Number.MAX_VALUE,I=Number.MAX_VALUE,q=Number.MAX_VALUE,P=Number.MAX_VALUE;for(const o of t)tt.copy(o),g=Math.max(tt.dot(p),g),y=Math.max(tt.dot(w),y),x=Math.max(tt.dot(M),x),I=Math.min(tt.dot(p),I),q=Math.min(tt.dot(w),q),P=Math.min(tt.dot(M),P);p=p.multiplyByScalar(.5*(I+g)),w=w.multiplyByScalar(.5*(q+y)),M=M.multiplyByScalar(.5*(P+x)),e.center.copy(p).add(w).add(M);const b=et.set(g-I,y-q,x-P).multiplyByScalar(.5),E=new Z.Z([b[0],0,0,0,b[1],0,0,0,b[2]]);return e.halfAxes.multiplyRight(E),e}}}]);