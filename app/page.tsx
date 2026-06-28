"use client";

import ImageSlot from "@/components/ImageSlot";

const HDR = ["Music Video Treatment", "Wale — Overthink"] as const;

function Chrome() {
  return (
    <div className="chrome">
      <span>{HDR[0]}</span>
      <span>{HDR[1]}</span>
    </div>
  );
}
function Foot({ page }: { page: string }) {
  return (
    <div className="foot">
      <span className="brand">Triptych Studios</span>
      <span>{page}</span>
    </div>
  );
}
function Section({
  eyebrow,
  title,
  tag,
  tagColor,
  dot,
}: {
  eyebrow: string;
  title: string;
  tag?: string;
  tagColor?: string;
  dot?: string;
}) {
  return (
    <div className="srow">
      <div className="left">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
      </div>
      {tag && (
        <span className="tag" style={{ color: tagColor }}>
          {dot && <span className="dot" style={{ background: dot }} />}
          {tag}
        </span>
      )}
    </div>
  );
}

function Frame({
  id,
  ar,
  ph,
  label,
  labelColor = "#cdd8e6",
  body,
  pill,
  pillColor = "#cdd8e6",
  pillDot,
  bubble,
}: {
  id: string;
  ar: string;
  ph: string;
  label: string;
  labelColor?: string;
  body?: string;
  pill?: string;
  pillColor?: string;
  pillDot?: string;
  bubble?: string;
}) {
  const src = id === "rs_b1_venue" ? "/gifs/rs_b1_venue.png" : `/gifs/${id}.gif`;
  return (
    <div className="frame" style={{ aspectRatio: ar }}>
      <ImageSlot id={id} placeholder={ph} src={src} />
      {pill && (
        <div className="pill" style={{ color: pillColor }}>
          {pillDot && <span className="dot" style={{ background: pillDot }} />}
          {pill}
        </div>
      )}
      {bubble && (
        <div
          className="bub me"
          style={{ position: "absolute", top: "2.4cqw", right: "2.4cqw", maxWidth: "62%", zIndex: 2 }}
        >
          {bubble}
        </div>
      )}
      <div className="cap">
        <div className="lbl" style={{ color: labelColor }}>
          {label}
        </div>
        {body && <p className="bd">{body}</p>}
      </div>
    </div>
  );
}

const BLUE = "#cdd8e6",
  BLUEDOT = "#8fa6c4",
  WHITE = "#e8e8e8",
  WARM = "#e7d4c4",
  WARMDOT = "#c9a98f";

