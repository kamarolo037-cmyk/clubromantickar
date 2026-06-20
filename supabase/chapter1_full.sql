-- ============================================
-- КЛУБ РОМАНТИКИ В СОЧИ — Глава 1: «Первый день»
-- ~40 сцен, все 7 персонажей, ветвления
-- ============================================

-- Очищаем старые тестовые сцены главы 1
DELETE FROM scenes WHERE chapter = 1;

INSERT INTO scenes (id, chapter, sort_order, background, characters, speaker, dialogue, choices, next_scene) VALUES

-- ================================================================
-- ПРОЛОГ: В ПОЕЗДЕ
-- ================================================================
('scene_001', 1, 1,
 'train_compartment',
 '[]',
 'narrator',
 'Поезд прибывает в Сочи в 7:14 утра. За окном — пальмы, море, белые дома на склонах. Ты едешь сюда впервые. Или почти впервые.',
 '[]',
 'scene_002'),

('scene_002', 1, 2,
 'train_compartment',
 '[]',
 'narrator',
 'В кармане — мятая записка с адресом. «Ул. Навагинская, 9. Спроси Картуша». Кто такой Картуш, ты узнаешь через двадцать минут.',
 '[]',
 'scene_003'),

('scene_003', 1, 3,
 'sochi_station',
 '[]',
 'narrator',
 'Вокзал Сочи пахнет кофе, морем и чем-то цветочным — магнолия, наверное. Солнце уже жарит, хотя нет и восьми. Жара здесь особая — влажная, обволакивающая.',
 '[
   {"text": "Осмотреться и найти такси", "next_scene": "scene_004a", "effects": {}, "set_flags": {"arrived_by_taxi": true}},
   {"text": "Пойти пешком — карты показывают 15 минут", "next_scene": "scene_004b", "effects": {}, "set_flags": {"arrived_on_foot": true}}
 ]',
 null),

-- ================================================================
-- ПРИБЫТИЕ: ТАКСИ
-- ================================================================
('scene_004a', 1, 4,
 'sochi_station',
 '[{"id": "vovka", "position": "center", "emotion": "neutral"}]',
 'narrator',
 'У выхода сидит большой рыжий пёс. Спокойный, немного меланхоличный. На шее — самодельный ошейник с бусинами. Он смотрит на тебя так, будто ждал.',
 '[
   {"text": "Почесать за ухом", "next_scene": "scene_004a_vovka", "effects": {"vovka": 3}, "set_flags": {"met_vovka": true, "vovka_friendly": true}},
   {"text": "Пройти мимо — торопишься", "next_scene": "scene_005", "effects": {"vovka": -1}, "set_flags": {"met_vovka": true}}
 ]',
 null),

('scene_004a_vovka', 1, 5,
 'sochi_station',
 '[{"id": "vovka", "position": "center", "emotion": "happy"}]',
 'narrator',
 'Пёс закрыл глаза от удовольствия. Хвост медленно, торжественно качнулся. Где-то внутри стало чуть теплее.',
 '[]',
 'scene_005'),

-- ================================================================
-- ПРИБЫТИЕ: ПЕШКОМ
-- ================================================================
('scene_004b', 1, 4,
 'sochi_embankment',
 '[]',
 'narrator',
 'Пятнадцать минут по набережной. Море слева. Пальмы. Кто-то уже купается. Жизнь здесь начинается рано.',
 '[]',
 'scene_004b2'),

('scene_004b2', 1, 5,
 'sochi_embankment',
 '[{"id": "milana", "position": "center", "emotion": "neutral"}]',
 'narrator',
 'На парапете сидит девушка. Ноги болтаются над морем. В наушниках. Ты проходишь мимо — и вдруг она оборачивается.',
 '[
   {"text": "Помахать рукой", "next_scene": "scene_004b_milana", "effects": {"milana": 2}, "set_flags": {"met_milana_early": true}},
   {"text": "Не отвлекаться", "next_scene": "scene_005", "effects": {}, "set_flags": {}}
 ]',
 null),

