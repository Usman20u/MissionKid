import type { MissionRecord } from './catalog';

// Provenance for every entry below: one controlled, reviewed MVP content set.
// A new review pass publishes a new version rather than editing entries in place.
export const CATALOG_CONTENT_VERSION = 'mvp-catalog-2026-09-r2';

// Reviewed production Mission content. Bundled, static and read-only at runtime.
// `catalogOrder` is editorial priority within a Mission Category and is spaced by
// ten so a later reviewed Mission can be placed without renumbering its peers.
export const MISSION_CATALOG: readonly MissionRecord[] = [
  {
    missionId: 'movement-02',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Bear, Crab, Bird',
        instruction:
          'Cross the room as a bear, on your hands and feet. Cross back as a crab, with your tummy facing up. Cross again as a bird, on tiptoe. Then choose your favourite of the three and cross one last time that way, a little faster.',
        safetyNote:
          'Use a clear floor that is not slippery, and slow down before you reach the other side.',
      },
      de: {
        title: 'Bär, Krabbe, Vogel',
        instruction:
          'Geh als Bär auf Händen und Füßen durch den Raum. Geh als Krabbe mit dem Bauch nach oben zurück. Geh dann als Vogel auf Zehenspitzen noch einmal hinüber. Such dir jetzt von den dreien dein Lieblingstier aus und geh ein letztes Mal so hinüber – ein bisschen schneller.',
        safetyNote:
          'Beweg dich auf freiem Boden, der nicht rutschig ist, und werde langsamer, bevor du auf der anderen Seite ankommst.',
      },
      ru: {
        title: 'Медведь, краб, птица',
        instruction:
          'Пройди через комнату как медведь — на руках и ногах. Вернись как краб — животом вверх. Потом снова пройди через комнату как птица — на цыпочках. А теперь выбери, кем из трёх тебе понравилось быть больше всего, и пройди так в последний раз — немного быстрее.',
        safetyNote:
          'Двигайся по свободному нескользкому полу и замедляйся перед тем, как дойдёшь до другой стороны.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 10,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-10',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Ten Tall Jumps',
        instruction:
          'Stand in a clear space. Jump ten times on the same spot, stretching up tall with both arms each time. After the tenth jump, lie down on your back. Put a hand on your chest and feel how fast your heart is beating.',
        safetyNote:
          'Jump away from furniture, on a floor that is not slippery, with nothing hanging low above you. Land softly.',
      },
      de: {
        title: 'Zehn Strecksprünge',
        instruction:
          'Stell dich auf eine freie Fläche. Spring zehnmal auf der Stelle und streck dich dabei jedes Mal mit beiden Armen lang nach oben. Leg dich nach dem zehnten Sprung auf den Rücken. Leg eine Hand auf die Brust und spür, wie schnell dein Herz schlägt.',
        safetyNote:
          'Spring mit Abstand zu Möbeln auf einem Boden, der nicht rutschig ist. Über dir darf nichts tief hängen. Lande weich.',
      },
      ru: {
        title: 'Десять прыжков — тянись вверх',
        instruction:
          'Встань там, где вокруг свободно. Сделай десять прыжков на одном месте и в каждом вытягивайся в струнку, подняв обе руки вверх. После десятого прыжка ляг на спину. Положи руку на грудь и почувствуй, как быстро бьётся сердце.',
        safetyNote:
          'Прыгай подальше от мебели, на нескользком полу и там, где над головой ничего низко не висит. Приземляйся мягко.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 20,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-16',
    category: 'Movement',
    ageBands: ['9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Two Hands, Two Jobs',
        instruction:
          'Stand still with a soft object, like a rolled-up sock, in each hand. Move one hand in slow circles while the other goes straight up and down, and count to twenty. Stop, swap jobs, and count to twenty again. For the last round, count to twenty once more and switch jobs at ten without either hand stopping.',
        safetyNote:
          'Stand with space around you so your arms do not bump into anything.',
      },
      de: {
        title: 'Zwei Hände, zwei Aufgaben',
        instruction:
          'Steh still und halte in jeder Hand etwas Weiches, zum Beispiel eine zusammengerollte Socke. Beweg eine Hand in langsamen Kreisen, während die andere gerade auf und ab geht, und zähl bis zwanzig. Halte an, tausch die Aufgaben und zähl noch einmal bis zwanzig. Zähl in der letzten Runde wieder bis zwanzig und tausch bei zehn die Aufgaben, ohne dass eine der beiden Hände anhält.',
        safetyNote:
          'Stell dich so hin, dass du Platz um dich herum hast und deine Arme nirgends anstoßen.',
      },
      ru: {
        title: 'Две руки — два дела',
        instruction:
          'Возьми в каждую руку что-нибудь мягкое, например свёрнутый носок, и стой на месте. Одной рукой делай медленные круги, а другую двигай прямо вверх и вниз, считая до двадцати. Остановись, поменяй движения между руками и снова досчитай до двадцати. В последнем раунде снова считай до двадцати и на счёт «десять» поменяй движения между руками, не останавливая ни одну руку.',
        safetyNote:
          'Встань так, чтобы вокруг было место и руки ни обо что не ударялись.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 30,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-06',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Sleeping Giant',
        instruction:
          'A giant is asleep on the far side of the room. Creep over so quietly that it does not wake up. Every few steps, pretend the giant stirs: freeze completely still, then creep on. Go over, back and over again. If the giant is still asleep when you arrive the last time, you made it!',
        safetyNote:
          'Creep slowly on a clear floor and look where you are going.',
      },
      de: {
        title: 'Der schlafende Riese',
        instruction:
          'Auf der anderen Seite des Raums schläft ein Riese. Schleich so leise hinüber, dass er nicht aufwacht. Tu alle paar Schritte so, als würde sich der Riese im Schlaf bewegen: Erstarre völlig und schleich dann weiter. Geh hinüber, zurück und noch einmal hinüber. Schläft der Riese noch, wenn du zum letzten Mal ankommst, hast du es geschafft!',
        safetyNote:
          'Schleich langsam über freien Boden und schau, wohin du gehst.',
      },
      ru: {
        title: 'Спящий великан',
        instruction:
          'На другом конце комнаты спит великан. Прокрадись туда так тихо, чтобы он не проснулся. Каждые несколько шагов представляй, что великан шевелится во сне: замри и не шевелись, а потом крадись дальше. Пройди туда, обратно и ещё раз туда. Если великан всё ещё спит, когда ты в последний раз дойдёшь до другой стороны, — у тебя получилось!',
        safetyNote:
          'Крадись медленно по свободному полу и смотри, куда идёшь.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 40,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-15',
    category: 'Movement',
    ageBands: ['9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Low Line',
        instruction:
          'Stand up straight and imagine an invisible line across the room at your waist. Then get low and cross without your head going above the line. Do three crossings, a different low way each time: crouching, crawling, or a way you invent. After the third, you have found three ways to stay under the line.',
        safetyNote:
          'Choose a clear, open route across the room before you start, and move slowly.',
      },
      de: {
        title: 'Unter der Linie',
        instruction:
          'Steh gerade und stell dir eine unsichtbare Linie vor, die auf Höhe deiner Taille quer durch den Raum geht. Mach dich dann klein und durchquere den Raum, ohne dass dein Kopf über die Linie kommt. Mach das dreimal, jedes Mal tief unten auf eine andere Art: in der Hocke, krabbelnd oder so, wie du es dir selbst ausdenkst. Nach dem dritten Mal hast du drei Möglichkeiten gefunden, unter der Linie zu bleiben.',
        safetyNote:
          'Such dir vor dem Start einen freien, offenen Weg durch den Raum aus und beweg dich langsam.',
      },
      ru: {
        title: 'Под линией',
        instruction:
          'Встань прямо и представь невидимую линию поперёк комнаты на уровне своего пояса. Потом опустись пониже и переберись на другую сторону комнаты так, чтобы голова не поднималась выше линии. Сделай так три раза, каждый раз по-другому, но всегда низко: на корточках, ползком или так, как придумаешь. После третьего раза у тебя уже три способа остаться под линией.',
        safetyNote:
          'Прежде чем начать, выбери свободный путь через комнату, где ничего не мешает, и двигайся медленно.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 50,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-12',
    category: 'Movement',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'The Book Balance',
        instruction:
          'Balance a book flat on your head and walk across the room and back. Then add a second book on top and walk across and back once more. If a book slides off, put it back and carry on from that spot. Finish back where you started with both books still on your head.',
        safetyNote:
          'Use light, thin books and walk slowly on a clear floor.',
      },
      de: {
        title: 'Bücher auf dem Kopf',
        instruction:
          'Balancier ein Buch flach auf dem Kopf und geh damit durch den Raum und wieder zurück. Leg dann ein zweites Buch obendrauf und geh noch einmal hin und zurück. Wenn ein Buch herunterrutscht, leg es zurück auf den Kopf und mach an dieser Stelle weiter. Komm zum Schluss dort an, wo du losgegangen bist – mit beiden Büchern noch auf dem Kopf.',
        safetyNote:
          'Nimm leichte, dünne Bücher und geh langsam über freien Boden.',
      },
      ru: {
        title: 'Книги на голове',
        instruction:
          'Положи книгу плашмя на голову и, удерживая равновесие, пройди через комнату и обратно. Потом добавь сверху вторую книгу и ещё раз пройди туда и обратно. Если книга соскользнёт, положи её обратно на голову и продолжай с того же места. Закончи на месте старта так, чтобы обе книги всё ещё лежали у тебя на голове.',
        safetyNote:
          'Бери лёгкие тонкие книги и иди медленно по свободному полу.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 60,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-09',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Giant Steps and Mouse Steps',
        instruction:
          'Cross the room like a giant, taking the biggest steps you can and counting them out loud. Then come back like a mouse, in tiny steps, heel to toe, counting again. Now say both numbers. Which one is bigger?',
        safetyNote:
          'Use a clear floor that is not slippery, and only take giant steps you can balance on.',
      },
      de: {
        title: 'Riesenschritte und Mäuseschritte',
        instruction:
          'Geh wie ein Riese durch den Raum: Mach die größten Schritte, die du kannst, und zähl dabei laut mit. Dann komm wie eine Maus zurück – mit winzigen Schritten, Ferse an Fußspitze – und zähl wieder mit. Sag jetzt beide Zahlen. Welche Zahl ist größer?',
        safetyNote:
          'Beweg dich auf freiem Boden, der nicht rutschig ist, und mach Riesenschritte nur so groß, dass du dabei das Gleichgewicht halten kannst.',
      },
      ru: {
        title: 'Шаги великана и шаги мышки',
        instruction:
          'Пройди через комнату как великан: делай самые большие шаги, какие только можешь, и считай их вслух. Потом вернись как мышка — крошечными шажками, пятка к носку — и снова считай. Теперь назови оба числа. Какое из них больше?',
        safetyNote:
          'Двигайся по свободному нескользкому полу. Шаги великана делай такими, чтобы не терять равновесие.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-13',
    category: 'Movement',
    ageBands: ['9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Exact Steps',
        instruction:
          'Pick two spots in your home, such as a door and a table, and guess how many steps it takes to get between them. Then make your guess come true: walk the route, making your steps longer or shorter so that your last step lands exactly on your number. Do this for three different routes.',
        safetyNote:
          'Walk on a clear floor. Make your steps longer or shorter, but do not jump or leap.',
      },
      de: {
        title: 'Auf den Schritt genau',
        instruction:
          'Such dir zu Hause zwei Stellen aus, zum Beispiel eine Tür und einen Tisch, und schätze, wie viele Schritte du von der einen zur anderen brauchst. Jetzt versuch, genau auf deine Zahl zu kommen: Geh denselben Weg und mach deine Schritte länger oder kürzer, sodass du mit genau so vielen Schritten am Ziel ankommst, wie du geschätzt hast. Mach das auf drei verschiedenen Wegen.',
        safetyNote:
          'Geh auf freiem Boden. Mach deine Schritte länger oder kürzer, aber spring nicht und hüpf nicht.',
      },
      ru: {
        title: 'Ровно столько шагов',
        instruction:
          'Выбери дома два места, например дверь и стол, и угадай, сколько шагов нужно, чтобы пройти от одного до другого. Теперь постарайся попасть точно в своё число: пройди тот же маршрут, делая шаги длиннее или короче, чтобы в конце получилось ровно твоё число шагов. Сделай так на трёх разных маршрутах.',
        safetyNote:
          'Иди по свободному полу. Делай шаги длиннее или короче, но не прыгай и не скачи.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-11',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Cushion Course',
        instruction:
          'Lay three cushions or pillows flat on the floor to make a little course. One is for crawling over, one is for going around, and the last one is for sitting on. Go through your course three times, a different way each time, like a cat or a snail. The third time, finish by sitting on the last one.',
        safetyNote:
          'Use cushions or pillows you are allowed to use, and keep all three flat on the floor. Do not stand, run or jump on them, because they can slide.',
      },
      de: {
        title: 'Der Kissen-Parcours',
        instruction:
          'Leg drei Kissen flach auf den Boden – das wird dein kleiner Parcours. Über eines krabbelst du, um eines gehst du herum, und auf das letzte setzt du dich. Geh dreimal durch deinen Parcours, jedes Mal auf eine andere Art, zum Beispiel wie eine Katze oder wie eine Schnecke. Beim dritten Mal setzt du dich zum Schluss auf das letzte Kissen.',
        safetyNote:
          'Nimm Kissen, die du benutzen darfst, und lass alle drei flach auf dem Boden liegen. Stell dich nicht darauf, renn nicht darüber und spring nicht darauf, denn sie können wegrutschen.',
      },
      ru: {
        title: 'Полоса препятствий из подушек',
        instruction:
          'Положи на пол три подушки плашмя — получится маленькая полоса препятствий. Через одну ты переползаешь, другую обходишь, а на последнюю садишься. Пройди эту полосу три раза, каждый раз по-другому — например, как кошка или как улитка. В третий раз в конце сядь на последнюю подушку.',
        safetyNote:
          'Бери подушки, которые тебе разрешили взять, и следи, чтобы все три лежали на полу плашмя. Не вставай на них, не бегай по ним и не прыгай на них, потому что они могут скользить.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 90,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-14',
    category: 'Movement',
    ageBands: ['9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Balance Sequence',
        instruction:
          'Balance on one foot and do three moves in order: touch the floor with one hand, reach both arms up, then turn slowly to face the next wall. Then do all three on your other foot. If your lifted foot comes down, steady yourself and try that side again. Finish the second side with your foot still in the air.',
        safetyNote:
          'Use a clear space away from furniture, on a floor that is not slippery. You can put your foot down at any moment.',
      },
      de: {
        title: 'Drei Bewegungen auf einem Bein',
        instruction:
          'Stell dich auf ein Bein und mach drei Bewegungen in dieser Reihenfolge: Berühr mit einer Hand den Boden, streck beide Arme nach oben und dreh dich dann langsam zur nächsten Wand. Mach danach alle drei Bewegungen auf dem anderen Bein. Wenn dein angehobener Fuß den Boden berührt, finde wieder dein Gleichgewicht und fang diese Seite noch einmal an. Beende die zweite Seite mit dem Fuß noch in der Luft.',
        safetyNote:
          'Mach das auf einer freien Fläche mit Abstand zu Möbeln und auf einem Boden, der nicht rutschig ist. Du kannst deinen Fuß jederzeit abstellen.',
      },
      ru: {
        title: 'Три движения на одной ноге',
        instruction:
          'Встань на одну ногу и сделай три движения по порядку: коснись пола одной рукой, потянись обеими руками вверх, а потом медленно повернись лицом к следующей стене. Затем сделай все три движения, стоя на другой ноге. Если поднятая нога коснётся пола, восстанови равновесие и сделай всё на этой ноге заново. На второй ноге доведи всё до конца, не опуская поднятую ногу.',
        safetyNote:
          'Выбери свободное место подальше от мебели, с нескользким полом. Ногу можно опустить в любой момент.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 100,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-05',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Statue Shapes',
        instruction:
          'Wiggle, dance or walk around the room while you count to five. On five, freeze in a funny shape and hold it still while you count to three. Do this three times with a new shape each time, and save your funniest shape for the last freeze.',
        safetyNote:
          'Move on a clear floor with space around you, and choose shapes you can hold without falling over.',
      },
      de: {
        title: 'Statuen-Posen',
        instruction:
          'Wackle, tanz oder geh durch den Raum und zähl dabei bis fünf. Bei fünf erstarrst du in einer lustigen Pose und hältst sie still, während du bis drei zählst. Mach das dreimal, jedes Mal mit einer neuen Pose, und heb dir deine lustigste Pose fürs letzte Mal auf.',
        safetyNote:
          'Beweg dich auf freiem Boden mit Platz um dich herum und such dir Posen aus, die du halten kannst, ohne umzufallen.',
      },
      ru: {
        title: 'Позы статуй',
        instruction:
          'Вертись, танцуй или ходи по комнате и считай до пяти. На счёт «пять» замри в смешной позе и не шевелись, пока считаешь до трёх. Сделай так три раза, каждый раз в новой позе, а самую смешную прибереги для последнего раза.',
        safetyNote:
          'Двигайся по свободному полу, где вокруг есть место, и выбирай позы, в которых сможешь удержаться и не упасть.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 110,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'movement-17',
    category: 'Movement',
    ageBands: ['9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Slow Descent',
        instruction:
          'Gravity wants you to drop — do not let it. From standing, lower yourself all the way to lying flat on the floor, then rise all the way back up. No knee, hand or elbow should thump down on the way. Then do it again, even slower and quieter than the first time.',
        safetyNote:
          'Use a clear spot with room to lie down, and stop whenever you want.',
      },
      de: {
        title: 'Der langsame Weg nach unten',
        instruction:
          'Die Schwerkraft will, dass du fällst – lass das nicht zu. Komm aus dem Stand ganz nach unten, bis du flach auf dem Boden liegst, und steh dann wieder ganz auf. Dabei soll kein Knie, keine Hand und kein Ellbogen auf den Boden knallen. Mach es dann ein zweites Mal – noch langsamer und leiser als beim ersten Mal.',
        safetyNote:
          'Such dir eine freie Stelle, an der du Platz zum Hinlegen hast, und hör auf, wann immer du möchtest.',
      },
      ru: {
        title: 'Медленный спуск',
        instruction:
          'Сила тяжести хочет тебя уронить — не поддавайся. Начни стоя: опускайся, пока не ляжешь на пол во весь рост, а потом поднимись и снова встань в полный рост. При этом ни колено, ни рука, ни локоть не должны стукнуться об пол. Потом повтори — на этот раз ещё медленнее и тише, чем в первый.',
        safetyNote:
          'Выбери свободное место, где можно лечь, и остановись, когда захочешь.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 120,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-02',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Tallest Tower',
        instruction:
          'Build a tower as tall as you can reach, using light, unbreakable things like plastic cups, blocks or small boxes. When it stands on its own, measure it by placing one hand above the other and counting your hands. Then stand back and admire it: your tower is that many hands tall.',
        safetyNote:
          'Use only light, unbreakable things you are allowed to use. Build on the floor, and stack only as high as you can reach without climbing.',
      },
      de: {
        title: 'Der höchste Turm',
        instruction:
          'Bau einen Turm, so hoch, wie du reichen kannst – aus leichten, unzerbrechlichen Dingen wie Plastikbechern, Bauklötzen oder kleinen Schachteln. Wenn er von allein steht, miss ihn: Leg immer eine Hand über die andere und zähl deine Hände. Tritt dann zurück und bewundere ihn: Dein Turm ist so viele Hände hoch.',
        safetyNote:
          'Nimm nur leichte, unzerbrechliche Dinge, die du benutzen darfst. Bau auf dem Boden und staple nur so hoch, wie du ohne Klettern reichen kannst.',
      },
      ru: {
        title: 'Самая высокая башня',
        instruction:
          'Построй башню высотой до того места, куда можешь дотянуться. Строй из лёгких небьющихся вещей: например, из пластиковых стаканчиков, кубиков или маленьких коробочек. Когда башня будет стоять сама, измерь её ладонями: прикладывай ладони одну над другой и считай их. А потом отойди и полюбуйся: теперь ты знаешь, сколько ладоней у твоей башни в высоту.',
        safetyNote:
          'Бери только лёгкие небьющиеся вещи, которыми тебе разрешено пользоваться. Строй на полу и только до той высоты, куда можешь дотянуться, ни на что не залезая.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 10,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-11',
    category: 'Creativity',
    ageBands: ['9–10'],
    durationSeconds: 420,
    content: {
      en: {
        title: 'The Paper Bridge',
        instruction:
          'Set two books a hand\'s width apart. With one sheet of paper and no tape or glue, make a bridge between them and test it with a small light object, like an eraser. If the paper bends, use what you saw to change its shape and test again. Design and test three different shapes, then compare how all three behaved in the test.',
        safetyNote:
          'You need two books, one sheet of paper and a small light object that you are allowed to use.',
      },
      de: {
        title: 'Die Papierbrücke',
        instruction:
          'Leg zwei Bücher eine Handbreit auseinander. Bau aus einem Blatt Papier, ohne Klebeband und ohne Kleber, eine Brücke dazwischen und teste sie mit einem kleinen, leichten Gegenstand, zum Beispiel einem Radiergummi. Wenn sich das Papier durchbiegt, ändere seine Form passend zu dem, was du beobachtet hast, und teste noch einmal. Entwirf und teste drei verschiedene Formen und vergleiche dann, wie sich alle drei im Test verhalten haben.',
        safetyNote:
          'Du brauchst zwei Bücher, ein Blatt Papier und einen kleinen, leichten Gegenstand, die du benutzen darfst.',
      },
      ru: {
        title: 'Бумажный мост',
        instruction:
          'Положи две книги на ширину ладони друг от друга. Сделай из одного листа бумаги, без скотча и клея, мост между ними и проверь его маленьким лёгким предметом, например ластиком. Если бумага прогнётся, измени её форму с учётом увиденного и проверь снова. Придумай и проверь три разные формы, а потом сравни, как повели себя все три при проверке.',
        safetyNote:
          'Тебе нужны две книги, один лист бумаги и маленький лёгкий предмет, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 20,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-05',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Sock Friend',
        instruction:
          'Put a clean sock on your hand and turn it into a sock friend. Give your friend a name and a voice all of its own. Then let your sock friend say one kind thing to you, out loud, in its own voice.',
        safetyNote:
          'Use a clean sock you are allowed to use, and keep it away from your face and mouth.',
      },
      de: {
        title: 'Sockenfreund',
        instruction:
          'Zieh dir eine saubere Socke über die Hand und mach daraus einen Sockenfreund. Gib deinem Freund einen Namen und eine ganz eigene Stimme. Dann lass deinen Sockenfreund dir laut und mit seiner eigenen Stimme einen netten Satz sagen.',
        safetyNote:
          'Nimm eine saubere Socke, die du benutzen darfst, und halte sie von Gesicht und Mund fern.',
      },
      ru: {
        title: 'Друг из носка',
        instruction:
          'Надень на руку чистый носок и сделай из него друга. Придумай другу имя и его собственный голос. Потом пусть твой друг из носка скажет тебе вслух своим голосом одну добрую фразу.',
        safetyNote:
          'Бери чистый носок, которым тебе разрешено пользоваться, и держи его подальше от лица и рта.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 30,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-08',
    category: 'Creativity',
    ageBands: ['9–10'],
    durationSeconds: 540,
    content: {
      en: {
        title: 'Four-Panel Comic',
        instruction:
          'Draw a comic with four panels in which a character solves one small everyday problem. Put one speech bubble in each panel. When all four panels have a drawing and a speech bubble, read your comic out loud.',
        safetyNote: 'You need a sheet of paper and a pencil that you are allowed to use.',
      },
      de: {
        title: 'Comic mit vier Feldern',
        instruction:
          'Male einen Comic mit vier Feldern, in dem eine Figur ein kleines Alltagsproblem löst. Setze in jedes Feld eine Sprechblase. Wenn alle vier Felder eine Zeichnung und eine Sprechblase haben, lies deinen Comic laut vor.',
        safetyNote: 'Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst.',
      },
      ru: {
        title: 'Комикс из четырёх кадров',
        instruction:
          'Нарисуй комикс из четырёх кадров, в котором герой решает одну небольшую бытовую задачу. В каждом кадре добавь по одному облачку с репликой. Когда во всех четырёх кадрах будут рисунок и реплика, прочитай свой комикс вслух.',
        safetyNote: 'Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 40,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-10',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Kind Monster',
        instruction:
          'Draw a monster that is not scary at all — maybe fluffy, maybe with a big smile. Give your monster one silly job it does around your home, like tickling socks or counting spoons. When your drawing is finished, look at your monster and say its silly job out loud.',
        safetyNote:
          'You need a sheet of paper and a pencil or crayons that you are allowed to use.',
      },
      de: {
        title: 'Das freundliche Monster',
        instruction:
          'Male ein Monster, das überhaupt nicht gruselig ist – vielleicht flauschig, vielleicht mit einem breiten Lächeln. Gib deinem Monster eine lustige Aufgabe, die es bei dir zu Hause erledigt, zum Beispiel Socken kitzeln oder Löffel zählen. Wenn deine Zeichnung fertig ist, schau dein Monster an und sag laut, was seine lustige Aufgabe ist.',
        safetyNote:
          'Du brauchst ein Blatt Papier und einen Stift oder Buntstifte, die du benutzen darfst.',
      },
      ru: {
        title: 'Добрый монстр',
        instruction:
          'Нарисуй совсем не страшного монстра — например, пушистого или с широкой улыбкой. Придумай своему монстру одну смешную работу у тебя дома: например, щекотать носки или считать ложки. Когда рисунок будет готов, посмотри на своего монстра и скажи вслух, какая у него смешная работа.',
        safetyNote:
          'Тебе нужен лист бумаги и карандаш или восковые мелки, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 50,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-01',
    category: 'Creativity',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 420,
    content: {
      en: {
        title: 'The Sound Map',
        instruction:
          'Sit in one spot and listen carefully for one minute. Then draw yourself in the middle of a sheet of paper. Around you, draw a small picture for every sound you heard: close sounds nearby, far sounds further out. When every sound has its picture, look at your map: everything you heard, all around you.',
        safetyNote:
          'You need a sheet of paper and a pencil that you are allowed to use.',
      },
      de: {
        title: 'Die Geräuschkarte',
        instruction:
          'Setz dich an einen Platz und hör eine Minute lang genau hin. Male dich dann in die Mitte eines Blatts Papier. Male um dich herum für jedes Geräusch, das du gehört hast, ein kleines Bild: nahe Geräusche dicht bei dir, ferne Geräusche weiter weg. Wenn jedes Geräusch sein Bild hat, schau dir deine Karte an: alles, was du gehört hast, rund um dich herum.',
        safetyNote:
          'Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst.',
      },
      ru: {
        title: 'Карта звуков',
        instruction:
          'Сядь в одном месте и одну минуту внимательно слушай. Потом нарисуй себя в середине листа бумаги. Вокруг себя нарисуй маленькую картинку для каждого услышанного звука: близкие звуки — рядом с собой, далёкие — подальше. Когда у каждого звука будет своя картинка, посмотри на свою карту: всё услышанное — вокруг тебя.',
        safetyNote:
          'Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 60,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-04',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 360,
    content: {
      en: {
        title: 'The Tiny World',
        instruction:
          'Choose one small toy and build it a tiny home on the floor. The home needs a door, a bed and a path that leads to the door. When all three are ready, walk your toy along the path, through the door and into its bed. Leave the home standing: your toy lives there now.',
        safetyNote:
          'Build with light, unbreakable things you are allowed to use, and keep your toy\'s home on the floor.',
      },
      de: {
        title: 'Die winzige Welt',
        instruction:
          'Such dir ein kleines Spielzeug aus und bau ihm auf dem Boden ein winziges Zuhause. Es braucht eine Tür, ein Bett und einen Weg, der zur Tür führt. Wenn alle drei fertig sind, lass dein Spielzeug den Weg entlanggehen, durch die Tür und bis in sein Bett. Lass das Zuhause stehen – dein Spielzeug wohnt jetzt dort.',
        safetyNote:
          'Bau mit leichten, unzerbrechlichen Dingen, die du benutzen darfst, und lass das Zuhause deines Spielzeugs auf dem Boden stehen.',
      },
      ru: {
        title: 'Крошечный мир',
        instruction:
          'Выбери одну маленькую игрушку и построй для неё на полу крошечный домик. В домике должны быть дверь, кровать и дорожка, которая ведёт к двери. Когда все три будут готовы, проведи игрушку по дорожке, через дверь — и в кровать. Пусть домик так и стоит: теперь в нём живёт твоя игрушка.',
        safetyNote:
          'Бери лёгкие небьющиеся вещи, которыми тебе разрешено пользоваться, и строй домик для игрушки на полу.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-13',
    category: 'Creativity',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 480,
    content: {
      en: {
        title: 'The Ordinary Object Museum',
        instruction:
          'Turn five ordinary things from your home into a museum. Arrange them in a line, and give each one a small written or drawn label with an interesting name and one invented fact. For example: Ancient Spoon, once used by a giant for breakfast. Then walk along your museum as its very first visitor, reading every label.',
        safetyNote:
          'Use things you are allowed to move that are not sharp, heavy or breakable.',
      },
      de: {
        title: 'Das Museum der Alltagsdinge',
        instruction:
          'Mach aus fünf gewöhnlichen Dingen von zu Hause ein Museum. Stell sie in einer Reihe auf und gib jedem Ding ein kleines Schild – geschrieben oder gemalt – mit einem spannenden Namen und einer erfundenen Tatsache. Zum Beispiel: Uralter Löffel, mit dem einst ein Riese gefrühstückt hat. Geh dann als allererster Gast an deinem Museum entlang und lies jedes Schild.',
        safetyNote:
          'Nimm Dinge, die du bewegen darfst und die nicht scharf, schwer oder zerbrechlich sind.',
      },
      ru: {
        title: 'Музей обычных вещей',
        instruction:
          'Преврати пять обычных вещей из дома в музей. Расставь их в ряд и сделай для каждой маленькую табличку — написанную или нарисованную — с интересным названием и одним выдуманным фактом. Например: «Древняя ложка. Когда-то ею завтракал великан». Потом пройди вдоль своего музея как самый первый посетитель и прочитай каждую табличку.',
        safetyNote:
          'Бери вещи, которые тебе разрешено переставлять, — не острые, не тяжёлые и не бьющиеся.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-09',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Invent a Sound',
        instruction:
          'Pick two safe things, like a spoon and a plastic cup, and use them to invent your own sound. Practise until the same sound comes out three times in a row. When the third one sounds just like the first two, that sound is yours!',
        safetyNote:
          'Use two unbreakable things you are allowed to use, and do not make your sound right next to your ears.',
      },
      de: {
        title: 'Erfinde ein Geräusch',
        instruction:
          'Such dir zwei sichere Dinge aus, zum Beispiel einen Löffel und einen Plastikbecher, und erfinde damit dein eigenes Geräusch. Übe, bis dir dasselbe Geräusch dreimal hintereinander gelingt. Wenn das dritte genauso klingt wie die ersten beiden, ist das dein Geräusch!',
        safetyNote:
          'Nimm zwei unzerbrechliche Dinge, die du benutzen darfst, und mach dein Geräusch nicht direkt neben deinen Ohren.',
      },
      ru: {
        title: 'Придумай звук',
        instruction:
          'Выбери две безопасные вещи, например ложку и пластиковый стаканчик, и придумай с их помощью свой собственный звук. Тренируйся, пока один и тот же звук не получится три раза подряд. Когда третий прозвучит точно так же, как первые два, — это твой звук!',
        safetyNote:
          'Бери две небьющиеся вещи, которыми тебе разрешено пользоваться, и не делай свой звук прямо возле ушей.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 90,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-12',
    category: 'Creativity',
    ageBands: ['9–10'],
    durationSeconds: 480,
    content: {
      en: {
        title: 'The Skill Guide',
        instruction:
          'Pick one small skill you know well, like folding a paper plane or drawing a cat in five lines. Design a one-page guide to it: every step in order, numbered, with a drawing or a few words for each. When the last step is in place, look at your finished guide: something you know how to do, set out step by step.',
        safetyNote:
          'You need a sheet of paper and a pencil that you are allowed to use.',
      },
      de: {
        title: 'Die Schritt-für-Schritt-Anleitung',
        instruction:
          'Such dir eine kleine Sache aus, die du gut kannst, zum Beispiel einen Papierflieger falten oder eine Katze mit fünf Strichen malen. Gestalte dazu eine Anleitung auf einer Seite: jeder Schritt der Reihe nach, nummeriert und mit einer Zeichnung oder ein paar Wörtern. Wenn auch der letzte Schritt auf dem Blatt ist, schau dir deine fertige Anleitung an: etwas, das du kannst, Schritt für Schritt erklärt.',
        safetyNote:
          'Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst.',
      },
      ru: {
        title: 'Шаг за шагом',
        instruction:
          'Выбери одно небольшое дело, которое у тебя хорошо получается: например, сложить бумажный самолётик или нарисовать кошку пятью линиями. Сделай к нему инструкцию на одном листе: все шаги по порядку, с номерами, и у каждого — рисунок или несколько слов. Когда на листе появится последний шаг, посмотри на готовую инструкцию: то, что ты умеешь, расписано шаг за шагом.',
        safetyNote:
          'Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 100,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-06',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Blanket Den',
        instruction:
          'Spread one light blanket over a low chair to make a small den, and leave one side open. Bring three things inside that make it your own place. Then stay inside for one whole song you sing or one whole story you tell yourself.',
        adultInvolvementNote:
          'An adult stays nearby while you build your den and sit inside it, and is there if you need them.',
        safetyNote:
          'Use one light blanket over a low chair that stands firmly on the floor. Keep one side open so you can get out easily, and do not climb on the chair.',
      },
      de: {
        title: 'Die Deckenhöhle',
        instruction:
          'Leg eine leichte Decke über einen niedrigen Stuhl, sodass eine kleine Höhle entsteht, und lass eine Seite offen. Bring drei Dinge hinein, die sie zu deinem eigenen Ort machen. Bleib dann drinnen, solange du ein ganzes Lied singst oder dir selbst eine ganze Geschichte erzählst.',
        adultInvolvementNote:
          'Ein Erwachsener bleibt in der Nähe, während du deine Höhle baust und darin sitzt, und ist da, wenn du ihn brauchst.',
        safetyNote:
          'Nimm eine leichte Decke und einen niedrigen Stuhl, der fest auf dem Boden steht. Lass eine Seite offen, damit du leicht herauskommst, und klettere nicht auf den Stuhl.',
      },
      ru: {
        title: 'Шалаш из одеяла',
        instruction:
          'Накинь одно лёгкое одеяло на низкий стул — получится маленький шалаш. Одну сторону оставь открытой. Принеси внутрь три вещи, которые сделают шалаш твоим собственным местом. Потом оставайся внутри, пока не споёшь целую песню или не расскажешь себе целую историю.',
        adultInvolvementNote:
          'Взрослый остаётся рядом, пока ты строишь шалаш и сидишь в нём, и поможет, если понадобится.',
        safetyNote:
          'Возьми одно лёгкое одеяло и низкий стул, который устойчиво стоит на полу. Оставь одну сторону открытой, чтобы легко выбраться, и не залезай на стул.',
      },
    },
    adultInvolvement: 'Adult nearby required',
    safetyNoteRequired: true,
    catalogOrder: 110,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'creativity-14',
    category: 'Creativity',
    ageBands: ['9–10'],
    durationSeconds: 540,
    content: {
      en: {
        title: 'The Code Maker',
        instruction:
          'Invent your own way of writing: a new symbol for every letter, or a rule that changes each letter. Write one short, friendly message in your new writing. On a second sheet, make a key that shows how your writing works. Then put the message and the key side by side: your own way of writing, with the key to read it.',
        safetyNote:
          'You need two sheets of paper and a pencil that you are allowed to use.',
      },
      de: {
        title: 'Deine eigene Schrift',
        instruction:
          'Erfinde deine eigene Schrift: ein neues Zeichen für jeden Buchstaben oder eine Regel, die jeden Buchstaben verändert. Schreib in deiner neuen Schrift eine kurze, freundliche Nachricht. Mach auf einem zweiten Blatt einen Schlüssel, der zeigt, wie deine Schrift funktioniert. Leg dann die Nachricht und den Schlüssel nebeneinander: deine eigene Schrift – mit dem Schlüssel, mit dem man sie lesen kann.',
        safetyNote:
          'Du brauchst zwei Blätter Papier und einen Stift, den du benutzen darfst.',
      },
      ru: {
        title: 'Свой способ письма',
        instruction:
          'Придумай свой способ письма: новый значок для каждой буквы или правило, которое меняет каждую букву. Напиши этим способом одну короткую дружелюбную записку. На втором листе сделай ключ, который показывает, как работает твой способ письма. Потом положи записку и ключ рядом: твой собственный способ письма — и ключ, по которому её можно прочитать.',
        safetyNote:
          'Тебе нужны два листа бумаги и карандаш, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 120,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-03',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Table Captain',
        instruction:
          'You are the Table Captain. An adult gives you only the things that are safe for you to carry. Set one complete place first, then make every other place match it. When every place is ready, stand back, check the whole table and announce that it is ready.',
        adultInvolvementNote:
          'An adult chooses and hands you the safe items you may carry.',
        safetyNote:
          'Carry only light, unbreakable items the adult gives you. Keep both feet on the floor, and leave anything hot, sharp or heavy to the adult.',
      },
      de: {
        title: 'Tischkapitän',
        instruction:
          'Du bist Tischkapitän. Ein Erwachsener gibt dir nur die Sachen, die du sicher tragen kannst. Deck zuerst einen ganzen Platz und mach dann alle anderen Plätze genauso. Wenn jeder Platz bereit ist, tritt zurück, prüf den ganzen Tisch und verkünde, dass er bereit ist.',
        adultInvolvementNote:
          'Ein Erwachsener sucht die sicheren Sachen aus, die du tragen darfst, und gibt sie dir.',
        safetyNote:
          'Trag nur leichte, unzerbrechliche Sachen, die dir der Erwachsene gibt. Bleib mit beiden Füßen auf dem Boden und überlass alles Heiße, Scharfe oder Schwere dem Erwachsenen.',
      },
      ru: {
        title: 'Капитан стола',
        instruction:
          'Ты — капитан стола. Взрослый даёт тебе только те вещи, которые тебе безопасно нести. Сначала подготовь одно место целиком, а потом сделай все остальные места точно такими же. Когда все места будут готовы, отойди, проверь весь стол и объяви, что стол готов.',
        adultInvolvementNote:
          'Взрослый выбирает безопасные вещи, которые тебе можно нести, и даёт их тебе.',
        safetyNote:
          'Неси только лёгкие небьющиеся вещи, которые даёт тебе взрослый. Стой обеими ногами на полу, а всё горячее, острое или тяжёлое оставь взрослому.',
      },
    },
    adultInvolvement: 'Adult participation required',
    safetyNoteRequired: true,
    catalogOrder: 10,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-15',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Lost-and-Found Box',
        instruction:
          'Make a lost-and-found box for your home. Put an empty box or basket beside a place everyone walks past. Draw a sock or toy on paper and put the picture beside the box as its sign. Walk through one room to see if anything belongs in the box. Then look at your open box and sign: ready to use, even with nothing inside.',
        safetyNote:
          'Use a light box or basket, paper and crayons you are allowed to use. Keep the box out of the walking space, and leave anything sharp, heavy, breakable or unfamiliar where it is.',
      },
      de: {
        title: 'Die Fundkiste',
        instruction:
          'Mach eine Fundkiste für euer Zuhause. Stell eine leere Kiste oder einen Korb neben einen Ort, an dem alle vorbeigehen. Male eine Socke oder ein Spielzeug auf Papier und leg das Bild als Schild neben die Kiste. Geh durch einen Raum und schau, ob etwas in die Kiste gehört. Schau dir dann deine offene Kiste mit ihrem Schild an: bereit zum Benutzen, auch wenn noch nichts drin ist.',
        safetyNote:
          'Nimm eine leichte Kiste oder einen leichten Korb, Papier und Buntstifte, die du benutzen darfst. Stell die Kiste so hin, dass sie nicht im Weg steht, und lass alles Scharfe, Schwere, Zerbrechliche oder Unbekannte liegen, wo es ist.',
      },
      ru: {
        title: 'Коробка находок',
        instruction:
          'Сделай коробку находок для вашего дома. Поставь пустую коробку или корзинку рядом с местом, мимо которого все проходят. Нарисуй на бумаге носок или игрушку и положи рисунок рядом с коробкой — это будет её табличка. Пройди по одной комнате и посмотри, не найдётся ли что-нибудь для коробки. Потом посмотри на свою открытую коробку с табличкой: она готова, даже если внутри пока ничего нет.',
        safetyNote:
          'Бери лёгкую коробку или корзинку, бумагу и восковые мелки, которыми тебе разрешено пользоваться. Ставь коробку так, чтобы она не мешала проходу, а всё острое, тяжёлое, бьющееся или незнакомое оставляй на месте.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 20,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-10',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Napkin Fold Five',
        instruction:
          'Fold five square napkins or cloths into matching triangles. Fold each one corner to corner, then stack it with the point facing the same way as the others. When the fifth triangle is on top, line up the edges and look at your finished stack: five matching folds, ready to use.',
        safetyNote:
          'Use five clean napkins or cloths you are allowed to use, and fold them on a table or the floor.',
      },
      de: {
        title: 'Fünf Servietten falten',
        instruction:
          'Falte fünf quadratische Servietten oder Tücher zu gleichen Dreiecken. Falte jedes Stück von Ecke zu Ecke und leg es dann mit der Spitze in dieselbe Richtung wie die anderen auf den Stapel. Wenn das fünfte Dreieck oben liegt, richte die Kanten genau aus und schau dir deinen fertigen Stapel an: fünf gleiche Dreiecke, bereit zum Benutzen.',
        safetyNote:
          'Nimm fünf saubere Servietten oder Tücher, die du benutzen darfst, und falte sie auf einem Tisch oder auf dem Boden.',
      },
      ru: {
        title: 'Сложи пять салфеток',
        instruction:
          'Сложи пять квадратных салфеток или кусочков ткани в одинаковые треугольники. Складывай их по одному уголок к уголку и клади в стопку так, чтобы острый конец смотрел туда же, куда и у остальных. Когда пятый треугольник окажется сверху, выровняй края и посмотри на готовую стопку: пять одинаковых треугольников, готовых к делу.',
        safetyNote:
          'Бери пять чистых салфеток или кусочков ткани, которыми тебе разрешено пользоваться, и складывай их на столе или на полу.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 30,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-12',
    category: 'Helping at Home',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The One-Look Sign',
        instruction:
          'Choose one shared shelf, box or drawer. Design one sign that shows at a glance what belongs there: draw it, write it, or use both. Leave everything inside exactly where it is, and put your sign where it can be seen easily. Now anyone can see what belongs there right away.',
        safetyNote:
          'Choose a place you can reach with both feet on the floor. Use paper and drawing or writing tools you are allowed to use.',
      },
      de: {
        title: 'Auf einen Blick',
        instruction:
          'Such dir ein Regal, eine Kiste oder eine Schublade aus, die ihr gemeinsam benutzt. Gestalte ein Schild, das auf einen Blick zeigt, was dorthin gehört: Mal es, schreib es oder mach beides. Lass alles, was darin ist, genau so, wie es ist, und bring dein Schild dort an, wo man es gut sehen kann. Jetzt sieht jeder sofort, was dorthin gehört.',
        safetyNote:
          'Such dir einen Platz, den du mit beiden Füßen auf dem Boden erreichst. Nimm Papier und Stifte zum Malen oder Schreiben, die du benutzen darfst.',
      },
      ru: {
        title: 'Понятно с первого взгляда',
        instruction:
          'Выбери одну полку, коробку или ящик, которыми пользуется вся семья. Придумай одну табличку, по которой с первого взгляда понятно, что там хранится: нарисуй, напиши или сделай и то и другое. Всё, что внутри, оставь как есть, а табличку размести там, где её хорошо видно. Теперь любой сразу видит, что там хранится.',
        safetyNote:
          'Выбери место, до которого достаёшь, стоя обеими ногами на полу. Бери бумагу и карандаши или ручки, которыми тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 40,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-14',
    category: 'Helping at Home',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Ready Corner',
        instruction:
          'Make a place where your family can start an activity straight away. Choose one activity your family often does, such as drawing, reading, a game or building. Gather everything that activity needs in one place. Stand back and look at the place you made ready: anyone can begin without looking for anything.',
        safetyNote:
          'Use only light, safe things you are allowed to move. Choose a place you can reach without climbing, and keep walking routes clear.',
      },
      de: {
        title: 'Die Startklar-Ecke',
        instruction:
          'Richte einen Platz ein, an dem deine Familie sofort mit etwas loslegen kann. Such dir eine Sache aus, die ihr oft macht, zum Beispiel malen, lesen, ein Spiel spielen oder bauen. Leg alles, was man dafür braucht, an einem Platz zusammen. Tritt dann zurück und schau dir den Platz an, den du startklar gemacht hast: Jeder kann anfangen, ohne etwas suchen zu müssen.',
        safetyNote:
          'Nimm nur leichte, sichere Dinge, die du bewegen darfst. Such dir einen Platz, den du ohne Klettern erreichst, und halte die Laufwege frei.',
      },
      ru: {
        title: 'Уголок наготове',
        instruction:
          'Подготовь место, где твоя семья сможет сразу чем-нибудь заняться. Выбери одно дело, которое вы часто делаете: например, рисовать, читать, играть в игру или строить. Сложи в одном месте всё, что для этого нужно. Потом отойди и посмотри на подготовленное место: любой может сразу начать — и ничего не придётся искать.',
        safetyNote:
          'Бери только лёгкие безопасные вещи, которые тебе разрешено переносить. Выбери место, до которого достаёшь, ни на что не залезая, и следи, чтобы проходы оставались свободными.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 50,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-09',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Shoe Line',
        instruction:
          'Go to one place where shoes are kept. Match the shoes into complete pairs, put each pair side by side, and turn all the toes the same way. If one shoe has no partner, leave it at the end of the line. When every complete pair points the same way, step back and look at the shoe line you made ready.',
        safetyNote:
          'Move only shoes you are allowed to touch. Keep them inside the usual shoe area and keep the walking path clear.',
      },
      de: {
        title: 'Die Schuhreihe',
        instruction:
          'Geh zu einer Stelle, an der bei euch Schuhe stehen. Mach aus den Schuhen vollständige Paare, stell jedes Paar nebeneinander und dreh alle Schuhspitzen in dieselbe Richtung. Wenn ein Schuh keinen Partner hat, lass ihn am Ende der Reihe stehen. Wenn jedes vollständige Paar in dieselbe Richtung zeigt, tritt zurück und schau dir deine Schuhreihe an, die jetzt bereitsteht.',
        safetyNote:
          'Beweg nur Schuhe, die du anfassen darfst. Lass sie dort, wo die Schuhe sonst auch stehen, und halte den Durchgang frei.',
      },
      ru: {
        title: 'Обувь в ряд',
        instruction:
          'Выбери одно место, где у вас обычно стоит обувь, и подойди туда. Составь из обуви полные пары, поставь обувь каждой пары рядом и поверни все пары носами в одну сторону. Если у какого-то ботинка нет пары, оставь его в конце ряда. Когда все полные пары будут смотреть в одну сторону, отойди и посмотри на свой ряд обуви: теперь он готов.',
        safetyNote:
          'Переставляй только ту обувь, которую тебе разрешено трогать. Оставляй её на обычном месте для обуви и следи, чтобы проход оставался свободным.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 60,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-11',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'The Table Surprise',
        instruction:
          'Choose one person at home and make a special place for them at the table. Fold a napkin or piece of paper into a simple shape and put it at their place. Set their spoon and an empty, unbreakable cup beside the shape. Look at the place you made just for them.',
        safetyNote:
          'Use items you are allowed to move and can carry easily. Choose a place you can reach with both feet on the floor.',
      },
      de: {
        title: 'Die Tischüberraschung',
        instruction:
          'Such dir eine Person bei dir zu Hause aus und richte ihr einen besonderen Platz am Tisch her. Falte eine Serviette oder ein Stück Papier zu einer einfachen Form und leg sie an ihren Platz. Leg ihren Löffel und einen leeren, unzerbrechlichen Becher neben die Form. Schau dir den Platz an, den du nur für sie hergerichtet hast.',
        safetyNote:
          'Nimm Sachen, die du bewegen darfst und gut tragen kannst. Such dir einen Platz aus, den du mit beiden Füßen auf dem Boden erreichst.',
      },
      ru: {
        title: 'Сюрприз за столом',
        instruction:
          'Выбери кого-нибудь из домашних и подготовь для этого человека особое место за столом. Сложи салфетку или листок бумаги в простую фигурку и положи её на это место. Рядом положи ложку и поставь пустую небьющуюся кружку. Посмотри на особое место — оно готово специально для этого человека.',
        safetyNote:
          'Бери вещи, которые тебе разрешено переставлять и которые легко нести. Выбери место, до которого достаёшь, стоя обеими ногами на полу.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-07',
    category: 'Helping at Home',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Ready for Tomorrow',
        instruction:
          'Gather the things you will need tomorrow in one place near the door, such as your bag, jacket and water bottle. When everything you need is together, look at your ready pile: tomorrow\'s things, all waiting in one place.',
        safetyNote:
          'Move only your own light things, and keep the doorway and walking space clear.',
      },
      de: {
        title: 'Bereit für morgen',
        instruction:
          'Leg die Sachen, die du morgen brauchst, an einem Platz in der Nähe der Tür zusammen, zum Beispiel deine Tasche, deine Jacke und deine Trinkflasche. Wenn alles zusammen ist, was du brauchst, schau dir an, was dort bereitliegt: deine Sachen für morgen, die alle an einem Platz auf dich warten.',
        safetyNote:
          'Beweg nur deine eigenen leichten Sachen und halte den Eingang und den Durchgang frei.',
      },
      ru: {
        title: 'Всё готово на завтра',
        instruction:
          'Сложи в одно место у двери вещи, которые понадобятся тебе завтра, например сумку, куртку и бутылку для воды. Когда всё нужное будет вместе, посмотри, что получилось: всё на завтра уже ждёт тебя в одном месте.',
        safetyNote:
          'Переноси только свои лёгкие вещи и следи, чтобы у двери и в проходе оставалось свободно.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-13',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Water Round',
        instruction:
          'This is your Water Round. An adult chooses unbreakable cups, adds a small amount of cool water, and prepares one steady place for each cup. Carry one cup at a time with both hands and set it on a ready place. When every ready place has a cup, your round is complete.',
        adultInvolvementNote:
          'An adult chooses unbreakable cups, controls the water amount and prepares the stable places before the round starts.',
        safetyNote:
          'Walk slowly on a clear, dry route. Do not run. If water spills, stop and tell an adult so the floor can be made safe.',
      },
      de: {
        title: 'Die Wasserrunde',
        instruction:
          'Das ist deine Wasserrunde. Ein Erwachsener sucht unzerbrechliche Becher aus, gießt ein wenig kühles Wasser hinein und bereitet für jeden Becher einen standfesten Platz vor. Trag immer nur einen Becher mit beiden Händen und stell ihn auf einen vorbereiteten Platz. Wenn auf jedem vorbereiteten Platz ein Becher steht, ist deine Runde komplett.',
        adultInvolvementNote:
          'Ein Erwachsener sucht unzerbrechliche Becher aus, bestimmt, wie viel Wasser hineinkommt, und bereitet die standfesten Plätze vor, bevor die Runde beginnt.',
        safetyNote:
          'Geh langsam auf einem freien, trockenen Weg. Renn nicht. Wenn Wasser danebengeht, bleib stehen und sag einem Erwachsenen Bescheid, damit der Boden wieder sicher wird.',
      },
      ru: {
        title: 'Маршрут с водой',
        instruction:
          'Это твой маршрут с водой. Взрослый выбирает небьющиеся кружки, наливает в них немного прохладной воды и готовит для каждой кружки устойчивое место. Неси по одной кружке двумя руками и ставь её на готовое место. Когда на каждом готовом месте будет стоять кружка, твой маршрут пройден.',
        adultInvolvementNote:
          'Взрослый выбирает небьющиеся кружки, решает, сколько налить воды, и готовит устойчивые места до начала маршрута.',
        safetyNote:
          'Иди медленно по свободному сухому пути. Не бегай. Если вода прольётся, остановись и скажи взрослому, чтобы пол снова стал безопасным.',
      },
    },
    adultInvolvement: 'Adult participation required',
    safetyNoteRequired: true,
    catalogOrder: 90,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-09',
    category: 'Learning',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Which One Floats?',
        instruction:
          'An adult puts a little cool water in a bowl and gives you three safe, unbreakable things that can get wet. Before each test, hold one thing and say what you think: float or sink? Place it gently on the water and let go. Watch what happens, then take it out before the next test. Test all three, then say which guesses matched what you saw and whether anything surprised you.',
        adultInvolvementNote:
          'An adult chooses three safe, unbreakable things that can get wet, puts a little cool water in a steady bowl, and stays with you while you test.',
        safetyNote:
          'Use only the things the adult gives you. Keep the bowl on a low, steady surface, and tell an adult if water spills so that nobody slips.',
      },
      de: {
        title: 'Was schwimmt?',
        instruction:
          'Ein Erwachsener füllt ein wenig kühles Wasser in eine Schüssel und gibt dir drei sichere, unzerbrechliche Dinge, die nass werden dürfen. Jedes Mal, bevor du etwas ausprobierst, nimm ein Ding in die Hand und sag, was du glaubst: Schwimmt es oder geht es unter? Leg es vorsichtig aufs Wasser und lass los. Schau, was passiert, und nimm es wieder heraus, bevor du das nächste ausprobierst. Probier alle drei aus und sag dann, bei welchen es so gekommen ist, wie du geglaubt hast, und ob dich etwas überrascht hat.',
        adultInvolvementNote:
          'Ein Erwachsener sucht drei sichere, unzerbrechliche Dinge aus, die nass werden dürfen, füllt ein wenig kühles Wasser in eine standfeste Schüssel und bleibt bei dir, während du ausprobierst.',
        safetyNote:
          'Nimm nur die Dinge, die dir der Erwachsene gibt. Stell die Schüssel auf eine niedrige, feste Fläche und sag einem Erwachsenen Bescheid, wenn Wasser danebengeht, damit niemand ausrutscht.',
      },
      ru: {
        title: 'Что плавает?',
        instruction:
          'Взрослый наливает в миску немного прохладной воды и даёт тебе три безопасные небьющиеся вещи, которые можно намочить. Каждый раз сначала возьми одну вещь в руку и скажи, как думаешь: будет она плавать или утонет? Осторожно положи её на воду и отпусти. Посмотри, что будет, и достань её, прежде чем пробовать следующую. Попробуй все три, а потом скажи, какие догадки совпали с тем, что получилось, и удивило ли тебя что-нибудь.',
        adultInvolvementNote:
          'Взрослый выбирает три безопасные небьющиеся вещи, которые можно намочить, наливает немного прохладной воды в устойчивую миску и остаётся с тобой, пока ты пробуешь.',
        safetyNote:
          'Бери только те вещи, которые даёт взрослый. Ставь миску на низкую устойчивую поверхность и скажи взрослому, если вода прольётся, чтобы никто не поскользнулся.',
      },
    },
    adultInvolvement: 'Adult participation required',
    safetyNoteRequired: true,
    catalogOrder: 10,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-07',
    category: 'Learning',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Which Lands First?',
        instruction:
          'Take one sheet of paper you are allowed to use and tear it in half. Leave one half flat and crumple the other into a tight ball. Hold both at the same height, let go at the same moment, and watch which one lands first. Do it three times. When you have finished the third drop, say why you think it happens.',
        safetyNote:
          'Use paper you are allowed to use, and let go at your own hand height while standing on the floor. Do not climb on anything to drop from higher.',
      },
      de: {
        title: 'Was landet zuerst?',
        instruction:
          'Nimm ein Blatt Papier, das du benutzen darfst, und reiß es in zwei Hälften. Lass die eine Hälfte flach und knülle die andere zu einer festen Kugel. Halte beide auf gleicher Höhe, lass sie im selben Moment los und schau, was zuerst landet. Mach das dreimal. Wenn du den dritten Versuch gemacht hast, sag, warum das deiner Meinung nach so ist.',
        safetyNote:
          'Nimm Papier, das du benutzen darfst, und lass es auf deiner eigenen Handhöhe los, während du auf dem Boden stehst. Klettere nicht auf etwas, um von höher oben loszulassen.',
      },
      ru: {
        title: 'Что упадёт первым?',
        instruction:
          'Возьми лист бумаги, которым тебе разрешено пользоваться, и разорви его пополам. Одну половинку оставь ровной, а вторую сомни в плотный комок. Держи обе на одной высоте, отпусти в один и тот же момент и посмотри, что упадёт первым. Повтори три раза. Когда закончишь третий раз, скажи, почему, как тебе кажется, так получается.',
        safetyNote:
          'Бери бумагу, которой тебе разрешено пользоваться, и отпускай на высоте своей руки, стоя на полу. Не залезай ни на что, чтобы бросить с большей высоты.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 20,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-05',
    category: 'Learning',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'The Upside-Down Room',
        instruction:
          'Lie on your back on the floor and look up at the room from there. Find three things that look strange or different when you see them this way. When you have found all three, sit up slowly and say which one looked strangest.',
        safetyNote:
          'Lie down on a clear floor with space around you, and sit up slowly when you finish.',
      },
      de: {
        title: 'Das Zimmer steht kopf',
        instruction:
          'Leg dich auf den Rücken auf den Boden und schau von dort nach oben in den Raum. Finde drei Dinge, die von hier aus seltsam oder ganz anders aussehen. Wenn du alle drei gefunden hast, setz dich langsam auf und sag, welches am seltsamsten aussah.',
        safetyNote:
          'Leg dich auf einen freien Boden mit Platz um dich herum und setz dich am Ende langsam auf.',
      },
      ru: {
        title: 'Комната вверх ногами',
        instruction:
          'Ляг на спину на пол и посмотри на комнату оттуда. Найди три предмета, которые отсюда выглядят странно или совсем иначе. Когда найдёшь все три, медленно сядь и скажи, какой из них выглядел страннее всего.',
        safetyNote:
          'Ложись на свободный пол, где вокруг есть место, и в конце садись медленно.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 30,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-12',
    category: 'Learning',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Jumping Thumb',
        instruction:
          'Hold one thumb up at arm\'s length and look past it at something across the room. Close one eye, then the other, and switch back and forth. Notice how your thumb seems to jump sideways even though your hand stays still. Move your thumb slowly closer while you keep switching eyes. Watch how the jump changes and find where it looks biggest.',
        safetyNote:
          'Do this sitting or standing still. Keep your thumb in front of you and do not bring it close enough to touch your eyes.',
      },
      de: {
        title: 'Der springende Daumen',
        instruction:
          'Halte einen Daumen mit ausgestrecktem Arm hoch und schau an ihm vorbei auf etwas auf der anderen Seite des Raums. Mach ein Auge zu, dann das andere, und wechsle hin und her. Achte darauf, wie dein Daumen zur Seite zu springen scheint, obwohl deine Hand still bleibt. Bring deinen Daumen langsam näher, während du weiter die Augen wechselst. Schau, wie sich der Sprung verändert, und finde heraus, wo er am größten aussieht.',
        safetyNote:
          'Mach das im Sitzen oder ruhig im Stehen. Halte deinen Daumen vor dir und bring ihn nicht so nah, dass er deine Augen berührt.',
      },
      ru: {
        title: 'Прыгающий большой палец',
        instruction:
          'Вытяни руку вперёд, подними большой палец и посмотри мимо него на что-нибудь в другом конце комнаты. Закрой один глаз, потом другой и закрывай их по очереди. Заметь, как палец будто прыгает в сторону, хотя рука стоит на месте. Медленно приближай палец к себе и продолжай закрывать глаза по очереди. Смотри, как меняется этот прыжок, и найди место, где он кажется самым большим.',
        safetyNote:
          'Делай это сидя или стоя неподвижно. Держи палец перед собой и не подноси его так близко, чтобы он касался глаз.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 40,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-08',
    category: 'Learning',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'How Many Steps?',
        instruction:
          'Guess how many of your own steps it takes to cross the room. Say your guess, then walk across and count every step out loud. Choose a shorter clear route and guess again before you walk it, then count those steps out loud too. When both walks are done, compare each guess with the number you counted. Were they close, far apart, or different from what you expected?',
        safetyNote:
          'Walk at a normal pace on a clear floor, and choose routes with nothing in the way.',
      },
      de: {
        title: 'Wie viele Schritte?',
        instruction:
          'Schätze, wie viele Schritte du selbst brauchst, um durch den Raum zu gehen. Sag deine Schätzung, geh dann los und zähl jeden Schritt laut mit. Such dir einen kürzeren freien Weg aus und schätze noch einmal, bevor du ihn gehst, und zähl auch diese Schritte laut mit. Wenn du beide Wege gegangen bist, vergleiche jede Schätzung mit der Zahl, die du gezählt hast. Lagen sie nah beieinander, weit auseinander oder anders, als du gedacht hast?',
        safetyNote:
          'Geh in normalem Tempo auf freiem Boden und such dir Wege aus, auf denen nichts im Weg steht.',
      },
      ru: {
        title: 'Сколько шагов?',
        instruction:
          'Угадай, сколько твоих шагов нужно, чтобы перейти через комнату. Назови это число, потом пройди и считай вслух каждый шаг. Выбери путь покороче, где ничего не мешает, снова угадай число, прежде чем идти, и тоже считай шаги вслух. Когда пройдёшь оба пути, сравни каждую догадку с числом шагов, которое получилось. Получилось близко, далеко или совсем не так, как ожидалось?',
        safetyNote:
          'Иди обычным шагом по свободному полу и выбирай пути, где ничего не мешает.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 50,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-02',
    category: 'Learning',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Near and Far',
        instruction:
          'Sit somewhere comfortable and stay still. Listen until you have picked out three different sounds, from inside the room or outside it. Now work them out by ear alone: which of the three is closest to you, and which one is furthest away?',
        safetyNote:
          'Stay sitting where you are, in the rooms you are allowed to be in.',
      },
      de: {
        title: 'Nah und fern',
        instruction:
          'Setz dich an einen bequemen Platz und bleib still sitzen. Hör hin, bis du drei verschiedene Geräusche herausgehört hast – ob aus dem Raum oder von draußen. Finde jetzt nur mit den Ohren heraus: Welches der drei ist dir am nächsten, und welches ist am weitesten weg?',
        safetyNote:
          'Bleib sitzen, wo du bist, in den Räumen, in denen du sein darfst.',
      },
      ru: {
        title: 'Близко и далеко',
        instruction:
          'Сядь где-нибудь поудобнее и не двигайся. Слушай, пока не различишь три разных звука — в комнате или снаружи. А теперь определи только на слух: какой из трёх звуков ближе всего к тебе, а какой — дальше всех?',
        safetyNote:
          'Оставайся сидеть на месте и делай это только в комнатах, где тебе можно находиться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 60,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-04',
    category: 'Learning',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Roll It Down',
        instruction:
          'Lean a book against something low to make a small ramp on the floor. Find three different round things that roll, and make three small paper markers. Before you roll anything, say which one you think will travel furthest. Choose one starting place on the ramp. Roll the first thing from there, put one marker where it stops, then move it aside. Repeat from the same starting place with the other two. Look at the three markers: did the one you picked travel furthest?',
        safetyNote:
          'Build the ramp low and on the floor. Use only light, unbreakable things and paper you are allowed to use, and do not stand or lean on the ramp.',
      },
      de: {
        title: 'Lass es rollen',
        instruction:
          'Lehne ein Buch an etwas Niedriges, so entsteht eine kleine Rampe auf dem Boden. Such dir drei verschiedene runde Dinge, die rollen, und mach drei kleine Markierungen aus Papier. Bevor du etwas rollen lässt, sag, welches deiner Meinung nach am weitesten kommt. Such dir auf der Rampe eine Startstelle aus. Lass das erste Ding von dort hinunterrollen, leg eine Markierung dorthin, wo es liegen bleibt, und nimm das Ding dann zur Seite. Mach dasselbe mit den anderen beiden, immer von derselben Startstelle aus. Schau dir die drei Markierungen an: Ist das Ding, das du ausgesucht hast, am weitesten gekommen?',
        safetyNote:
          'Bau die Rampe niedrig und auf dem Boden. Nimm nur leichte, unzerbrechliche Dinge und Papier, das du benutzen darfst, und stell dich nicht auf die Rampe und lehn dich nicht daran.',
      },
      ru: {
        title: 'Скати с горки',
        instruction:
          'Прислони книгу к чему-нибудь низкому — получится маленькая горка на полу. Найди три разных круглых предмета, которые катятся, и сделай из бумаги три маленькие метки. Прежде чем что-нибудь катить, скажи, как думаешь: какой предмет укатится дальше всех? Выбери на горке одно место для старта. Скати оттуда первый предмет, положи метку туда, где он остановится, и отодвинь предмет в сторону. Повтори с двумя другими — каждый раз с того же места старта. Посмотри на три метки: совпала ли твоя догадка с тем, что получилось?',
        safetyNote:
          'Делай горку низкой и на полу. Бери только лёгкие небьющиеся предметы и бумагу, которыми тебе разрешено пользоваться, не вставай на горку и не опирайся на неё.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-11',
    category: 'Learning',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'What\'s Missing?',
        instruction:
          'Put five things you are allowed to use in a row on a table, and look at them carefully. Close your eyes while an adult quietly takes one away. Open your eyes and say which one you think is gone. Then the adult puts it back. Play three rounds. After the third round, the game is finished, whether you spot every one or not.',
        adultInvolvementNote:
          'An adult takes part: while your eyes are closed they take one thing away, and when you have said your answer they put it back so you can both see.',
        safetyNote:
          'Use five light, unbreakable things you are allowed to move, and keep them on a steady table.',
      },
      de: {
        title: 'Was fehlt?',
        instruction:
          'Leg fünf Dinge, die du benutzen darfst, in einer Reihe auf einen Tisch und schau sie dir genau an. Mach die Augen zu, während ein Erwachsener leise eines wegnimmt. Mach die Augen auf und sag, was deiner Meinung nach fehlt. Dann legt der Erwachsene es zurück. Spiel drei Runden. Nach der dritten Runde ist das Spiel vorbei – egal, ob du jedes fehlende Ding entdeckt hast oder nicht.',
        adultInvolvementNote:
          'Ein Erwachsener macht mit: Während deine Augen zu sind, nimmt er ein Ding weg, und wenn du deine Antwort gesagt hast, legt er es zurück, damit ihr es beide sehen könnt.',
        safetyNote:
          'Nimm fünf leichte, unzerbrechliche Dinge, die du bewegen darfst, und lass sie auf einem festen Tisch liegen.',
      },
      ru: {
        title: 'Чего не хватает?',
        instruction:
          'Положи на стол в ряд пять вещей, которыми тебе разрешено пользоваться, и внимательно на них посмотри. Закрой глаза, пока взрослый тихонько убирает одну из них. Открой глаза и скажи, какой вещи, как тебе кажется, не хватает. Потом взрослый кладёт её обратно. Сыграй три раунда. После третьего раунда игра закончена — неважно, заметишь ты каждую пропажу или нет.',
        adultInvolvementNote:
          'Взрослый участвует в игре: пока твои глаза закрыты, он убирает одну вещь, а когда ты скажешь ответ, кладёт её обратно, чтобы вы оба её увидели.',
        safetyNote:
          'Бери пять лёгких небьющихся вещей, которые тебе разрешено переставлять, и держи их на устойчивом столе.',
      },
    },
    adultInvolvement: 'Adult participation required',
    safetyNoteRequired: true,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-13',
    category: 'Learning',
    ageBands: ['9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'The Balance Point',
        instruction:
          'Lay a pencil across one flat finger and move it until it balances level. Notice where your finger is. Now do the same with a wooden spoon, and then with one more long, light object that is heavier at one end. Each time, find the exact spot where it sits level and remember it. When all three have balanced, compare the three spots: was the balance point in the middle every time?',
        safetyNote:
          'Use only long, light, unbreakable objects — a pencil, a wooden spoon, a ruler. Balance them low over a table, and leave anything sharp, heavy or breakable alone.',
      },
      de: {
        title: 'Genau im Gleichgewicht',
        instruction:
          'Leg einen Bleistift quer über einen ausgestreckten Finger und schieb ihn hin und her, bis er waagerecht im Gleichgewicht liegt. Schau, wo dein Finger jetzt ist. Mach dasselbe mit einem Holzlöffel und dann mit einem weiteren langen, leichten Gegenstand, der an einem Ende schwerer ist. Finde jedes Mal genau die Stelle, an der er waagerecht liegt, und merk sie dir. Wenn alle drei im Gleichgewicht gelegen haben, vergleiche die drei Stellen: War der Gleichgewichtspunkt jedes Mal in der Mitte?',
        safetyNote:
          'Nimm nur lange, leichte, unzerbrechliche Gegenstände – einen Bleistift, einen Holzlöffel, ein Lineal. Balancier sie niedrig über einem Tisch und lass alles Scharfe, Schwere oder Zerbrechliche liegen.',
      },
      ru: {
        title: 'Найди точку равновесия',
        instruction:
          'Положи карандаш поперёк вытянутого пальца и двигай его, пока он не удержится ровно. Заметь, где сейчас твой палец. Теперь сделай то же самое с деревянной ложкой, а потом ещё с одним длинным лёгким предметом, у которого один конец тяжелее. Каждый раз находи точное место, где предмет лежит ровно, и запоминай его. Когда найдёшь равновесие для всех трёх, сравни эти три места: точка равновесия каждый раз была посередине?',
        safetyNote:
          'Бери только длинные лёгкие небьющиеся предметы — карандаш, деревянную ложку, линейку. Держи их в равновесии невысоко над столом, а всё острое, тяжёлое или бьющееся не трогай.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 90,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-10',
    category: 'Learning',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Sound Through the Table',
        instruction:
          'Rest one ear flat on a clean, steady table and keep it there. Tap the table once, gently, with one fingertip. Listen carefully. Now lift your head, sit up, and make exactly the same gentle tap again. Listen to that one too. Was the tap the same both times, or did something change when your ear was touching the table?',
        safetyNote:
          'Use one clean, steady table that does not move. Rest your ear down gently and tap softly with one fingertip — never bang, and do not try it anywhere else.',
      },
      de: {
        title: 'Das Ohr auf dem Tisch',
        instruction:
          'Leg ein Ohr flach auf einen sauberen, festen Tisch und lass es dort. Tipp einmal sanft mit einer Fingerspitze auf den Tisch. Hör genau hin. Heb jetzt den Kopf, setz dich aufrecht hin und tipp noch einmal genauso sanft. Hör auch diesmal genau hin. War das Tippen beide Male gleich, oder hat sich etwas verändert, als dein Ohr den Tisch berührt hat?',
        safetyNote:
          'Nimm einen sauberen, festen Tisch, der nicht wackelt. Leg dein Ohr sanft darauf und tipp leise mit einer Fingerspitze – schlag nie darauf und probier es nirgendwo anders aus.',
      },
      ru: {
        title: 'Послушай стол',
        instruction:
          'Приложи ухо к чистому устойчивому столу и не отрывай его. Один раз легонько постучи по столу кончиком пальца. Внимательно послушай. Теперь подними голову, выпрямись и ещё раз легонько постучи точно так же. Послушай и этот стук. Звук был одинаковым оба раза или что-то изменилось, когда ухо касалось стола?',
        safetyNote:
          'Выбери один чистый устойчивый стол, который не шатается. Прикладывай ухо осторожно и стучи легонько одним кончиком пальца — никогда не бей по столу и не пробуй этого в других местах.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 100,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-14',
    category: 'Learning',
    ageBands: ['9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Water Line',
        instruction:
          'An adult part-fills a tall, narrow clear container with water and marks the starting level with a rubber band or removable tape. They give you three unbreakable things that sink on their own. Before anything goes in, say which one you think will move the line up most. Lower the first one all the way into the water and let go. Watch the line. Take it out, then let the adult bring the water back to the starting mark before the next turn. After all three have had their turn, compare what you saw: which one actually moved the line most?',
        adultInvolvementNote:
          'An adult chooses a tall, narrow clear container and three unbreakable things that sink on their own, part-fills it with water, marks the starting level, and restores the water to that mark between turns.',
        safetyNote:
          'Use only the container and the things the adult gives you. Keep the container on a low, steady surface away from the edge, and tell an adult if water spills.',
      },
      de: {
        title: 'Die Wasserlinie',
        instruction:
          'Ein Erwachsener füllt ein hohes, schmales, durchsichtiges Gefäß zum Teil mit Wasser und markiert mit einem Gummiband oder ablösbarem Klebeband, wo das Wasser am Anfang steht. Er gibt dir drei unzerbrechliche Dinge, die von allein untergehen. Bevor etwas hineinkommt, sag, welches deiner Meinung nach die Wasserlinie am höchsten steigen lässt. Tauch das erste ganz ins Wasser und lass es los. Schau auf die Linie. Nimm es wieder heraus und lass dann den Erwachsenen das Wasser wieder bis zur Anfangsmarkierung bringen, bevor das nächste drankommt. Wenn alle drei dran waren, vergleiche, was du gesehen hast: Welches hat die Linie wirklich am meisten bewegt?',
        adultInvolvementNote:
          'Ein Erwachsener sucht ein hohes, schmales, durchsichtiges Gefäß und drei unzerbrechliche Dinge aus, die von allein untergehen, füllt das Gefäß zum Teil mit Wasser, markiert, wo das Wasser am Anfang steht, und bringt das Wasser zwischen den Durchgängen wieder bis zu dieser Markierung.',
        safetyNote:
          'Nimm nur das Gefäß und die Dinge, die dir der Erwachsene gibt. Stell das Gefäß auf eine niedrige, feste Fläche, weg vom Rand, und sag einem Erwachsenen Bescheid, wenn Wasser danebengeht.',
      },
      ru: {
        title: 'Уровень воды',
        instruction:
          'Взрослый наливает воду в высокую узкую прозрачную ёмкость не доверху и отмечает уровень воды резинкой или скотчем, который легко отклеить, — это начальная отметка. Он даёт тебе три небьющихся предмета, которые тонут сами. Прежде чем что-нибудь опустить в воду, скажи, какой предмет, по-твоему, сильнее всего поднимет воду. Опусти первый предмет в воду целиком и отпусти его. Посмотри на уровень воды. Достань предмет, а потом пусть взрослый вернёт воду к начальной отметке, прежде чем придёт очередь следующего. Когда все три побывают в воде, сравни увиденное: какой предмет на самом деле поднял воду сильнее всех?',
        adultInvolvementNote:
          'Взрослый выбирает высокую узкую прозрачную ёмкость и три небьющихся предмета, которые тонут сами, наливает в ёмкость воду не доверху, отмечает начальный уровень и перед каждой следующей очередью возвращает воду к этой отметке.',
        safetyNote:
          'Бери только ёмкость и предметы, которые даёт взрослый. Ставь ёмкость на низкую устойчивую поверхность подальше от края и скажи взрослому, если вода прольётся.',
      },
    },
    adultInvolvement: 'Adult participation required',
    safetyNoteRequired: true,
    catalogOrder: 110,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-02',
    category: 'Calm',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Still Water',
        instruction:
          'Ask an adult to put a little cool water in a cup for you. Carry the cup slowly across the room and try to keep the surface of the water completely still. When you have crossed the room, put the cup down and watch the water become flat again.',
        adultInvolvementNote:
          'An adult stays nearby: they fill the cup for you and are there if any water spills.',
        safetyNote:
          'Use only cool water and fill the cup less than half. Walk slowly, and tell an adult straight away if you spill something so that nobody slips.',
      },
      de: {
        title: 'Stilles Wasser',
        instruction:
          'Bitte einen Erwachsenen, dir etwas kühles Wasser in einen Becher zu füllen. Trage den Becher langsam durch den Raum und versuche, die Wasseroberfläche ganz ruhig zu halten. Wenn du auf der anderen Seite angekommen bist, stell den Becher ab und schau zu, wie das Wasser wieder glatt wird.',
        adultInvolvementNote:
          'Ein Erwachsener bleibt in der Nähe: Er füllt den Becher für dich und ist da, falls Wasser verschüttet wird.',
        safetyNote:
          'Nimm nur kühles Wasser und fülle den Becher weniger als halb voll. Geh langsam und sag sofort einem Erwachsenen Bescheid, wenn etwas danebengeht, damit niemand ausrutscht.',
      },
      ru: {
        title: 'Спокойная вода',
        instruction:
          'Попроси взрослого налить тебе в кружку немного прохладной воды. Медленно пронеси кружку через комнату и постарайся, чтобы поверхность воды оставалась совсем спокойной. Когда дойдёшь до другой стороны, поставь кружку и посмотри, как вода снова становится ровной.',
        adultInvolvementNote:
          'Взрослый находится рядом: он наливает воду в кружку и остаётся поблизости, если вода прольётся.',
        safetyNote:
          'Бери только прохладную воду и наливай меньше половины кружки. Иди медленно и сразу скажи взрослому, если что-то прольётся, чтобы никто не поскользнулся.',
      },
    },
    adultInvolvement: 'Adult nearby required',
    safetyNoteRequired: true,
    catalogOrder: 10,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-07',
    category: 'Calm',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Watch It Change',
        instruction:
          'Find something in your home that changes very slowly: the hand of a clock, a shadow on the floor, or a curtain moving in the air. Watch only that one thing and stay still until you can see that it has changed. When you have seen the change, say what changed and get up slowly.',
      },
      de: {
        title: 'Sieh die Veränderung',
        instruction:
          'Suche etwas in deinem Zuhause, das sich sehr langsam verändert: den Zeiger einer Uhr, einen Schatten auf dem Boden oder einen Vorhang, der sich in der Luft bewegt. Schau nur dieses eine Ding an und bleib still, bis du sehen kannst, dass es sich verändert hat. Wenn du die Veränderung gesehen hast, sag, was sich verändert hat, und steh langsam auf.',
      },
      ru: {
        title: 'Заметь перемену',
        instruction:
          'Найди дома что-нибудь, что меняется очень медленно: стрелку часов, тень на полу или занавеску, которая колышется от воздуха. Смотри только на эту одну вещь и сиди неподвижно, пока не заметишь, что она изменилась. Когда увидишь перемену, скажи, что именно изменилось, и медленно встань.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 20,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-10',
    category: 'Calm',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Soft Landing',
        instruction:
          'Put two socks on the floor a hand\'s width apart to make a little gate. Sit or kneel a few steps back with a third sock rolled into a ball. Roll it gently along the floor toward the gate — always rolling, never throwing. After each roll, notice where it stopped. If it stopped short, move a little closer before the next one; if it rolled past, move a little farther back. Take three rolls in all. After the third, look where the sock came to rest: inside the gate, short of it, or past it.',
        safetyNote:
          'Use clean socks and a clear stretch of floor. Roll the sock along the floor — never throw it, and never roll it at a person or a pet.',
      },
      de: {
        title: 'Wohin rollt die Socke?',
        instruction:
          'Leg zwei Socken eine Handbreit auseinander auf den Boden – so entsteht ein kleines Tor. Roll eine dritte Socke zu einem Ball zusammen und setz oder knie dich damit ein paar Schritte entfernt hin. Roll sie sanft über den Boden auf das Tor zu – immer rollen, nie werfen. Achte nach jedem Rollen darauf, wo sie liegen geblieben ist. Ist sie vor dem Tor liegen geblieben, rück vor dem nächsten Mal ein Stück näher heran; ist sie hinter das Tor gerollt, rück ein Stück weiter zurück. Roll insgesamt dreimal. Schau nach dem dritten Mal, wo die Socke liegen geblieben ist: im Tor, davor oder dahinter.',
        safetyNote:
          'Nimm saubere Socken und ein freies Stück Boden. Roll die Socke über den Boden – wirf sie nie und roll sie nie auf einen Menschen oder ein Haustier zu.',
      },
      ru: {
        title: 'Куда докатится носок?',
        instruction:
          'Положи на пол два носка на ширину ладони друг от друга — получатся маленькие воротца. Сверни третий носок в мячик и сядь или встань на колени в нескольких шагах от воротец. Мягко покати его по полу к воротцам — только кати, никогда не бросай. После каждого раза замечай, где он остановился. Если он не докатился до воротец, перед следующим разом придвинься чуть ближе; если укатился за воротца — отодвинься чуть назад. Всего покати носок три раза. После третьего раза посмотри, где остановился носок: в воротцах, перед ними или за ними.',
        safetyNote:
          'Бери чистые носки и свободный участок пола. Кати носок по полу — никогда не бросай его и никогда не кати в сторону человека или домашнего животного.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 30,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-11',
    category: 'Calm',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 360,
    content: {
      en: {
        title: 'The Domino Line',
        instruction:
          'Find light, safe things that stand up steadily on their own — building blocks, small boxes, or plastic cups turned upside down. Stand them in a line, one at a time, each close enough that if one fell it would touch the next. Place each one gently, and if any topple while you are building, stand them back up and carry on. When the line is finished, tip the first one over and watch how far the falling runs.',
        safetyNote:
          'Use only light, unbreakable things that already stand up on their own. Build on the floor or a low table, and leave anything glass, heavy or breakable where it is.',
      },
      de: {
        title: 'Die Dominoreihe',
        instruction:
          'Such dir leichte, sichere Dinge, die von allein stabil stehen – zum Beispiel Bauklötze, kleine Schachteln oder umgedrehte Plastikbecher. Stell sie eins nach dem anderen in einer Reihe auf – so dicht hintereinander, dass jedes beim Umfallen das nächste berühren würde. Stell jedes vorsichtig hin, und wenn beim Aufbauen etwas umfällt, stell es wieder auf und mach weiter. Wenn die Reihe fertig ist, kipp das erste um und schau, wie weit das Umfallen weitergeht.',
        safetyNote:
          'Nimm nur leichte, unzerbrechliche Dinge, die schon von allein stehen. Bau auf dem Boden oder auf einem niedrigen Tisch und lass Glas und alles Schwere oder Zerbrechliche an seinem Platz.',
      },
      ru: {
        title: 'Домино в ряд',
        instruction:
          'Найди лёгкие безопасные вещи, которые сами устойчиво стоят, — например, кубики, маленькие коробочки или перевёрнутые пластиковые стаканчики. Расставь их в ряд по одной, так близко друг к другу, чтобы каждая, если упадёт, задела следующую. Ставь каждую осторожно, а если какая-то упадёт, пока ты строишь, поставь её обратно и продолжай. Когда ряд будет готов, опрокинь первую и посмотри, как далеко по ряду пройдёт падение.',
        safetyNote:
          'Бери только лёгкие небьющиеся вещи, которые уже сами стоят. Строй на полу или на низком столе, а всё стеклянное, тяжёлое или бьющееся оставь на месте.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 40,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-09',
    category: 'Calm',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Heavy Blanket',
        instruction:
          'Fold one blanket in half and lie down on your back on the floor. Draw the blanket up over yourself from your feet to your chest — never over your head. Lie still and feel where it presses on you the most. Is it your feet, your knees, or somewhere else? Stay until you have found the heaviest place.',
        safetyNote:
          'Use one blanket you are allowed to use, and keep it no higher than your chest — never over your face or head. Push it off whenever you want to get up.',
      },
      de: {
        title: 'Wo ist die Decke am schwersten?',
        instruction:
          'Falte eine Decke in der Mitte zusammen und leg dich auf den Rücken auf den Boden. Zieh die Decke von den Füßen bis zur Brust über dich – niemals über den Kopf. Lieg still und spür, wo sie am meisten auf dich drückt. Sind es deine Füße, deine Knie oder eine andere Stelle? Bleib liegen, bis du die Stelle gefunden hast, an der sie sich am schwersten anfühlt.',
        safetyNote:
          'Nimm eine Decke, die du benutzen darfst, und zieh sie nicht höher als bis zur Brust – nie über dein Gesicht oder deinen Kopf. Schieb sie weg, wann immer du aufstehen möchtest.',
      },
      ru: {
        title: 'Где одеяло тяжелее всего?',
        instruction:
          'Сложи одно одеяло пополам и ляг на спину на пол. Накрой себя одеялом от ступней до груди — никогда не накрывай им голову. Лежи неподвижно и почувствуй, где одеяло давит на тебя сильнее всего. Это ступни, колени или какое-то другое место? Лежи так, пока не найдёшь место, где одеяло ощущается тяжелее всего.',
        safetyNote:
          'Бери одно одеяло, которым тебе разрешено пользоваться, и держи его не выше груди — никогда не накрывай им лицо или голову. Убери одеяло с себя в любой момент, когда захочешь встать.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 50,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-08',
    category: 'Calm',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Slow-Motion Walk',
        instruction:
          'Walk across the room more slowly than you have ever walked before — so slowly that anyone watching would get bored waiting for you to arrive. Keep going, one slow step after another, until you reach the other side. When you get there, think back over the walk: what felt different from walking the ordinary way?',
        safetyNote:
          'Walk on a clear floor with nothing in the way, and put a hand on a wall if you need to steady yourself.',
      },
      de: {
        title: 'In Zeitlupe durch den Raum',
        instruction:
          'Geh langsamer durch den Raum, als du jemals gegangen bist – so langsam, dass sich jeder, der zuschaut, beim Warten auf dich langweilen würde. Geh immer weiter, einen langsamen Schritt nach dem anderen, bis du auf der anderen Seite ankommst. Wenn du dort bist, denk noch einmal über den Weg nach: Was hat sich anders angefühlt als beim normalen Gehen?',
        safetyNote:
          'Geh auf freiem Boden, auf dem nichts im Weg steht, und leg eine Hand an die Wand, wenn du Halt brauchst.',
      },
      ru: {
        title: 'Иди как в замедленной съёмке',
        instruction:
          'Пройди через комнату медленнее, чем когда-нибудь раньше, — так медленно, что любому, кто стал бы на тебя смотреть, надоело бы ждать, пока ты дойдёшь. Иди дальше, делая один медленный шаг за другим, пока не окажешься на другой стороне. Когда дойдёшь, вспомни весь путь: что ощущалось иначе, чем при обычной ходьбе?',
        safetyNote:
          'Иди по свободному полу, где ничего не мешает, а если нужно удержать равновесие, обопрись рукой о стену.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 60,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-12',
    category: 'Calm',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Quiet Unstack',
        instruction:
          'Choose three light books you are allowed to move and make a short stack on the floor. Now take it down one book at a time. Lift the top book slowly and evenly so the books underneath stay still. If they slide, put that book back and try the lift again. Keep going until all three books are beside the empty spot where the stack was.',
        safetyNote:
          'Use only light books you can lift easily. Build and unstack on the floor, and move one book at a time.',
      },
      de: {
        title: 'Den Stapel behutsam abbauen',
        instruction:
          'Such dir drei leichte Bücher aus, die du bewegen darfst, und mach auf dem Boden einen kleinen Stapel daraus. Bau ihn jetzt Buch für Buch wieder ab. Heb das oberste Buch langsam und gleichmäßig hoch, sodass die Bücher darunter an ihrem Platz bleiben. Wenn sie verrutschen, leg das Buch wieder zurück und versuch es noch einmal. Mach weiter, bis alle drei Bücher neben der leeren Stelle liegen, an der der Stapel war.',
        safetyNote:
          'Nimm nur leichte Bücher, die du gut hochheben kannst. Bau den Stapel auf dem Boden auf und wieder ab, und beweg immer nur ein Buch.',
      },
      ru: {
        title: 'Бережно разбери стопку',
        instruction:
          'Выбери три лёгкие книги, которые тебе разрешено переставлять, и сложи из них на полу невысокую стопку. Теперь разбери её по одной книге. Поднимай верхнюю книгу медленно и ровно, чтобы нижние книги оставались на месте. Если они съедут, положи эту книгу обратно и попробуй поднять её ещё раз. Продолжай, пока все три книги не окажутся рядом с пустым местом, где стояла стопка.',
        safetyNote:
          'Бери только лёгкие книги, которые тебе легко поднять. Складывай и разбирай стопку на полу и перекладывай книги по одной.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-13',
    category: 'Calm',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Pencil Spin',
        instruction:
          'Lay a pencil flat on a table and spin it with one finger. Watch it without looking away, all the way until it stops completely. Do this three times, each time trying for a spin that lasts a little longer and turns a little more smoothly. Stay with your longest spin right to its last slow turn.',
        safetyNote:
          'Spin the pencil flat on the table, well away from your face, and keep your other hand out of its way. Use a pencil you are allowed to use.',
      },
      de: {
        title: 'Der kreiselnde Bleistift',
        instruction:
          'Leg einen Bleistift flach auf einen Tisch und bring ihn mit einem Finger zum Kreiseln. Schau ihm zu, ohne wegzusehen, bis er ganz stillsteht. Mach das dreimal und versuch jedes Mal, ihn ein bisschen länger und ein bisschen gleichmäßiger kreiseln zu lassen. Schau deinem längsten Kreiseln bis zur allerletzten langsamen Drehung zu.',
        safetyNote:
          'Lass den Bleistift flach auf dem Tisch kreiseln, weit weg von deinem Gesicht, und halte deine andere Hand von ihm fern. Nimm einen Bleistift, den du benutzen darfst.',
      },
      ru: {
        title: 'Крутящийся карандаш',
        instruction:
          'Положи карандаш на стол плашмя и раскрути его одним пальцем. Смотри на него, не отводя глаз, пока он совсем не остановится. Сделай так три раза и каждый раз старайся, чтобы он крутился чуть дольше и чуть плавнее. Самое долгое вращение досмотри до самого последнего медленного оборота.',
        safetyNote:
          'Крути карандаш плашмя на столе, подальше от лица, и держи другую руку в стороне. Бери карандаш, которым тебе разрешено пользоваться.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-15',
    category: 'Calm',
    ageBands: ['9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'The Tight Roll',
        instruction:
          'Take a towel or a long cloth and roll it up from one end to the other. Keep it tight and even as you go, so the finished roll is the same thickness all along. Now let go: does it stay rolled by itself, or does it start to loosen? Unroll it and roll it again, tighter this time. Then let go and watch whether this one holds itself.',
        safetyNote:
          'Use one towel or long cloth you are allowed to use, and roll it on the floor or a table. Do not wrap it around yourself or anyone else.',
      },
      de: {
        title: 'Fest gerollt',
        instruction:
          'Nimm ein Handtuch oder ein langes Tuch und roll es von einem Ende bis zum anderen auf. Roll dabei fest und gleichmäßig, sodass die fertige Rolle überall gleich dick ist. Lass jetzt los: Bleibt sie von allein zusammengerollt, oder fängt sie an aufzugehen? Roll es wieder aus und roll es noch einmal auf, diesmal fester. Lass dann los und schau, ob diese Rolle von allein hält.',
        safetyNote:
          'Nimm ein Handtuch oder ein langes Tuch, das du benutzen darfst, und roll es auf dem Boden oder auf einem Tisch. Wickle es nicht um dich selbst oder um jemand anderen.',
      },
      ru: {
        title: 'Плотный рулон',
        instruction:
          'Возьми полотенце или длинный кусок ткани и сверни его в рулон от одного края до другого. Сворачивай плотно и ровно, чтобы готовый рулон был одинаковой толщины по всей длине. Теперь отпусти: он сам держится свёрнутым или начинает раскручиваться? Разверни его и сверни снова — на этот раз плотнее. Потом отпусти и посмотри, держится ли этот рулон сам.',
        safetyNote:
          'Бери одно полотенце или один длинный кусок ткани, которым тебе разрешено пользоваться, и сворачивай его на полу или на столе. Не обматывай им себя или кого-то другого.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 90,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-14',
    category: 'Calm',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Sock Snake',
        instruction:
          'Collect the socks you are allowed to use and lay them end to end across the floor to make a long snake. Each sock must just touch the one before it without moving it at all. If one shifts, straighten it before you add the next. When you have used your last sock, stand back and see how far your snake reached.',
        safetyNote:
          'Use clean socks you are allowed to use, and build your snake on a clear floor where nobody will walk.',
      },
      de: {
        title: 'Die Sockenschlange',
        instruction:
          'Sammle die Socken, die du benutzen darfst, und leg sie Ende an Ende über den Boden, sodass eine lange Schlange entsteht. Jede Socke muss die vorherige gerade eben berühren, ohne sie auch nur ein bisschen zu verschieben. Wenn eine verrutscht, richte sie wieder aus, bevor du die nächste dazulegst. Wenn du deine letzte Socke hingelegt hast, tritt zurück und schau, wie weit deine Schlange reicht.',
        safetyNote:
          'Nimm saubere Socken, die du benutzen darfst, und leg deine Schlange auf freiem Boden aus, wo niemand langgeht.',
      },
      ru: {
        title: 'Змейка из носков',
        instruction:
          'Собери носки, которыми тебе разрешено пользоваться, и выложи их на полу в линию, конец к концу, — получится длинная змейка. Каждый носок должен едва касаться предыдущего и совсем его не сдвигать. Если какой-то носок сдвинется, поправь его, прежде чем класть следующий. Когда выложишь последний носок, отойди и посмотри, как далеко протянулась твоя змейка.',
        safetyNote:
          'Бери чистые носки, которыми тебе разрешено пользоваться, и выкладывай змейку на свободном полу, там, где никто не будет ходить.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: true,
    catalogOrder: 100,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
];