export default function Page() {
  return (
    <main className="app">
      {/* 01 — COVER */}
      <section className="slide">
        <div className="chrome">
          <span>Triptych Studios</span>
          <span>{HDR[0]}</span>
        </div>
        <div className="cover-title">
          <div className="cover-eyebrow">Wale &nbsp;·&nbsp; New Single</div>
          <h1 className="cover-h1">Overthink</h1>
          <p className="cover-sub">
            Two people preparing for the same night, moving in opposite directions — and the distance the night can&apos;t close.
          </p>
        </div>
        <div className="cover-grid">
          <Frame id="rs_cover_hero" ar="1/1" ph="The empty venue, house lights" label="The Empty Venue" labelColor={WHITE} />
          <Frame id="rs_cover_key2" ar="1/1" ph="Wale at soundcheck" label="His Soundcheck" labelColor={BLUE} />
          <Frame id="rs_cover_key3" ar="1/1" ph="She's at the mirror, makeup" label="Her — Mirror, Makeup" labelColor={WARM} />
          <Frame id="rs_cover_key4" ar="1/1" ph="The full show, packed crowd" label="The Show — Full Crowd" labelColor={WHITE} />
        </div>
        <div className="credits">
          <div className="c"><span className="ck">Artist</span><span className="cv">Wale</span></div>
          <div className="c"><span className="ck">Directed By</span><span className="cv">Lawrence Mahone</span></div>
          <div className="c"><span className="ck">Treatment By</span><span className="cv">Triptych Studios</span></div>
        </div>
      </section>

      {/* 02 — CONCEPT */}
      <section className="slide">
        <Chrome />
        <div className="lead">
          <div className="lead-eyebrow">The Concept</div>
          <h2 className="lead-head">
            Wale and the girl are never in the same shot. The story lives in the cut between his world and hers — and a text thread neither can finish.
          </h2>
        </div>
        <div className="content">
          <Frame id="rs_vl_soundcheck" ar="16/9" ph="Soundcheck ref" label="Soundcheck" labelColor={BLUE} pillDot={BLUEDOT} body="Empty venue. Intimate, stripped, bare. House lights. His inner world." />
          <Frame id="rs_vl_show" ar="16/9" ph="The full show, crowd" label="The Show" labelColor={WHITE} body="Full crowd, stage lights, peak energy. When soundcheck ends, the room fills — his outer world." />
          <Frame id="rs_vl_apartment" ar="16/9" ph="Apartment ref" label="Her Apartment" labelColor={WARM} body="Still, isolated, warm light. Alone. The other half of every cut." />
        </div>
        <Foot page="02 / 10" />
      </section>

      {/* 03 — PERFORMANCE */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="Wale · Performance" title="Soundcheck" tag="His World" tagColor={BLUE} dot={BLUEDOT} />
        <div className="lead">
          <p className="lead-intro">
            Wale starts the song stripped-down at soundcheck — bare stage, house lights, no crowd. Then soundcheck ends and the room fills for the full show.
          </p>
        </div>
        <div className="content">
          <div className="row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Frame id="rs_perf_1" ar="1/1" ph="Wide, bare stage" label="Wide — Bare Stage" labelColor={BLUE} />
            <Frame id="rs_perf_2" ar="1/1" ph="Close, mic in hand" label="Close — Mic In Hand" labelColor={BLUE} />
          </div>
          <div className="row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Frame id="rs_perf_3" ar="1/1" ph="Low angle, silhouette" label="Low Angle — Silhouette" labelColor={BLUE} />
            <Frame id="rs_perf_4" ar="1/1" ph="Behind him, empty room" label="Behind Him — Empty Room" labelColor={BLUE} />
          </div>
        </div>
        <Foot page="03 / 10" />
      </section>

      {/* 04 — THE INVITATION */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="01 · Beginning" title="The Invitation" tag="His World" tagColor={BLUE} dot={BLUEDOT} />
        <div className="content">
          <Frame id="rs_b1_venue" ar="16/9" ph="Empty venue, Wale alone on stage" label="01 · Soundcheck For No One" labelColor={BLUE} body="Wale alone on stage in a bare, empty room, running the song to no one. House lights up." />
          <Frame id="rs_chair" ar="16/9" ph="A single chair with a 'RESERVED' sign on the seat" label="02 · The Reserved Sign" labelColor={BLUE} body={'One detail shot — a single chair near the stage, a "RESERVED" card propped on the seat.'} />
          <Frame id="rs_b2_gesture" ar="16/9" ph="Wale on stage, phone in hand" label="03 · He Sends The Invite" labelColor={BLUE} body="He stops between runs, pulls his phone, and sends the text." bubble="tonight's the show. you should be here 🤍" />
        </div>
        <Foot page="04 / 10" />
      </section>

      {/* 05 — CUT TO HER */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="01 · Beginning" title="Cut To Her" tag="Her World" tagColor={WARM} dot={WARMDOT} />
        <div className="content">
          <Frame id="rs_b4_apartment" ar="1/1" ph="Her alone, phone lighting up" label="04 · The Apartment" labelColor={WARM} body="She's alone. The text lights up her phone — surprise, a flicker of warmth, then hesitation. Something between them is still unresolved." />
          <Frame id="rs_b5_ready" ar="16/9" ph="She begins getting dressed" label="05 · She Starts Getting Ready" labelColor={WARM} body="At the mirror — doing her makeup, getting dressed, looking incredible. Despite the hesitation, her hands start moving toward the night." />
        </div>
        <Foot page="05 / 10" />
      </section>

      {/* 06 — TWO RITUALS */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="02 · Middle" title="Two Rituals" tag="Same Song" tagColor="#9a9a9a" />
        <div className="content">
          <div className="row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Frame id="rs_b6_his" ar="1/1" ph="Wale performing at soundcheck" label="06 · His Ritual" labelColor={BLUE} body="He rehearses, heading toward the stage." pill="His Soundcheck" pillColor={BLUE} pillDot={BLUEDOT} />
            <Frame id="rs_b6_her" ar="1/1" ph="She does her makeup, gets dressed" label="06 · Her Ritual" labelColor={WARM} body="At the mirror — toward a decision she hasn't made." pill="Her Getting Ready" pillColor={WARM} pillDot={WARMDOT} />
          </div>
          <Frame id="rs_b7_venuefills" ar="1/1" ph="Crowd pours in, the room fills" label="08 · The Venue Fills" labelColor={WHITE} body="Soundcheck ends, doors open, the crowd fills the room." pill="The Show" pillColor={WHITE} pillDot={WHITE} />
        </div>
        <Foot page="06 / 10" />
      </section>

      {/* 07 — THE WAIT */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="02 · Middle" title="The Wait" />
        <div className="content">
          <div className="chat" style={{ flex: 1 }}>
            <div className="clbl">07 / 09 · The Texts Decay</div>
            <div className="bub me">doors at 8. you coming?</div>
            <div className="status r">Read · no reply</div>
            <div className="bub me">you here?</div>
            <div className="typing"><span /><span /><span /></div>
            <div className="status l">typing… vanishes</div>
          </div>
          <div className="row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Frame id="rs_b8_stalls" ar="1/1" ph="Her in the car, en route to the show" label="10 · On The Way" labelColor={WARM} body="She's out the door and in the car — dressed up, headed for the show." />
            <Frame id="rs_b10_looking" ar="1/1" ph="Wale mid-performance, lost in it" label="11 · Lost In The Song" labelColor={WHITE} body="Full crowd now — head down, fully in the performance." />
          </div>
        </div>
        <Foot page="07 / 10" />
      </section>

      {/* 08 — THE SHOW */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="03 · End" title="The Show" tag="His World — The Show" tagColor={WHITE} dot={WHITE} />
        <div className="content">
          <Frame id="rs_b11_peak" ar="1/1" ph="Peak of the show" label="11 · The Peak" labelColor={WHITE} body="Full crowd, full energy — Wale at the height of the performance, lost in the song." />
          <Frame id="rs_b12_chair" ar="16/9" ph="Wale finishing the song, alone in the lights" label="12 · He Lets Go" labelColor={WHITE} body="Head down, eyes closed, he gives the song everything — not waiting on anyone." />
        </div>
        <Foot page="08 / 10" />
      </section>

      {/* 09 — THE TURNAROUND */}
      <section className="slide">
        <Chrome />
        <Section eyebrow="03 · End" title="The Turnaround" tag="Her World" tagColor={WARM} dot={WARMDOT} />
        <div className="content">
          <Frame id="rs_b13_choice" ar="1/1" ph="She grabs her keys at a friend's and heads to the show" label="13 · She Changes Her Mind" labelColor={WARM} />
          <div className="textblock">
            <h3>She changes her mind.</h3>
            <p>She stops at a friend&apos;s and almost lets the night pass — then grabs her keys and goes. She&apos;s coming to the show after all.</p>
          </div>
        </div>
        <Foot page="09 / 10" />
      </section>

      {/* 10 — FINAL */}
      <section className="slide">
        <Chrome />
        <div className="content" style={{ gap: "2.6cqw" }}>
          <Frame id="rs_b14_final" ar="1/1" ph="She arrives at the back of the show" label="Final Image — She Arrives" labelColor="#bdbdbd" />
          <div>
            <h2 className="final-head">She came.</h2>
            <p className="final-body">
              She slips in at the back just as the song peaks. He never sees her come in — he&apos;s lost in the song, doing his thing. They stay apart in frame; the whole connection lived in the thread and in her choosing to show up.
            </p>
            <div className="final-meta">
              <div className="final-contact">
                <div className="c"><span className="ck">Triptych Studios</span><span className="cv">law@triptychvisuals.com</span></div>
                <div className="c"><span className="ck">Phone</span><span className="cv">+1 708 745 1322</span></div>
              </div>
              <div className="final-chat">
                <div className="bub me" style={{ maxWidth: "100%" }}>tonight&apos;s the show. you should be here 🤍</div>
                <div className="bub her" style={{ maxWidth: "100%" }}>omw 🤍</div>
                <div className="status l">Read · 11:58 PM</div>
              </div>
            </div>
          </div>
        </div>
        <Foot page="10 / 10" />
      </section>
    </main>
  );
}