('scene_004b_milana', 1, 6,
 'sochi_embankment',
 '[{"id": "milana", "position": "center", "emotion": "happy"}]',
 'milana',
 'О, новенький? — Она вытащила один наушник. — Ты совсем не похож на туриста. Это комплимент.',
 '[]',
 'scene_005'),

-- ================================================================
-- ДОМ 9: ВСТРЕЧА С КАРТУШЕМ
-- ================================================================
('scene_005', 1, 7,
 'sochi_yard',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'narrator',
 'Навагинская, 9 — старый дом с лепниной и розовым кустом у входа. Во дворе стоит мужчина лет тридцати с небольшим. Загорелый, нечёсаный, в мятой рубашке.',
 '[]',
 'scene_006'),

('scene_006', 1, 8,
 'sochi_yard',
 '[{"id": "kartush", "position": "center", "emotion": "happy"}]',
 'kartush',
 'А, ты приехал! — Он широко улыбается, протягивает руку. — Картуш. Не спрашивай откуда имя, долго объяснять. Добрался нормально?',
 '[
   {"text": "«Всё отлично. Красивый город»", "next_scene": "scene_007a", "effects": {"kartush": 1}},
   {"text": "«Жарко. И пёс на вокзале чуть не укусил»", "next_scene": "scene_007b", "effects": {"kartush": 2}},
   {"text": "«Зачем я здесь, Картуш?»", "next_scene": "scene_007c", "effects": {"kartush": 0}}
 ]',
 null),

('scene_007a', 1, 9,
 'sochi_yard',
 '[{"id": "kartush", "position": "center", "emotion": "happy"}]',
 'kartush',
 'Красивый — это мягко сказано. — Он хлопнул тебя по плечу. — Пойдём, познакомлю с остальными.',
 '[]',
 'scene_008'),

('scene_007b', 1, 9,
 'sochi_yard',
 '[{"id": "kartush", "position": "center", "emotion": "happy"}]',
 'kartush',
 'Вовка? — Он расхохотался. — Это наш пёс! Он никого не кусает. Просто пугает для порядка. Ладно, пошли, тут все тебя ждут.',
 '[]',
 'scene_008'),

('scene_007c', 1, 9,
 'sochi_yard',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'kartush',
 'Хороший вопрос. — Он посерьёзнел на секунду, потом снова расплылся в улыбке. — Об этом внутри. Здесь стены не слушают, но соседи слушают точно.',
 '[]',
 'scene_008'),

-- ================================================================
-- ТЕРРАСА: ЗНАКОМСТВО С КОМПАНИЕЙ
-- ================================================================
('scene_008', 1, 10,
 'sochi_terrace',
 '[
   {"id": "inessa", "position": "left", "emotion": "neutral"},
   {"id": "vladislava", "position": "right", "emotion": "happy"}
 ]',
 'narrator',
 'На террасе накрыт стол: арбуз, кофе, что-то домашнее. Две женщины. Одна смотрит на тебя спокойно и оценивающе. Другая уже машет рукой.',
 '[]',
 'scene_009'),

('scene_009', 1, 11,
 'sochi_terrace',
 '[{"id": "vladislava", "position": "center", "emotion": "happy"}]',
 'vladislava',
 'О, наконец-то! Я Влада. — Она встала, чтобы пожать руку — крепко, по-деловому. — Слышала про тебя. Картуш говорил, ты умеешь молчать в нужные моменты. Это редкость.',
 '[
   {"text": "«Влада... красивое имя»", "next_scene": "scene_010a", "effects": {"vladislava": 1}},
   {"text": "«Надеюсь, он много хорошего говорил»", "next_scene": "scene_010b", "effects": {"vladislava": 2}},
   {"text": "Промолчать — доказать репутацию", "next_scene": "scene_010c", "effects": {"vladislava": 3}}
 ]',
 null),

('scene_010a', 1, 12,
 'sochi_terrace',
 '[{"id": "vladislava", "position": "center", "emotion": "happy"}]',
 'vladislava',
 'Банальность, но приятная. — Она засмеялась, без иронии. — Садись, кофе пока горячий.',
 '[]',
 'scene_011'),

