import type { MissionRecord } from './catalog';

// Provenance for every entry below: one controlled, reviewed MVP content set.
// A new review pass publishes a new version rather than editing entries in place.
export const CATALOG_CONTENT_VERSION = 'mvp-catalog-2026-09';

// Reviewed production Mission content. Bundled, static and read-only at runtime.
// `catalogOrder` is editorial priority within a Mission Category and is spaced by
// ten so a later reviewed Mission can be placed without renumbering its peers.
export const MISSION_CATALOG: readonly MissionRecord[] = [
  {
    missionId: 'movement-01',
    category: 'Movement',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Tall and Small',
        instruction:
          'Stand up and stretch as tall as you can, then slowly curl down as small as you can. Do it slowly five times. When you have finished the fifth time, sit down and rest.',
        safetyNote: 'Stand where the floor is clear and there is space around you.',
      },
      de: {
        title: 'Groß und klein',
        instruction:
          'Stell dich hin und strecke dich so groß, wie du kannst. Dann rolle dich langsam so klein zusammen, wie du kannst. Mach das fünfmal langsam. Nach dem fünften Mal setz dich hin und ruhe dich aus.',
        safetyNote: 'Stell dich dorthin, wo der Boden frei ist und du Platz um dich herum hast.',
      },
      ru: {
        title: 'Большой и маленький',
        instruction:
          'Встань и вытянись вверх как можно выше, а потом медленно свернись как можно меньше. Повтори медленно пять раз. После пятого раза сядь и отдохни.',
        safetyNote: 'Встань там, где пол свободен и вокруг тебя есть место.',
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
    missionId: 'movement-02',
    category: 'Movement',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Animal Walks',
        instruction:
          'Cross the room three times: first like a bear on your hands and feet, then like a crab on your back, then on tiptoe like a bird. When you have walked all three ways once, stop and shake out your arms.',
        safetyNote: 'Move on a clear, flat floor with space around you, and go slowly.',
      },
      de: {
        title: 'Tiergänge',
        instruction:
          'Geh dreimal durch den Raum: zuerst wie ein Bär auf Händen und Füßen, dann wie eine Krabbe auf dem Rücken, dann auf Zehenspitzen wie ein Vogel. Wenn du alle drei Arten einmal gemacht hast, bleib stehen und schüttle die Arme aus.',
        safetyNote: 'Beweg dich auf einem freien, ebenen Boden mit Platz um dich herum und geh langsam.',
      },
      ru: {
        title: 'Шаги животных',
        instruction:
          'Пройди через комнату три раза: сначала как медведь на руках и ногах, потом как краб спиной вниз, потом на цыпочках как птица. Когда пройдёшь всеми тремя способами по разу, остановись и встряхни руками.',
        safetyNote: 'Двигайся по свободному ровному полу, где вокруг есть место, и не спеши.',
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
    missionId: 'movement-03',
    category: 'Movement',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Slow Balance',
        instruction:
          'Stand next to a wall and lift one foot off the floor. Count slowly to ten, then swap feet and count again. When both feet have had a turn, put both feet down.',
        safetyNote:
          'Stand next to a wall or a steady piece of furniture you can touch, and put your foot down whenever you want.',
      },
      de: {
        title: 'Ruhig balancieren',
        instruction:
          'Stell dich neben eine Wand und hebe einen Fuß vom Boden. Zähle langsam bis zehn, wechsle dann den Fuß und zähle noch einmal. Wenn beide Füße dran waren, stell beide Füße wieder ab.',
        safetyNote:
          'Stell dich neben eine Wand oder ein festes Möbelstück, das du anfassen kannst, und stell den Fuß ab, wann immer du möchtest.',
      },
      ru: {
        title: 'Спокойное равновесие',
        instruction:
          'Встань рядом со стеной и подними одну ногу от пола. Медленно сосчитай до десяти, потом поменяй ногу и сосчитай снова. Когда обе ноги побывают наверху, поставь обе ноги на пол.',
        safetyNote:
          'Встань рядом со стеной или устойчивой мебелью, за которую можно держаться, и опускай ногу, когда захочешь.',
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
    missionId: 'movement-04',
    category: 'Movement',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Follow the Line',
        instruction:
          'Find a straight line on the floor, like the edge of a rug or a floorboard. Walk along it slowly, heel to toe, to the end and back. When you are back where you started, stand still and count to three.',
        safetyNote: 'Choose a flat, clear floor and walk slowly.',
      },
      de: {
        title: 'Der Linie folgen',
        instruction:
          'Suche eine gerade Linie auf dem Boden, zum Beispiel die Kante eines Teppichs oder einer Diele. Geh langsam daran entlang, Ferse an Zehe, bis zum Ende und wieder zurück. Wenn du wieder am Anfang bist, bleib stehen und zähle bis drei.',
        safetyNote: 'Wähle einen ebenen, freien Boden und geh langsam.',
      },
      ru: {
        title: 'Иди по линии',
        instruction:
          'Найди на полу прямую линию — например, край ковра или доски. Медленно пройди по ней, пятка к носку, до конца и обратно. Когда вернёшься на место, остановись и сосчитай до трёх.',
        safetyNote: 'Выбери ровный свободный пол и иди медленно.',
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
    missionId: 'movement-05',
    category: 'Movement',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Freeze and Melt',
        instruction:
          'Move gently around the room. Count to five, then freeze like a statue and hold still while you count to three. Then melt slowly down to the floor. Do this three times. After the third melt, lie still for a moment.',
        safetyNote: 'Move on a clear floor with space around you, and melt down slowly.',
      },
      de: {
        title: 'Erstarren und schmelzen',
        instruction:
          'Beweg dich sanft durch den Raum. Zähle bis fünf, erstarre dann wie eine Statue und halte still, während du bis drei zählst. Dann schmilz langsam auf den Boden. Mach das dreimal. Nach dem dritten Mal bleib kurz still liegen.',
        safetyNote: 'Beweg dich auf einem freien Boden mit Platz um dich herum und schmilz langsam nach unten.',
      },
      ru: {
        title: 'Замри и растай',
        instruction:
          'Двигайся спокойно по комнате. Сосчитай до пяти, потом замри как статуя и постой неподвижно, пока считаешь до трёх. Затем медленно «растай» на пол. Сделай так три раза. После третьего раза полежи немного спокойно.',
        safetyNote: 'Двигайся по свободному полу, где вокруг есть место, и опускайся медленно.',
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
    missionId: 'movement-06',
    category: 'Movement',
    ageBands: ['4–6'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Quiet Feet',
        instruction:
          'Walk from one side of the room to the other so quietly that you cannot hear your own feet. Then turn around and walk back even more quietly. When you have crossed twice, sit down and listen to how quiet the room is.',
        safetyNote:
          'Walk slowly on a clear floor and look where you are going.',
      },
      de: {
        title: 'Leise Füße',
        instruction:
          'Geh so leise von einer Seite des Raums zur anderen, dass du deine eigenen Füße nicht hören kannst. Dreh dich dann um und geh noch leiser zurück. Wenn du zweimal hinübergegangen bist, setz dich hin und hör, wie still der Raum ist.',
        safetyNote:
          'Geh langsam auf einem freien Boden und schau, wohin du gehst.',
      },
      ru: {
        title: 'Тихие шаги',
        instruction:
          'Пройди от одной стены комнаты до другой так тихо, чтобы не слышать собственных шагов. Потом повернись и вернись обратно ещё тише. Когда пройдёшь два раза, сядь и послушай, какая в комнате тишина.',
        safetyNote:
          'Иди медленно по свободному полу и смотри, куда идёшь.',
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
    missionId: 'movement-07',
    category: 'Movement',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'The Four-Move Key',
        instruction:
          'Invent a key made of four gentle moves, for example reach up, twist, touch your toes and step to the side. Your key only works if the four moves come in the same order every time. Do your key three times without changing the order. When you have finished the third time, stand tall and stretch once.',
        safetyNote:
          'Move gently, keep space around you, and stop whenever you feel tired.',
      },
      de: {
        title: 'Dein Bewegungsschlüssel',
        instruction:
          'Denk dir einen Schlüssel aus vier sanften Bewegungen aus, zum Beispiel hochstrecken, drehen, Zehen berühren und zur Seite treten. Dein Schlüssel passt nur, wenn die vier Bewegungen jedes Mal in derselben Reihenfolge kommen. Mach deinen Schlüssel dreimal, ohne die Reihenfolge zu ändern. Nach dem dritten Mal stell dich gerade hin und streck dich einmal.',
        safetyNote:
          'Beweg dich sanft, halte Platz um dich herum und hör auf, wenn du müde wirst.',
      },
      ru: {
        title: 'Ключ из четырёх движений',
        instruction:
          'Придумай ключ из четырёх спокойных движений: например, потянуться вверх, повернуться, дотронуться до носков и шагнуть в сторону. Ключ подходит только тогда, когда все четыре движения идут каждый раз в одном и том же порядке. Повтори свой ключ три раза, не меняя порядок. После третьего раза выпрямись и потянись.',
        safetyNote:
          'Двигайся спокойно, держи место вокруг себя и остановись, если почувствуешь усталость.',
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
    missionId: 'movement-08',
    category: 'Movement',
    ageBands: ['9–10'],
    durationSeconds: 420,
    content: {
      en: {
        title: 'Room Circuit',
        instruction:
          'Plan a short route through a clear part of your home with three stops. At the first stop do five slow arm circles, at the second five gentle knee lifts, at the third five shoulder rolls. Walk your route once. When you finish the third stop, walk one slow lap to finish.',
        safetyNote:
          'Keep to clear floor space, move at a comfortable pace, and stop whenever you feel tired.',
      },
      de: {
        title: 'Rundgang durch den Raum',
        instruction:
          'Plane einen kurzen Weg durch einen freien Teil deiner Wohnung mit drei Stationen. An der ersten Station machst du fünf langsame Armkreise, an der zweiten fünf sanfte Kniehebungen, an der dritten fünf Schulterkreise. Geh deinen Weg einmal ab. Nach der dritten Station gehst du zum Abschluss noch eine langsame Runde.',
        safetyNote:
          'Bleib auf freier Bodenfläche, geh in einem angenehmen Tempo und hör auf, wenn du müde wirst.',
      },
      ru: {
        title: 'Круг по комнате',
        instruction:
          'Придумай короткий маршрут по свободной части дома с тремя остановками. На первой сделай пять медленных кругов руками, на второй — пять спокойных подъёмов колена, на третьей — пять вращений плечами. Пройди маршрут один раз. После третьей остановки пройди ещё один медленный круг, чтобы закончить.',
        safetyNote:
          'Держись свободного пола, двигайся в удобном темпе и остановись, если почувствуешь усталость.',
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
    missionId: 'creativity-01',
    category: 'Creativity',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Draw What You Hear',
        instruction:
          'Sit somewhere quiet and listen for one minute. Then draw one thing you heard. When your drawing shows that sound, put your pencil down and look at it.',
        safetyNote: 'You need a sheet of paper and a pencil or crayon that you are allowed to use.',
      },
      de: {
        title: 'Male, was du hörst',
        instruction:
          'Setz dich an einen ruhigen Ort und höre eine Minute lang zu. Male dann eine Sache, die du gehört hast. Wenn dein Bild dieses Geräusch zeigt, leg den Stift weg und schau es dir an.',
        safetyNote: 'Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst.',
      },
      ru: {
        title: 'Нарисуй, что слышишь',
        instruction:
          'Сядь в тихом месте и послушай одну минуту. Потом нарисуй то, что услышишь. Когда рисунок покажет этот звук, отложи карандаш и посмотри на него.',
        safetyNote: 'Тебе нужен лист бумаги и карандаш или мелок, которыми тебе разрешено пользоваться.',
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
    missionId: 'creativity-02',
    category: 'Creativity',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Tower of Five',
        instruction:
          'Find five light, unbreakable things you are allowed to use, such as blocks, books or plastic cups. Stack them into a tower on the floor. When your tower stands on its own with five things, look at it, then take it apart and put everything back.',
        safetyNote:
          'Use only light, unbreakable things you are allowed to use, and build on the floor rather than on a high surface.',
      },
      de: {
        title: 'Turm aus fünf',
        instruction:
          'Suche fünf leichte, unzerbrechliche Dinge, die du benutzen darfst, zum Beispiel Bauklötze, Bücher oder Plastikbecher. Staple sie auf dem Boden zu einem Turm. Wenn dein Turm mit fünf Dingen von allein steht, schau ihn dir an, bau ihn wieder ab und räum alles zurück.',
        safetyNote:
          'Nimm nur leichte, unzerbrechliche Dinge, die du benutzen darfst, und baue auf dem Boden statt auf einer hohen Fläche.',
      },
      ru: {
        title: 'Башня из пяти',
        instruction:
          'Найди пять лёгких небьющихся предметов, которыми тебе разрешено пользоваться: кубики, книги или пластиковые стаканы. Собери из них башню на полу. Когда башня из пяти предметов будет стоять сама, посмотри на неё, разбери и убери всё на место.',
        safetyNote:
          'Бери только лёгкие небьющиеся предметы, которыми тебе разрешено пользоваться, и строй на полу, а не на высокой поверхности.',
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
    missionId: 'creativity-03',
    category: 'Creativity',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 420,
    content: {
      en: {
        title: 'A Story in Three Pictures',
        instruction:
          'Draw three small pictures that tell one short story: the beginning, the middle and the end. When all three pictures are ready, tell the story out loud to yourself or to someone at home.',
        safetyNote: 'You need a sheet of paper and a pencil or crayon that you are allowed to use.',
      },
      de: {
        title: 'Eine Geschichte in drei Bildern',
        instruction:
          'Male drei kleine Bilder, die zusammen eine kurze Geschichte erzählen: den Anfang, die Mitte und das Ende. Wenn alle drei Bilder fertig sind, erzähle die Geschichte laut — dir selbst oder jemandem zu Hause.',
        safetyNote: 'Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst.',
      },
      ru: {
        title: 'История в трёх картинках',
        instruction:
          'Нарисуй три маленькие картинки, которые вместе рассказывают одну короткую историю: начало, середину и конец. Когда все три картинки готовы, расскажи историю вслух себе или кому-то из домашних.',
        safetyNote: 'Тебе нужен лист бумаги и карандаш или мелок, которыми тебе разрешено пользоваться.',
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
    missionId: 'creativity-04',
    category: 'Creativity',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'A Tiny World',
        instruction:
          'Choose four safe things you are allowed to use and arrange them on the floor to make a tiny world: a hill, a bridge, a place to live. When your world is finished, give it a name and say who lives there, then put everything back.',
        safetyNote:
          'Use only light, unbreakable things you are allowed to use, and build your world on the floor.',
      },
      de: {
        title: 'Eine winzige Welt',
        instruction:
          'Wähle vier sichere Dinge, die du benutzen darfst, und leg sie auf dem Boden so hin, dass eine winzige Welt entsteht: ein Hügel, eine Brücke, ein Ort zum Wohnen. Wenn deine Welt fertig ist, gib ihr einen Namen und sag, wer dort wohnt, und räum danach alles zurück.',
        safetyNote:
          'Nimm nur leichte, unzerbrechliche Dinge, die du benutzen darfst, und baue deine Welt auf dem Boden.',
      },
      ru: {
        title: 'Крошечный мир',
        instruction:
          'Выбери четыре безопасных предмета, которыми тебе разрешено пользоваться, и разложи их на полу так, чтобы получился крошечный мир: холм, мост, место, где можно жить. Когда мир будет готов, придумай ему название и скажи, кто там живёт, а потом убери всё на место.',
        safetyNote:
          'Бери только лёгкие небьющиеся предметы, которыми тебе разрешено пользоваться, и строй свой мир на полу.',
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
    missionId: 'creativity-05',
    category: 'Creativity',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Sock Puppet',
        instruction:
          'Take a clean sock you are allowed to use and put it on your hand. Give your puppet a name and a voice, and let it say hello to you. When your puppet has said hello, take it off and put the sock back.',
        safetyNote: 'Use a clean sock you are allowed to use, and keep it away from your face and mouth.',
      },
      de: {
        title: 'Sockenpuppe',
        instruction:
          'Nimm eine saubere Socke, die du benutzen darfst, und zieh sie über deine Hand. Gib deiner Puppe einen Namen und eine Stimme und lass sie dich begrüßen. Wenn deine Puppe Hallo gesagt hat, zieh sie aus und leg die Socke zurück.',
        safetyNote: 'Nimm eine saubere Socke, die du benutzen darfst, und halte sie von Gesicht und Mund fern.',
      },
      ru: {
        title: 'Кукла из носка',
        instruction:
          'Возьми чистый носок, которым тебе разрешено пользоваться, и надень его на руку. Придумай кукле имя и голос и пусть она с тобой поздоровается. Когда кукла поздоровается, сними её и положи носок на место.',
        safetyNote: 'Бери чистый носок, которым тебе разрешено пользоваться, и держи его подальше от лица и рта.',
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
    missionId: 'creativity-06',
    category: 'Creativity',
    ageBands: ['4–6'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Blanket Cave',
        instruction:
          'Spread one light blanket over a low chair or the edge of a table to make a small cave. Crawl inside and sit there for a moment. When you are settled, look up at the roof above your head, then take the blanket down and fold it.',
        safetyNote:
          'Use one light blanket over a low chair or table edge. Keep one side open so you can get out easily, and do not climb on the furniture.',
      },
      de: {
        title: 'Deckenhöhle',
        instruction:
          'Leg eine leichte Decke über einen niedrigen Stuhl oder über die Tischkante, so entsteht eine kleine Höhle. Krabbel hinein und sitz einen Moment darin. Wenn du es dir bequem gemacht hast, schau nach oben auf das Dach über deinem Kopf und nimm die Decke danach wieder ab.',
        safetyNote:
          'Nimm eine leichte Decke über einen niedrigen Stuhl oder eine Tischkante. Lass eine Seite offen, damit du leicht herauskommst, und klettere nicht auf die Möbel.',
      },
      ru: {
        title: 'Пещера из одеяла',
        instruction:
          'Накинь лёгкое одеяло на низкий стул или на край стола — получится маленькая пещера. Заберись внутрь и посиди там немного. Когда устроишься, посмотри на крышу у себя над головой, а потом сними одеяло и сложи его.',
        safetyNote:
          'Бери одно лёгкое одеяло и клади его на низкий стул или край стола. Оставь одну сторону открытой, чтобы легко выбраться, и не залезай на мебель.',
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
    missionId: 'creativity-07',
    category: 'Creativity',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 420,
    content: {
      en: {
        title: 'Invent a Machine',
        instruction:
          'Draw a machine that does one helpful job at home. Give it a name and label two of its parts. When your drawing has a name and two labels, explain out loud what your machine does.',
        safetyNote:
          'You need a sheet of paper and a pencil that you are allowed to use. Draw your machine only — do not build it and do not use any tools or electrical parts.',
      },
      de: {
        title: 'Erfinde eine Maschine',
        instruction:
          'Male eine Maschine, die zu Hause eine hilfreiche Aufgabe erledigt. Gib ihr einen Namen und beschrifte zwei ihrer Teile. Wenn deine Zeichnung einen Namen und zwei Beschriftungen hat, erkläre laut, was deine Maschine macht.',
        safetyNote:
          'Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst. Male die Maschine nur — baue sie nicht und benutze keine Werkzeuge oder elektrischen Teile.',
      },
      ru: {
        title: 'Придумай машину',
        instruction:
          'Нарисуй машину, которая выполняет одно полезное дело дома. Дай ей название и подпиши две её части. Когда на рисунке будут название и две подписи, расскажи вслух, что делает твоя машина.',
        safetyNote:
          'Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться. Машину только нарисуй — не строй её и не бери инструменты или электрические детали.',
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
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-01',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Toys Back Home',
        instruction:
          'Choose one room and pick up the toys and things lying on the floor. Put each one back where it belongs. When the floor of that room is clear, look around and see the space you made.',
        safetyNote:
          'Pick up only light things you can carry easily. Leave anything heavy, sharp or broken for an adult.',
      },
      de: {
        title: 'Alles an seinen Platz',
        instruction:
          'Wähle einen Raum und heb das Spielzeug und die Sachen auf, die auf dem Boden liegen. Räum jedes Teil dorthin zurück, wo es hingehört. Wenn der Boden in diesem Raum frei ist, schau dich um und sieh dir den Platz an, den du geschaffen hast.',
        safetyNote:
          'Heb nur leichte Dinge auf, die du gut tragen kannst. Alles Schwere, Scharfe oder Kaputte überlässt du einem Erwachsenen.',
      },
      ru: {
        title: 'Игрушки возвращаются домой',
        instruction:
          'Выбери одну комнату и собери игрушки и вещи, которые лежат на полу. Положи каждую вещь на своё место. Когда пол в этой комнате станет свободным, оглядись и посмотри, сколько места получилось.',
        safetyNote:
          'Поднимай только лёгкие вещи, которые тебе легко нести. Всё тяжёлое, острое или разбитое оставь взрослому.',
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
    missionId: 'helping-02',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Shoe Pairs',
        instruction:
          'Look at the shoes near your door. Put each shoe together with its pair, then line the pairs up neatly side by side. When every shoe has found its pair, step back and look at the row.',
        safetyNote: 'Move only shoes you are allowed to move, and keep the doorway clear so nobody trips.',
      },
      de: {
        title: 'Schuhpaare',
        instruction:
          'Schau dir die Schuhe an der Tür an. Stell jeden Schuh zu seinem Paar und ordne die Paare ordentlich nebeneinander. Wenn jeder Schuh sein Paar gefunden hat, tritt einen Schritt zurück und schau dir die Reihe an.',
        safetyNote: 'Bewege nur Schuhe, die du bewegen darfst, und halte den Eingang frei, damit niemand stolpert.',
      },
      ru: {
        title: 'Пары обуви',
        instruction:
          'Посмотри на обувь у двери. Поставь каждый ботинок к его паре, а потом ровно выстрой пары рядом друг с другом. Когда у каждого ботинка появится пара, отойди и посмотри на ряд.',
        safetyNote: 'Переставляй только ту обувь, которую тебе разрешено трогать, и не загораживай проход, чтобы никто не споткнулся.',
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
    missionId: 'helping-03',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Table Helper',
        instruction:
          'Ask an adult to set the table together with you. They choose the items that are safe for you to carry and hand them to you. Put a napkin, a spoon and an unbreakable cup at each place at the table. When every place is set, tell the adult you have finished.',
        adultInvolvementNote:
          'An adult takes part in this mission: they choose and hand you every item you carry.',
        safetyNote:
          'Carry only the unbreakable items the adult gives you. Never carry anything hot, sharp or heavy.',
      },
      de: {
        title: 'Tischhelfer',
        instruction:
          'Bitte einen Erwachsenen, mit dir zusammen den Tisch zu decken. Er sucht die Sachen aus, die du sicher tragen kannst, und gibt sie dir. Leg an jeden Platz eine Serviette, einen Löffel und einen unzerbrechlichen Becher. Wenn jeder Platz gedeckt ist, sag dem Erwachsenen, dass du fertig bist.',
        adultInvolvementNote:
          'Ein Erwachsener macht bei dieser Mission mit: Er sucht jeden Gegenstand aus und gibt ihn dir in die Hand.',
        safetyNote:
          'Trage nur die unzerbrechlichen Sachen, die der Erwachsene dir gibt. Trage nie etwas Heißes, Scharfes oder Schweres.',
      },
      ru: {
        title: 'Помощник за столом',
        instruction:
          'Попроси взрослого накрыть стол вместе с тобой. Он выбирает вещи, которые тебе безопасно нести, и подаёт их тебе. Положи на каждое место салфетку, ложку и небьющуюся кружку. Когда все места будут накрыты, скажи взрослому, что всё готово.',
        adultInvolvementNote:
          'Взрослый участвует в этой миссии: он выбирает и подаёт тебе каждый предмет.',
        safetyNote:
          'Неси только небьющиеся предметы, которые дал взрослый. Никогда не бери горячее, острое или тяжёлое.',
      },
    },
    adultInvolvement: 'Adult participation required',
    safetyNoteRequired: true,
    catalogOrder: 30,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'helping-04',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Smooth the Blanket',
        instruction:
          'Go to your bed and pull the blanket up towards the top. Smooth it flat with both hands until the wrinkles are gone, then put your pillow back in its place. When the bed looks smooth, press your hand flat on it once.',
        safetyNote:
          'Move only your own bedding, and keep both feet on the floor.',
      },
      de: {
        title: 'Die Decke glatt streichen',
        instruction:
          'Geh zu deinem Bett und zieh die Decke nach oben. Streich sie mit beiden Händen glatt, bis keine Falten mehr da sind, und leg dein Kissen wieder an seinen Platz. Wenn das Bett glatt aussieht, leg einmal deine flache Hand darauf.',
        safetyNote:
          'Bewege nur dein eigenes Bettzeug und bleib mit beiden Füßen auf dem Boden.',
      },
      ru: {
        title: 'Разгладь одеяло',
        instruction:
          'Подойди к своей кровати и подтяни одеяло к изголовью. Разгладь его обеими руками, пока не исчезнут складки, и верни подушку на место. Когда постель станет ровной, один раз положи на неё раскрытую ладонь.',
        safetyNote:
          'Трогай только своё постельное бельё и стой обеими ногами на полу.',
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
    missionId: 'helping-05',
    category: 'Helping at Home',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Books on the Shelf',
        instruction:
          'Collect the books that are lying around one room. Stand them side by side on a low shelf you can reach. When the books are standing on the shelf, run your finger along the tops.',
        safetyNote:
          'Use only a low shelf you can reach while standing flat on the floor. Never climb on anything to reach higher.',
      },
      de: {
        title: 'Bücher ins Regal',
        instruction:
          'Sammle die Bücher ein, die in einem Raum herumliegen. Stell sie nebeneinander in ein niedriges Regal, das du erreichen kannst. Wenn die Bücher im Regal stehen, fahr mit dem Finger oben an ihnen entlang.',
        safetyNote:
          'Nimm nur ein niedriges Regal, das du erreichst, während du fest auf dem Boden stehst. Klettere nie auf etwas, um höher zu kommen.',
      },
      ru: {
        title: 'Книги на полку',
        instruction:
          'Собери книги, которые лежат в комнате. Поставь их рядом друг с другом на низкую полку, до которой ты достаёшь. Когда книги будут стоять на полке, проведи пальцем по их верху.',
        safetyNote:
          'Бери только низкую полку, до которой достаёшь, стоя обеими ногами на полу. Никогда не залезай на что-нибудь, чтобы дотянуться выше.',
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
    missionId: 'helping-06',
    category: 'Helping at Home',
    ageBands: ['4–6'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Special Delivery',
        instruction:
          'Find three things that belong to other people in your home. Carry each one to its owner or to the place where that person keeps it. When all three have been delivered, take a bow.',
        safetyNote:
          'Carry only light things you are allowed to move. If you do not know who something belongs to, leave it and choose something else.',
      },
      de: {
        title: 'Post für dich',
        instruction:
          'Suche drei Dinge, die anderen Menschen in deinem Zuhause gehören. Bring jedes Ding zu seinem Besitzer oder an den Platz, wo diese Person es aufbewahrt. Wenn alle drei zugestellt sind, mach eine Verbeugung.',
        safetyNote:
          'Trage nur leichte Dinge, die du bewegen darfst. Wenn du nicht weißt, wem etwas gehört, lass es liegen und such dir etwas anderes.',
      },
      ru: {
        title: 'Особая доставка',
        instruction:
          'Найди три вещи, которые принадлежат другим людям в твоём доме. Отнеси каждую вещь её хозяину или туда, где этот человек её хранит. Когда все три вещи будут доставлены, поклонись.',
        safetyNote:
          'Носи только лёгкие вещи, которые тебе разрешено брать. Если не знаешь, чья это вещь, оставь её и выбери другую.',
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
    missionId: 'helping-07',
    category: 'Helping at Home',
    ageBands: ['7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Ready for Tomorrow',
        instruction:
          'Put the things you will need tomorrow — your bag, your jacket, your water bottle — together in one place near the door. When everything is in one place, say out loud what you have put there.',
        safetyNote: 'Move only your own things, and keep the doorway clear so nobody trips.',
      },
      de: {
        title: 'Bereit für morgen',
        instruction:
          'Leg die Sachen, die du morgen brauchst — deine Tasche, deine Jacke, deine Trinkflasche — an einem Platz in der Nähe der Tür zusammen. Wenn alles an einem Platz liegt, sag laut, was du dort hingelegt hast.',
        safetyNote: 'Bewege nur deine eigenen Sachen und halte den Eingang frei, damit niemand stolpert.',
      },
      ru: {
        title: 'Всё готово к завтра',
        instruction:
          'Собери в одно место у двери вещи, которые понадобятся тебе завтра: сумку, куртку, бутылку с водой. Когда всё будет в одном месте, скажи вслух, что там лежит.',
        safetyNote: 'Перекладывай только свои вещи и не загораживай проход, чтобы никто не споткнулся.',
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
    missionId: 'helping-08',
    category: 'Helping at Home',
    ageBands: ['9–10'],
    durationSeconds: 480,
    content: {
      en: {
        title: 'Drawer Reset',
        instruction:
          'Choose one drawer or shelf of your own and ask an adult to check that it is safe to sort. Take out what is inside, put the things that belong together into groups, and place the groups back. When everything is back in groups, close the drawer.',
        adultInvolvementNote:
          'An adult stays nearby: they check that the drawer is safe for you to sort and are there if you need them.',
        safetyNote:
          'Sort only your own soft or unbreakable things. Leave anything sharp, heavy, breakable or unfamiliar for the adult.',
      },
      de: {
        title: 'Schublade neu ordnen',
        instruction:
          'Wähle eine eigene Schublade oder ein eigenes Fach und bitte einen Erwachsenen zu prüfen, ob du sie sicher sortieren kannst. Nimm heraus, was darin ist, ordne die Dinge, die zusammengehören, zu Gruppen und leg die Gruppen zurück. Wenn alles in Gruppen zurückliegt, schließ die Schublade.',
        adultInvolvementNote:
          'Ein Erwachsener bleibt in der Nähe: Er prüft, ob die Schublade für dich sicher ist, und ist da, wenn du ihn brauchst.',
        safetyNote:
          'Sortiere nur deine eigenen weichen oder unzerbrechlichen Sachen. Alles Scharfe, Schwere, Zerbrechliche oder Unbekannte überlässt du dem Erwachsenen.',
      },
      ru: {
        title: 'Порядок в ящике',
        instruction:
          'Выбери свой ящик или полку и попроси взрослого проверить, безопасно ли их разбирать. Достань то, что внутри, сложи подходящие друг к другу вещи в группы и верни группы на место. Когда всё будет разложено по группам, закрой ящик.',
        adultInvolvementNote:
          'Взрослый находится рядом: он проверяет, безопасен ли ящик для разбора, и остаётся поблизости, если понадобится.',
        safetyNote:
          'Разбирай только свои мягкие или небьющиеся вещи. Всё острое, тяжёлое, хрупкое или незнакомое оставь взрослому.',
      },
    },
    adultInvolvement: 'Adult nearby required',
    safetyNoteRequired: true,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-01',
    category: 'Learning',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'What Can You Remember?',
        instruction:
          'Look at one shelf or table while you slowly count to thirty, and try to remember everything on it. Then walk out of the room and say out loud everything you can remember. When you have said everything, go back and look again to see what was missing. It is normal to forget some things, and finding them again is the best part.',
        safetyNote:
          'Choose a shelf you are allowed to look at, and stay in the rooms you are allowed to be in.',
      },
      de: {
        title: 'Woran erinnerst du dich?',
        instruction:
          'Schau ein Regal oder einen Tisch an, während du langsam bis dreißig zählst, und versuche, dir alles darauf zu merken. Geh dann aus dem Raum und sag laut alles auf, woran du dich erinnerst. Wenn du alles gesagt hast, geh zurück und schau noch einmal, was gefehlt hat. Es ist normal, etwas zu vergessen, und das Wiederfinden ist das Schönste daran.',
        safetyNote:
          'Wähle ein Regal, das du anschauen darfst, und bleib in den Räumen, in denen du sein darfst.',
      },
      ru: {
        title: 'Что ты запомнишь?',
        instruction:
          'Посмотри на одну полку или на стол, пока медленно считаешь до тридцати, и постарайся запомнить всё, что там есть. Потом выйди из комнаты и назови вслух всё, что помнишь. Когда назовёшь всё, вернись и посмотри ещё раз, чего не хватало. Забыть что-то — это нормально, а находить забытое интереснее всего.',
        safetyNote:
          'Выбери полку, на которую тебе разрешено смотреть, и оставайся в комнатах, где тебе можно находиться.',
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
    missionId: 'learning-02',
    category: 'Learning',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Sound Hunt',
        instruction:
          'Listen carefully to the room around you until you have heard at least three different sounds. Then name every sound you heard. When you have named at least three sounds, listen once more to see whether a new one appears.',
      },
      de: {
        title: 'Geräuschsuche',
        instruction:
          'Höre genau auf den Raum um dich herum, bis du mindestens drei verschiedene Geräusche gehört hast. Sag dann jedes Geräusch, das du gehört hast. Wenn du mindestens drei Geräusche genannt hast, höre noch einmal hin, ob ein neues dazukommt.',
      },
      ru: {
        title: 'Охота за звуками',
        instruction:
          'Внимательно послушай комнату вокруг себя, пока не различишь хотя бы три разных звука. Потом назови все звуки, которые услышишь. Когда назовёшь хотя бы три звука, послушай ещё раз — вдруг появится новый.',
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
    missionId: 'learning-03',
    category: 'Learning',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'What Happened Here?',
        instruction:
          'Look around one room like a detective and find three clues that show what someone did here today: a cup on the table, shoes by the door, a cushion pushed to one side. When you have found three clues, say out loud the story they tell.',
        safetyNote:
          'Look only at things that are out in the open. Do not open drawers, bags or anything that belongs to someone else.',
      },
      de: {
        title: 'Was ist hier passiert?',
        instruction:
          'Schau dich in einem Raum um wie ein Detektiv und finde drei Spuren, die zeigen, was hier heute jemand gemacht hat: eine Tasse auf dem Tisch, Schuhe an der Tür, ein zur Seite geschobenes Kissen. Wenn du drei Spuren gefunden hast, erzähle laut die Geschichte, die sie erzählen.',
        safetyNote:
          'Schau dir nur Dinge an, die offen herumstehen. Öffne keine Schubladen, keine Taschen und nichts, was jemand anderem gehört.',
      },
      ru: {
        title: 'Что здесь произошло?',
        instruction:
          'Осмотри одну комнату как настоящий детектив и найди три следа того, что здесь сегодня делали: кружку на столе, обувь у двери, сдвинутую в сторону подушку. Когда найдёшь три следа, расскажи вслух историю, которую они рассказывают.',
        safetyNote:
          'Смотри только на то, что лежит на виду. Не открывай ящики, сумки и ничего, что принадлежит другим.',
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
    missionId: 'learning-04',
    category: 'Learning',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Roll It Down',
        instruction:
          'Lean a book against something low to make a small ramp on the floor. Find three different round things and roll them down the ramp one at a time. When all three have rolled, say which one travelled furthest and why you think it did.',
        safetyNote:
          'Build the ramp low and on the floor. Use only light, unbreakable things, and do not stand or lean on the ramp.',
      },
      de: {
        title: 'Lass es rollen',
        instruction:
          'Lehne ein Buch an etwas Niedriges, so entsteht eine kleine Rampe auf dem Boden. Suche drei verschiedene runde Dinge und lass sie nacheinander die Rampe hinunterrollen. Wenn alle drei gerollt sind, sag, welches am weitesten gekommen ist und warum du das glaubst.',
        safetyNote:
          'Bau die Rampe niedrig und auf dem Boden. Nimm nur leichte, unzerbrechliche Dinge und stell dich nicht auf die Rampe und lehn dich nicht daran.',
      },
      ru: {
        title: 'Пусти с горки',
        instruction:
          'Прислони книгу к чему-нибудь низкому — получится маленькая горка на полу. Найди три разных круглых предмета и по очереди пусти их с горки. Когда прокатятся все три, скажи, какой уехал дальше всех и почему, как тебе кажется, так вышло.',
        safetyNote:
          'Делай горку низкой и на полу. Бери только лёгкие небьющиеся предметы, не вставай на горку и не опирайся на неё.',
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
    catalogOrder: 50,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-06',
    category: 'Learning',
    ageBands: ['4–6'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'What Comes Next?',
        instruction:
          'Make a pattern on the floor with two kinds of safe things, like a spoon, a sock, a spoon, a sock. Then add the next two things to keep the pattern going. When your pattern has at least six things, point along it and say it out loud.',
        safetyNote:
          'Use only light, unbreakable things you are allowed to use, and put them back when you finish.',
      },
      de: {
        title: 'Was kommt als Nächstes?',
        instruction:
          'Leg auf dem Boden ein Muster aus zwei Arten von sicheren Dingen, zum Beispiel Löffel, Socke, Löffel, Socke. Leg dann die nächsten zwei Dinge dazu, damit das Muster weitergeht. Wenn dein Muster mindestens sechs Dinge hat, zeig daran entlang und sag es laut.',
        safetyNote:
          'Nimm nur leichte, unzerbrechliche Dinge, die du benutzen darfst, und räum sie danach zurück.',
      },
      ru: {
        title: 'Что дальше?',
        instruction:
          'Выложи на полу узор из двух видов безопасных предметов: например, ложка, носок, ложка, носок. Потом добавь следующие два предмета, чтобы узор продолжился. Когда в узоре будет хотя бы шесть предметов, покажи на каждый предмет по очереди и произнеси узор вслух.',
        safetyNote:
          'Бери только лёгкие небьющиеся предметы, которыми тебе разрешено пользоваться, и верни их на место, когда закончишь.',
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
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'learning-08',
    category: 'Learning',
    ageBands: ['9–10'],
    durationSeconds: 300,
    content: {
      en: {
        title: 'Guess and Check',
        instruction:
          'Guess how many steps it takes to walk from one side of a room to the other. Then walk it and count your steps. Compare your guess with the number you counted — it is interesting either way. When you know both numbers, say how close your guess was.',
        safetyNote: 'Walk at a normal pace on clear floor.',
      },
      de: {
        title: 'Schätzen und nachzählen',
        instruction:
          'Schätze, wie viele Schritte es sind, um von einer Seite des Raums zur anderen zu gehen. Geh dann los und zähle deine Schritte. Vergleiche deine Schätzung mit der gezählten Zahl — beides ist spannend. Wenn du beide Zahlen kennst, sag, wie nah deine Schätzung war.',
        safetyNote: 'Geh in normalem Tempo auf freiem Boden.',
      },
      ru: {
        title: 'Угадай и проверь',
        instruction:
          'Угадай, сколько шагов нужно, чтобы пройти комнату от одной стены до другой. Потом пройди и сосчитай шаги. Сравни свою догадку с тем, что получилось, — интересно в любом случае. Когда узнаешь оба числа, скажи, насколько близкой была догадка.',
        safetyNote: 'Иди обычным шагом по свободному полу.',
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
    missionId: 'calm-01',
    category: 'Calm',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Slow Look',
        instruction:
          'Sit somewhere comfortable and choose one thing near you to look at. Notice three things about it you had not noticed before: its colour, its edges, its marks. When you have noticed three things, close your eyes for a moment and then get up slowly.',
      },
      de: {
        title: 'Langsam hinsehen',
        instruction:
          'Setz dich bequem hin und such dir einen Gegenstand in deiner Nähe zum Anschauen aus. Entdecke drei Dinge daran, die dir vorher nicht aufgefallen sind: seine Farbe, seine Kanten, seine Spuren. Wenn du drei Dinge entdeckt hast, schließ kurz die Augen und steh dann langsam auf.',
      },
      ru: {
        title: 'Медленный взгляд',
        instruction:
          'Сядь поудобнее и выбери рядом один предмет, чтобы его рассмотреть. Заметь в нём три детали, на которые обычно не обращаешь внимания: цвет, края, следы. Когда заметишь три вещи, ненадолго закрой глаза, а потом медленно встань.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 10,
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
    catalogOrder: 20,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-03',
    category: 'Calm',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Warm and Cool',
        instruction:
          'Walk slowly around one room and touch five safe things. Notice which ones feel warm and which feel cool. When you have touched five things, sit down and remember which one felt best.',
        safetyNote: 'Touch only safe things at your own height. Never touch anything hot, sharp or plugged in.',
      },
      de: {
        title: 'Warm und kühl',
        instruction:
          'Geh langsam durch einen Raum und berühre fünf sichere Dinge. Merke dir, welche sich warm und welche sich kühl anfühlen. Wenn du fünf Dinge berührt hast, setz dich hin und erinnere dich, welches sich am besten angefühlt hat.',
        safetyNote: 'Berühre nur sichere Dinge auf deiner Höhe. Fass nie etwas Heißes, Scharfes oder Eingestecktes an.',
      },
      ru: {
        title: 'Тёплое и прохладное',
        instruction:
          'Медленно пройди по комнате и потрогай пять безопасных предметов. Заметь, какие из них тёплые, а какие прохладные. Когда потрогаешь пять предметов, сядь и вспомни, какой был приятнее всего.',
        safetyNote: 'Трогай только безопасные предметы на своей высоте. Никогда не трогай горячее, острое или включённое в розетку.',
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
    missionId: 'calm-04',
    category: 'Calm',
    ageBands: ['4–6', '7–8', '9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Light and Shadow',
        instruction:
          'Look around the room and find the brightest place and the darkest place. Stand in each one for a moment and notice how different they feel. When you have been in both, choose the one you like better and stay there quietly for a little while.',
        safetyNote:
          'Stay in places you are allowed to be, and look at the light from where you stand. Do not lean on or open a window.',
      },
      de: {
        title: 'Licht und Schatten',
        instruction:
          'Schau dich im Raum um und finde die hellste und die dunkelste Stelle. Stell dich einen Moment an jede Stelle und spüre, wie unterschiedlich sie sich anfühlen. Wenn du an beiden warst, such dir die aus, die dir besser gefällt, und bleib dort eine Weile ruhig stehen.',
        safetyNote:
          'Bleib an Orten, an denen du sein darfst, und schau das Licht von dort an, wo du stehst. Lehn dich nicht an ein Fenster und öffne keines.',
      },
      ru: {
        title: 'Свет и тень',
        instruction:
          'Осмотри комнату и найди самое светлое и самое тёмное место. Постой немного в каждом и почувствуй, насколько по-разному там бывает. Когда побываешь в обоих, выбери то, которое нравится больше, и постой там немного в тишине.',
        safetyNote:
          'Оставайся там, где тебе можно находиться, и смотри на свет оттуда, где стоишь. Не опирайся на окно и не открывай его.',
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
    missionId: 'calm-05',
    category: 'Calm',
    ageBands: ['4–6', '7–8'],
    durationSeconds: 180,
    content: {
      en: {
        title: 'Three Soft Things',
        instruction:
          'Find three soft things you are allowed to touch and hold each one for a moment. When you have held all three, choose the softest one and keep it beside you for a little while.',
        safetyNote: 'Touch only things you are allowed to touch, and keep small things away from your mouth.',
      },
      de: {
        title: 'Drei weiche Dinge',
        instruction:
          'Suche drei weiche Dinge, die du anfassen darfst, und halte jedes einen Moment lang in der Hand. Wenn du alle drei gehalten hast, such dir das weichste aus und behalte es eine Weile neben dir.',
        safetyNote: 'Fass nur Dinge an, die du anfassen darfst, und halte kleine Gegenstände von deinem Mund fern.',
      },
      ru: {
        title: 'Три мягкие вещи',
        instruction:
          'Найди три мягкие вещи, которые тебе разрешено трогать, и подержи каждую немного в руках. Когда подержишь все три, выбери самую мягкую и оставь её ненадолго рядом с собой.',
        safetyNote: 'Трогай только те вещи, которые тебе разрешено трогать, и не подноси мелкие предметы ко рту.',
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
    missionId: 'calm-06',
    category: 'Calm',
    ageBands: ['4–6'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Three Good Places',
        instruction:
          'Think of one nice thing that happened today. It can be something very small. Walk to the place in your home where it happened, or to the place that reminds you of it most, and stand there for a moment. Then do the same for two more nice things. When you have stood in three places, sit down where you are.',
        safetyNote:
          'Stay in the rooms you are allowed to be in, and walk rather than run.',
      },
      de: {
        title: 'Drei schöne Orte',
        instruction:
          'Denk an eine schöne Sache, die heute passiert ist. Sie darf ganz klein sein. Geh an die Stelle in deinem Zuhause, wo sie passiert ist, oder an die Stelle, die dich am meisten daran erinnert, und bleib dort einen Moment stehen. Mach das dann für zwei weitere schöne Sachen. Wenn du an drei Stellen gestanden hast, setz dich dort hin, wo du gerade bist.',
        safetyNote:
          'Bleib in den Räumen, in denen du sein darfst, und geh, statt zu rennen.',
      },
      ru: {
        title: 'Три хороших места',
        instruction:
          'Вспомни одну приятную вещь, которая случилась сегодня. Она может быть совсем маленькой. Подойди к тому месту в доме, где это случилось, или к тому, которое напоминает об этом больше всего, и постой там немного. Потом сделай так же для ещё двух приятных вещей. Когда побываешь в трёх местах, сядь там, где стоишь.',
        safetyNote:
          'Оставайся в комнатах, где тебе можно находиться, и иди шагом, а не бегом.',
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
    catalogOrder: 70,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
  {
    missionId: 'calm-08',
    category: 'Calm',
    ageBands: ['9–10'],
    durationSeconds: 240,
    content: {
      en: {
        title: 'Slow Motion',
        instruction:
          'Choose one ordinary thing you do every day, such as walking to the door or sitting down in a chair. Do it as slowly as you possibly can, so slowly that someone watching could hardly see you move. When you have finished, notice how different it felt from the usual way.',
      },
      de: {
        title: 'Zeitlupe',
        instruction:
          'Wähle eine ganz alltägliche Sache, die du jeden Tag machst, zum Beispiel zur Tür gehen oder dich auf einen Stuhl setzen. Mach sie so langsam, wie du nur kannst — so langsam, dass jemand, der zuschaut, deine Bewegung kaum sehen würde. Wenn du fertig bist, spüre nach, wie anders sich das angefühlt hat.',
      },
      ru: {
        title: 'Медленное движение',
        instruction:
          'Выбери одно обычное дело, которое делаешь каждый день: например, дойти до двери или сесть на стул. Сделай его так медленно, как только можешь, — так медленно, чтобы со стороны движение было почти незаметно. Когда закончишь, прислушайся, насколько иначе это ощущалось.',
      },
    },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 80,
    contentVersion: CATALOG_CONTENT_VERSION,
    reviewed: true,
    discoveryEligible: true,
  },
];
