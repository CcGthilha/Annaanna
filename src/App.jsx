import { useState } from 'react'
import './App.css'

// ใส่รูปไว้ใน public/photo/ แล้วแก้ชื่อไฟล์ตรงนี้
const P = ['/photo/wedding.jpg', '/photo/narak.jpg', '/photo/jub.jpg', '/photo/joong.jpg']
const M = (i) => `/photo/${i + 1}.jpg` // รูปความทรงจำ: public/photo/1.jpg ... 72.jpg
const TITLE = 'Happy birthday, my baobei ♡'
const MSG = `เย่ แอนนา 23 ครั้งแรกและครั้งเดียวในชีวิต 

ขอให้ปีนี้เป็นปีที่ดีของเธอนะ ขอให้ได้กินของอร่อยทุกวัน เจอแต่คนน่ารัก ไม่มีเรื่องให้กังวลใจ ขอให้ปลอกหมอนเธอมีคราบน้ำลายมากกว่าน้ำตา

ดีใจที่ได้เจอ ขอบคุณที่น่ารักกับเราเสมอ ขอบคุณนะคับ`
const NOTE = `ขอให้เธอมีความสุขจนไม่ต้องขอพรอีก

Happy birthday, my baobei — always with you naaa :33`

// พื้นหลัง: หัวใจ/ประกายลอยขึ้น
const B = Array.from({ length: 26 }, (_, i) => ({ e: '♡✦♥✧'[i % 4], l: Math.random() * 100, s: 12 + Math.random() * 24, d: 9 + Math.random() * 10, w: -Math.random() * 18 }))

// สติกเกอร์หน้าเค้ก [path รูป, left%, top%, ขนาด]
const S = [['/photo/1.png', 3, 10, 58], ['/photo/2.png', 14, 30, 44], ['/photo/3.png', 4, 50, 60], ['/photo/cake2.png', 6, 72, 64], ['/photo/4.png', 16, 84, 40], ['/photo/5.png', 20, 12, 36],
  ['/photo/6.png', 88, 8, 58], ['/photo/7.png', 80, 26, 54], ['/photo/8.png', 92, 46, 46], ['/photo/cake.png', 82, 64, 60], ['/photo/9.png', 90, 80, 54], ['/photo/10.png', 76, 88, 38], ['/photo/11.png', 78, 10, 34], ['/photo/cake4.png', 94, 28, 44]]

// จัดรูปเป็นทรงหัวใจ 72 ช่องพอดี
const H = (() => { for (let n = 8; ; n++) { const s = 2.6 / n, R = Math.ceil(2.45 / s), a = []
  for (let r = 0; r < R; r++) for (let c = 0; c < n; c++) { const x = (c + .5) * s - 1.3, y = 1.3 - (r + .5) * s, f = (x * x + y * y - 1) ** 3 - x * x * y ** 3; if (f <= 0) a.push([c + 1, r + 1, f]) }
  if (a.length >= 72) { const t = a.sort((u, v) => u[2] - v[2]).slice(0, 72).sort((u, v) => u[1] - v[1] || u[0] - v[0]); return { n, a: t, ar: n / Math.max(...t.map(q => q[1])) } } } })()

export default function App() {
  const [p, setP] = useState('home')
  const [z, setZ] = useState(null)
  const go = (x) => () => setP(x)
  const Back = ({ to = 'gift', t = 'ย้อนกลับ' }) => <button className="back" onClick={go(to)}>{t}</button>
  const Photo = ({ i, c = '' }) => <img className={c} src={P[i % P.length]} alt="" />

  return (<>
    <div className="bg">
      <b className="blob b1" /><b className="blob b2" /><b className="blob b3" />
      {B.map((b, i) => <i key={i} style={{ left: b.l + '%', fontSize: b.s, animationDuration: b.d + 's', animationDelay: b.w + 's' }}>{b.e}</i>)}
    </div>
    <main key={p} className={p}>
      {p === 'home' && <>
        <h1>happy birthday!</h1>
        <button className="big" onClick={go('gift')} aria-label="open"><img src="/photo/blue.png" alt="Open gift" /></button>
        <p className="hint">คลิกน้องบลูไปดูเพื่อดูความน่ารัก</p>
      </>}

      {p === 'gift' && <>
        <h1>choose your gift</h1>
        <div className="row">
          {[['msg', <img src="/photo/jodmai.png" alt="" />, 'message'], ['flower', <img src="/photo/flower.png" alt="" />, 'flower'], ['cake', <img src="/photo/cake.png" alt="" />, 'cake']].map(([k, e, l]) =>
            <button key={k} className="gift" onClick={go(k)}><span>{e}</span>{l}</button>)}
        </div>
        <Back to="home" t="หน้าก่อนหน้า" />
      </>}

      {p === 'msg' && <>
        <div className="letter">
          <div className="strip">{[0, 1, 2].map(i => <Photo key={i} i={i} />)}</div>
          <article><h2>{TITLE}</h2><p>{MSG}</p></article>
          <div className="tag"><Photo i={3} /></div>
        </div>
        <Back />
      </>}

      {p === 'flower' && <>
        <h2 className="top">flower for you!</h2>
        <div className="row flowers">
          <div className="bq small"><img src="/photo/flower1.png" alt="" /></div>
          <div className="bq mid"><img src="/photo/flower3.png" alt="" /></div>
          <div className="bq small"><img src="/photo/rose.png" alt="" /><br /><img src="/photo/youmine.png" alt="" /></div>
        </div>
        <Back />
      </>}

      {p === 'cake' && <>
        {S.map(([e, l, t, z], i) => <i key={i} className="stk" style={{ left: l + '%', top: t + '%', fontSize: z, animationDelay: -i * .7 + 's' }}><img src={e} alt="" style={{ width: z * 1.6 }} /></i>)}
        <div className="line">{[0, 1, 2, 3].map(i => <Photo key={i} i={i} c="pol" />)}</div>
        <div className="party"><span className="hat">🎉</span><Photo i={0} c="me" /></div>
        <div className="note">{NOTE}</div>
        <span className="back"><u onClick={go('gift')}>ย้อนกลับ</u> หรือ <u onClick={go('end')}>ไปหน้าสุดท้าย</u></span>
      </>}

      {p === 'end' && <>
        <div className="row hearts">{[0, 1, 2].map(i => <Photo key={i} i={i} c="heart" />)}</div>
        <Back to="cake" />
        <button className="back nxt" onClick={go('mem')}>รูปที่น้องบลูกดถ่าย</button>
      </>}

      {p === 'mem' && <>
        <h2>our memories ♡</h2>
        <div className="mem" style={{ '--n': H.n, '--ar': H.ar }}>
          {H.a.map(([c, r], k) => <img key={k} src={M(k)} alt="" loading="lazy" onClick={() => setZ(M(k))} style={{ gridColumn: c, gridRow: r, animationDelay: k * 40 + 'ms' }} />)}
        </div>
        <Back to="end" />
      </>}
    </main>
    {z && <div className="zoom" onClick={() => setZ(null)}><img src={z} alt="" /></div>}
  </>)
}