('scene_010b', 1, 12,
 'sochi_terrace',
 '[{"id": "vladislava", "position": "center", "emotion": "happy"}]',
 'vladislava',
 'Говорил только хорошее. — Она чуть прищурилась. — Но сам увидишь, какой из этого вышел человек.',
 '[]',
 'scene_011'),

('scene_010c', 1, 12,
 'sochi_terrace',
 '[{"id": "vladislava", "position": "left", "emotion": "surprised"}]',
 'vladislava',
 'Молча смотришь. Влада моргнула. Потом расхохоталась. — Ладно, убедил. Садись.',
 '[]',
 'scene_011'),

-- ================================================================
-- ЗНАКОМСТВО С ИНЕССОЙ
-- ================================================================
('scene_011', 1, 13,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Инесса. — Она не встала, только взглянула поверх чашки. — Картуш сказал, ты из Москвы. Это объясняет спешку.',
 '[
   {"text": "«Не все москвичи спешат»", "next_scene": "scene_012a", "effects": {"inessa": 2}},
   {"text": "«Здесь я никуда не спешу»", "next_scene": "scene_012b", "effects": {"inessa": 3}},
   {"text": "«А вы давно в Сочи?»", "next_scene": "scene_012c", "effects": {"inessa": 1}}
 ]',
 null),

('scene_012a', 1, 14,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Все спешат. Просто не все замечают. — Она отпила кофе. — Посмотрим на тебя через неделю.',
 '[]',
 'scene_013'),

('scene_012b', 1, 14,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Пауза. Она изучала тебя секунду-другую. — Хорошо. Это хорошо.',
 '[]',
 'scene_013'),

('scene_012c', 1, 14,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Двенадцать лет. — Коротко. — Сочи меняется, но медленней, чем люди думают.',
 '[]',
 'scene_013'),

-- ================================================================
-- КАРТУШ ОБЪЯСНЯЕТ СИТУАЦИЮ
-- ================================================================
('scene_013', 1, 15,
 'sochi_terrace',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'kartush',
 'Ладно. — Картуш наконец сел, налил себе кофе. — Объясняю, зачем ты здесь. У меня есть дело. Небольшое, но важное. Один человек должен кое-что узнать, а я не могу этим заниматься сам.',
 '[]',
 'scene_014'),

('scene_014', 1, 16,
 'sochi_terrace',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'kartush',
 'Этот человек — Иван. Он появится сегодня вечером. Умный, осторожный. С ним нужно найти общий язык — и выяснить, что происходит с клубом.',
 '[
   {"text": "«Что за клуб?»", "next_scene": "scene_015a", "effects": {"kartush": 1}},
   {"text": "«Почему именно я?»", "next_scene": "scene_015b", "effects": {"kartush": 0}},
   {"text": "«Когда он придёт?»", "next_scene": "scene_015c", "effects": {"kartush": 1}}
 ]',
 null),

('scene_015a', 1, 17,
 'sochi_terrace',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'kartush',
 'Клуб романтики. — Он чуть усмехнулся. — Звучит смешно, знаю. Но это не то, что ты думаешь. Это... сообщество. Со своими правилами и своими тайнами.',
 '[]',
 'scene_016'),

('scene_015b', 1, 17,
 'sochi_terrace',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'kartush',
 'Потому что ты чужой здесь. — Он пожал плечами. — Иногда чужой человек видит то, что местные давно перестали замечать.',
 '[]',
 'scene_016'),

('scene_015c', 1, 17,
 'sochi_terrace',
 '[{"id": "kartush", "position": "center", "emotion": "neutral"}]',
 'kartush',
 'В восемь. В кафе на набережной. — Он помолчал. — Но сначала хочу, чтобы ты немного освоился.',
 '[]',
 'scene_016'),

-- ================================================================
-- СВОБОДНОЕ ВРЕМЯ: ЧТО ДЕЛАТЬ ДО ВЕЧЕРА?
-- ================================================================
('scene_016', 1, 18,
 'sochi_terrace',
 '[]',
 'narrator',
 'Полдень. До встречи с Иваном семь часов. Сочи ждёт.',
 '[
   {"text": "Пойти на пляж — первый раз за год видишь море", "next_scene": "scene_beach_01", "effects": {}, "set_flags": {"chose_beach": true}},
   {"text": "Прогуляться по старому городу", "next_scene": "scene_city_01", "effects": {}, "set_flags": {"chose_city": true}},
   {"text": "Остаться, поговорить с Инессой", "next_scene": "scene_inessa_day", "effects": {"inessa": 1}, "set_flags": {"chose_inessa": true}}
 ]',
 null),

-- ================================================================
-- ВЕТКА: ПЛЯЖ — ВСТРЕЧА С МИЛАНОЙ
-- ================================================================
('scene_beach_01', 1, 19,
 'sochi_beach',
 '[]',
 'narrator',
 'Чёрное море. Галька, а не песок — непривычно для ног. Зато вода прозрачная, зеленоватая у берега и тёмно-синяя вдали.',
 '[]',
 'scene_beach_02'),

('scene_beach_02', 1, 20,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "happy"}]',
 'milana',
 'Эй! — Голос знакомый. Девушка с набережной, та самая с наушниками. — Ты всё-таки добрался. Как тебе Сочи с первого взгляда?',
 '[
   {"text": "«Горячо. Буквально»", "next_scene": "scene_beach_03a", "effects": {"milana": 2}},
   {"text": "«Красивее, чем я ожидал»", "next_scene": "scene_beach_03b", "effects": {"milana": 1}},
   {"text": "«А ты тут живёшь или тоже гостья?»", "next_scene": "scene_beach_03c", "effects": {"milana": 2}}
 ]',
 null),

('scene_beach_03a', 1, 21,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "happy"}]',
 'milana',
 'О да! — Она засмеялась. — Это самое точное описание Сочи, которое я слышала. Хочешь мороженое? Тут за углом делают самое честное пломбир в городе.',
 '[]',
 'scene_beach_04'),

('scene_beach_03b', 1, 21,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "happy"}]',
 'milana',
 '«Ожидал» — значит, что-то знал заранее? — Она tilted her head. — Ты с Картушем приехал?',
 '[]',
 'scene_beach_04'),

('scene_beach_03c', 1, 21,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "happy"}]',
 'milana',
 'Живу. Три года. До этого — Краснодар. — Она сняла очки от солнца. — А ты не похож на туриста. Серьёзный слишком.',
 '[]',
 'scene_beach_04'),

('scene_beach_04', 1, 22,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "neutral"}]',
 'milana',
 'Она помолчала, глядя на море. — Картуш хороший человек. Но у него всегда что-нибудь затевается. Ты поосторожней.',
 '[
   {"text": "«Ты его давно знаешь?»", "next_scene": "scene_beach_05a", "effects": {"milana": 2}},
   {"text": "«Осторожней — это как?»", "next_scene": "scene_beach_05b", "effects": {"milana": 1}},
   {"text": "Улыбнуться: «Я осторожный»", "next_scene": "scene_beach_05c", "effects": {"milana": 2}}
 ]',
 null),

('scene_beach_05a', 1, 23,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "neutral"}]',
 'milana',
 'Года три. Мы соседи. — Она подобрала камешек, бросила в воду. — Он хороший. Просто иногда берёт на себя слишком много.',
 '[]',
 'scene_evening_prep'),

('scene_beach_05b', 1, 23,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "neutral"}]',
 'milana',
 'Просто... здесь всё немного сложней, чем кажется сначала. — Пауза. — Особенно с клубом.',
 '[]',
 'scene_evening_prep'),

('scene_beach_05c', 1, 23,
 'sochi_beach',
 '[{"id": "milana", "position": "center", "emotion": "happy"}]',
 'milana',
 'Она посмотрела на тебя внимательно. Потом улыбнулась — первый раз по-настоящему. — Может, и так.',
 '[]',
 'scene_evening_prep'),

-- ================================================================
-- ВЕТКА: СТАРЫЙ ГОРОД — ВСТРЕЧА С ЕВГЕНИЕЙ
-- ================================================================
('scene_city_01', 1, 19,
 'sochi_old_city',
 '[]',
 'narrator',
 'Старый Сочи — это дворики с виноградом, коты на заборах и запах кофе из каждого второго окна. Ты идёшь без цели. Это приятно.',
 '[]',
 'scene_city_02'),

('scene_city_02', 1, 20,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "neutral"}]',
 'narrator',
 'У книжного развала — девушка с рыжими волосами. Перебирает пластинки, что-то тихо напевает. Замечает тебя, но не торопится здороваться.',
 '[
   {"text": "Подойти, спросить про книги", "next_scene": "scene_city_03a", "effects": {"evgeniya": 2}},
   {"text": "Пройти мимо — не хочется навязываться", "next_scene": "scene_city_03b", "effects": {}},
   {"text": "Остановиться рядом, просто смотреть на пластинки", "next_scene": "scene_city_03c", "effects": {"evgeniya": 3}}
 ]',
 null),

('scene_city_03a', 1, 21,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "happy"}]',
 'evgeniya',
 'О, читатель? — Она обернулась. — У него только советские детективы и Remarque. Но это же именно то, что нужно в жару.',
 '[]',
 'scene_city_04'),

('scene_city_03b', 1, 21,
 'sochi_old_city',
 '[]',
 'narrator',
 'Ты идёшь дальше. Сворачиваешь в переулок, находишь маленькое кафе. Эспрессо за 80 рублей. В Москве такого не бывает.',
 '[]',
 'scene_evening_prep'),

('scene_city_03c', 1, 21,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "happy"}]',
 'evgeniya',
 'Долгая пауза. Потом она тихо: — Редкость. Человек, который умеет стоять рядом и молчать. Большинство сразу что-то говорят.',
 '[]',
 'scene_city_04'),

('scene_city_04', 1, 22,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "neutral"}]',
 'evgeniya',
 'Евгения. — Она протянула руку. — Но все зовут Женя. Ты с Картушем? — Не спросила, как, будто догадалась. — Он говорил, что ждёт кого-то из Москвы.',
 '[
   {"text": "«Да. Он твой друг?»", "next_scene": "scene_city_05a", "effects": {"evgeniya": 1}},
   {"text": "«Ты тоже в клубе?»", "next_scene": "scene_city_05b", "effects": {"evgeniya": 2}},
   {"text": "«Хорошо, что он предупреждал»", "next_scene": "scene_city_05c", "effects": {"evgeniya": 1}}
 ]',
 null),

('scene_city_05a', 1, 23,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "neutral"}]',
 'evgeniya',
 'Что-то вроде того. — Она убрала прядь за ухо. — У Картуша нет друзей в классическом смысле. Только люди, которым он доверяет. Это другое.',
 '[]',
 'scene_evening_prep'),

('scene_city_05b', 1, 23,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "neutral"}]',
 'evgeniya',
 'Была. — Коротко. Она не продолжила. Потом добавила тихо: — Там сейчас сложно. Ты скоро сам поймёшь.',
 '[]',
 'scene_evening_prep'),

('scene_city_05c', 1, 23,
 'sochi_old_city',
 '[{"id": "evgeniya", "position": "center", "emotion": "happy"}]',
 'evgeniya',
 'Он всегда предупреждает. — Она улыбнулась уголком рта. — Вопрос в том, что он говорит. Полную версию или свою.',
 '[]',
 'scene_evening_prep'),

-- ================================================================
-- ВЕТКА: РАЗГОВОР С ИНЕССОЙ ДНЁМ
-- ================================================================
('scene_inessa_day', 1, 19,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Инесса не ушла. Сидит с книгой, но не читает. Когда ты остался, она подняла взгляд без удивления.',
 '[]',
 'scene_inessa_day2'),

('scene_inessa_day2', 1, 20,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Решил не идти гулять. — Утверждение, не вопрос. — Умно. Сочи никуда не денется. А первые часы — самые честные.',
 '[
   {"text": "«Честные — в каком смысле?»", "next_scene": "scene_inessa_day3a", "effects": {"inessa": 2}},
   {"text": "«Ты так говоришь, будто знаешь, зачем я здесь»", "next_scene": "scene_inessa_day3b", "effects": {"inessa": 2}},
   {"text": "«Расскажи мне про клуб»", "next_scene": "scene_inessa_day3c", "effects": {"inessa": 1}}
 ]',
 null),

('scene_inessa_day3a', 1, 21,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'В первые часы ты не успел ещё придумать, кем хочешь казаться. — Она закрыла книгу. — Потом придумаешь. Все придумывают.',
 '[]',
 'scene_inessa_day4'),

('scene_inessa_day3b', 1, 21,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Я знаю достаточно. — Долгая пауза. — Картуш умеет выбирать людей. Пока.',
 '[]',
 'scene_inessa_day4'),

('scene_inessa_day3c', 1, 21,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Клуб — это не что рассказывают. Это что чувствуют. — Она встала. — Иван объяснит лучше. Если захочет.',
 '[]',
 'scene_evening_prep'),

('scene_inessa_day4', 1, 22,
 'sochi_terrace',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Она помолчала, смотрела на море вдали. — Ты спрашивать умеешь. Это хорошо. Здесь многие разучились.',
 '[]',
 'scene_evening_prep'),

-- ================================================================
-- ПОДГОТОВКА К ВЕЧЕРУ
-- ================================================================
('scene_evening_prep', 1, 30,
 'sochi_yard',
 '[{"id": "vladislava", "position": "center", "emotion": "neutral"}]',
 'vladislava',
 'Половина восьмого. Влада поймала тебя у выхода. — Стой. Перед Иваном — не суетись. Он чувствует неуверенность как собака. И не говори о Москве первым.',
 '[
   {"text": "«Почему? Что с Москвой?»", "next_scene": "scene_evening2a", "effects": {"vladislava": 1}},
   {"text": "«Спасибо. Что-то ещё?»", "next_scene": "scene_evening2b", "effects": {"vladislava": 2}},
   {"text": "«Я справлюсь»", "next_scene": "scene_evening2c", "effects": {"vladislava": 1}}
 ]',
 null),

('scene_evening2a', 1, 31,
 'sochi_yard',
 '[{"id": "vladislava", "position": "center", "emotion": "neutral"}]',
 'vladislava',
 'Долго объяснять. — Она чуть прищурилась. — Скажем так, у него там неприятные воспоминания. Лучше не трогать.',
 '[]',
 'scene_ivan_cafe'),

('scene_evening2b', 1, 31,
 'sochi_yard',
 '[{"id": "vladislava", "position": "center", "emotion": "happy"}]',
 'vladislava',
 'Слушай больше, чем говоришь. — Она отступила. — И всё будет нормально. Иди.',
 '[]',
 'scene_ivan_cafe'),

('scene_evening2c', 1, 31,
 'sochi_yard',
 '[{"id": "vladislava", "position": "center", "emotion": "neutral"}]',
 'vladislava',
 'Посмотрим. — Коротко. Но без осуждения.',
 '[]',
 'scene_ivan_cafe'),

-- ================================================================
-- КАФЕ: ВСТРЕЧА С ИВАНОМ
-- ================================================================
('scene_ivan_cafe', 1, 32,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'narrator',
 'Кафе «Южная ночь». Столик у окна. Иван уже здесь — пришёл раньше. Высокий, резкие черты лица. Смотрит на тебя без улыбки, но без враждебности.',
 '[]',
 'scene_ivan_cafe2'),

('scene_ivan_cafe2', 1, 33,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Садись. Заказал тебе кофе — надеюсь, пьёшь. — Небольшая пауза. — Картуш говорит, тебе можно доверять. Я привык проверять сам.',
 '[
   {"text": "«Разумный подход»", "next_scene": "scene_ivan3a", "effects": {"ivan": 2}},
   {"text": "«Как будешь проверять?»", "next_scene": "scene_ivan3b", "effects": {"ivan": 1}},
   {"text": "«Я пью кофе. И слушаю»", "next_scene": "scene_ivan3c", "effects": {"ivan": 3}}
 ]',
 null),

('scene_ivan3a', 1, 34,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Он кивнул — почти незаметно. — Клуб романтики существует семь лет. Я один из основателей. Сейчас что-то происходит. Деньги не там. Люди говорят не то.',
 '[]',
 'scene_ivan_story'),

('scene_ivan3b', 1, 34,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Разговорами. — Коротко. Потом, немного мягче: — Клуб существует семь лет. Я один из основателей. Сейчас внутри что-то не так.',
 '[]',
 'scene_ivan_story'),

('scene_ivan3c', 1, 34,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Первая улыбка. Едва заметная, но настоящая. — Хорошо. Тогда слушай. Клуб романтики — семь лет. Я основал его с двумя людьми. Один из них теперь меня тревожит.',
 '[]',
 'scene_ivan_story'),

('scene_ivan_story', 1, 35,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Клуб — это не просто встречи. Это сеть. Люди, которые помогают друг другу. Деловые связи, личные... иногда и то, и другое. Сейчас из кассы пропали деньги. Небольшие, но это сигнал.',
 '[]',
 'scene_ivan_choice'),

('scene_ivan_choice', 1, 36,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Картуш считает, что ты можешь помочь разобраться — именно потому что чужой. На тебя не будут подозревать. Вопрос: ты готов?',
 '[
   {"text": "«Да. Расскажи всё с начала»", "next_scene": "scene_ivan_yes", "effects": {"ivan": 3}, "set_flags": {"agreed_to_help": true}},
   {"text": "«Мне нужно подумать до утра»", "next_scene": "scene_ivan_maybe", "effects": {"ivan": 1}, "set_flags": {"agreed_to_help": false}},
   {"text": "«Что я получу взамен?»", "next_scene": "scene_ivan_deal", "effects": {"ivan": 1}, "set_flags": {"agreed_to_help": true}}
 ]',
 null),

('scene_ivan_yes', 1, 37,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "happy"}]',
 'ivan',
 'Иван впервые посмотрел на тебя иначе — с чем-то похожим на уважение. — Хорошо. Есть три человека, которых надо проверить. Начнём завтра. Сейчас — допивай кофе.',
 '[]',
 'scene_chapter1_end'),

('scene_ivan_maybe', 1, 37,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Он кивнул. — Утро — разумно. Только учти: время играет роль. Подумай. Картуш знает, где меня найти.',
 '[]',
 'scene_chapter1_end'),

('scene_ivan_deal', 1, 37,
 'sochi_cafe',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Хороший вопрос. — Он не удивился. — Честный ответ. Лето в Сочи, жильё, доверие нужных людей. И... кое-что ещё, если справишься.',
 '[]',
 'scene_chapter1_end'),

-- ================================================================
-- ФИНАЛ ГЛАВЫ 1
-- ================================================================
('scene_chapter1_end', 1, 38,
 'sochi_embankment_night',
 '[]',
 'narrator',
 'Ночь первая. Набережная пустая, только море шумит. Где-то играет музыка — тихо, будто для тебя одного.',
 '[]',
 'scene_chapter1_end2'),

('scene_chapter1_end2', 1, 39,
 'sochi_embankment_night',
 '[]',
 'narrator',
 'За один день — семь новых людей, один загадочный клуб и город, который уже не отпускает. И это только первая ночь.',
 '[]',
 'scene_chapter1_end3'),

('scene_chapter1_end3', 1, 40,
 'sochi_embankment_night',
 '[]',
 'narrator',
 'Сочи не спит. Ты тоже.',
 '[
   {"text": "Конец первой главы · Продолжение следует...", "next_scene": "scene_chapter1_end3", "effects": {}, "set_flags": {"chapter1_complete": true}}
 ]',
 null);

