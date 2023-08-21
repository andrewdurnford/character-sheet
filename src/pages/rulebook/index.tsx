import { useState } from "react"
import { Markdown } from "../../components/Markdown"
import React from "react"
import { Button, LinkButton } from "../../components/Button"
import { List } from "../../components/List"

const races = `
# Races

## Racial Traits

The description of each race includes racial traits that are common to members of that race. The following entries appear among the traits of most races.

### Ability Score Increase

Every race increases one or more of a character’s ability scores.

### Age

The age entry notes the age when a member of the race is considered an adult, as well as the race’s expected lifespan. This information can help you decide how old your character is at the start of the game. You can choose any age for your character, which could provide an explanation for some of your ability scores. For example, if you play a young or very old character, your age could explain a particularly low Strength or Constitution score, while advanced age could account for a high Intelligence or Wisdom.

### Alignment

Most races have tendencies toward certain alignments, described in this entry. These are not binding for player characters, but considering why your dwarf is chaotic, for example, in defiance of lawful dwarf society can help you better define your character.

### Size

Characters of most races are Medium, a size category including creatures that are roughly 4 to 8 feet tall. Members of a few races are Small (between 2 and 4 feet tall), which means that certain rules of the game affect them differently. The most important of these rules is that Small characters have trouble wielding heavy weapons, as explained in “Equipment.”

### Speed

Your speed determines how far you can move when traveling ( “Adventuring”) and fighting (“Combat”).

### Languages

By virtue of your race, your character can speak, read, and write certain languages.

### Subraces

Some races have subraces. Members of a subrace have the traits of the parent race in addition to the traits specified for their subrace. Relationships among subraces vary significantly from race to race and world to world.
`

const beyond1stLevel = `
# Beyond 1st Level

As your character goes on adventures and overcomes challenges, he or she gains experience, represented by experience points. A character who reaches a specified experience point total advances in capability. This advancement is called **gaining a level.**

When your character gains a level, his or her class often grants additional features, as detailed in the class description. Some of these features allow you to increase your ability scores, either increasing two scores by 1 each or increasing one score by 2. You can’t increase an ability score above 20. In addition, every character’s proficiency bonus increases at certain levels.

Each time you gain a level, you gain 1 additional Hit Die. Roll that Hit Die, add your Constitution modifier to the roll, and add the total to your hit point maximum. Alternatively, you can use the fixed value shown in your class entry, which is the average result of the die roll (rounded up).

When your Constitution modifier increases by 1, your hit point maximum increases by 1 for each level you have attained. For example, if your 7th-level fighter has a Constitution score of 17, when he reaches 8th level, he increases his Constitution score from 17 to 18, thus increasing his Constitution modifier from +3 to +4. His hit point maximum then increases by 8.

The Character Advancement table summarizes the XP you need to advance in levels from level 1 through level 20, and the proficiency bonus for a character of that level. Consult the information in your character’s class description to see what other improvements you gain at each level.

### Character Advancement

| Experience Points | Level | Proficiency Bonus |
| --- | --- | --- |
| 0 | 1 | +2 |
| 300 | 2 | +2 |
| 900 | 3 | +2 |
| 2700 | 4 | +2 |
| 6500 | 5 | +3 |
| 14000 | 6 | +3 |
| 23000 | 7 | +3 |
| 34000 | 8 | +3 |
| 48000 | 9 | +4 |
| 64000 | 10 | +4 |
| 85000 | 11 | +4 |
| 100000 | 12 | +4 |
| 120000 | 13 | +5 |
| 140000 | 14 | +5 |
| 165000 | 15 | +5 |
| 195000 | 16 | +5 |
| 225000 | 17 | +6 |
| 265000 | 18 | +6 |
| 305000 | 19 | +6 |
| 355000 | 20 | +6 |
`

const multiclassing = `
# Multiclassing

Multiclassing allows you to gain levels in multiple classes. Doing so lets you mix the abilities of those classes to realize a character concept that might not be reflected in one of the standard class options.

With this rule, you have the option of gaining a level in a new class whenever you advance in level, instead of gaining a level in your current class. Your levels in all your classes are added together to determine your character level. For example, if you have three levels in wizard and two in fighter, you’re a 5th-level character.

As you advance in levels, you might primarily remain a member of your original class with just a few levels in another class, or you might change course entirely, never looking back at the class you left behind. You might even start progressing in a third or fourth class. Compared to a single-class character of the same level, you’ll sacrifice some focus in exchange for versatility.

## Prerequisites

To qualify for a new class, you must meet the ability score prerequisites for both your current class and your new one, as shown in the Multiclassing Prerequisites table. For example, a barbarian who decides to multiclass into the druid class must have both Strength and Wisdom scores of 13 or higher. Without the full training that a beginning character receives, you must be a quick study in your new class, having a natural aptitude that is reflected by higherthan-average ability scores.

### Multiclassing Prerequisites

| Class | Ability Score Minimum |
| --- | --- |
| Barbarian | Strength 13 |
| Bard | Charisma 13 |
| Cleric | Wisdom 13 |
| Druid | Wisdom 13 |
| Fighter | Strength 13 or Dexterity 13 |
| Monk | Dexterity 13 and Wisdom 13 |
| Paladin | Strength 13 and Charisma 13 |
| Ranger | Dexterity 13 and Wisdom 13 |
| Rogue | Dexterity 13 |
| Sorcerer | Charisma 13 |
| Warlock | Charisma 13 |
| Wizard | Intelligence 13 |

## Experience Points

The experience point cost to gain a level is always based on your total character level, as shown in the Character Advancement table, not your level in a particular class. So, if you are a cleric 6/fighter 1, you must gain enough XP to reach 8th level before you can take your second level as a fighter or your seventh level as a cleric.

## Hit Points and Hit Dice

You gain the hit points from your new class as described for levels after 1st. You gain the 1st-level hit points for a class only when you are a 1st-level character.

You add together the Hit Dice granted by all your classes to form your pool of Hit Dice. If the Hit Dice are the same die type, you can simply pool them together. For example, both the fighter and the paladin have a d10, so if you are a paladin 5/fighter 5, you have ten d10 Hit Dice. If your classes give you Hit Dice of different types, keep track of them separately. If you are a paladin 5/cleric 5, for example, you have five d10 Hit Dice and five d8 Hit Dice.

## Proficiency Bonus

Your proficiency bonus is always based on your total character level, as shown in the Character Advancement table, not your level in a particular class. For example, if you are a fighter 3/rogue 2, you have the proficiency bonus of a 5th-level character, which is +3.

## Proficiencies

When you gain your first level in a class other than your initial class, you gain only some of new class’s starting proficiencies, as shown in the Multiclassing Proficiencies table.

### Multiclassing Proficiencies

| Class | Proficiencies Gained |
| --- | --- |
| Barbarian | Shields, simple weapons, martial weapons |
| Bard | Light armor, one skill of your choice, one musical instrument of your choice |
| Cleric | Light armor, medium armor, shields |
| Druid | Light armor, medium armor, shields (druids will not wear armor or use shields made of metal) |
| Fighter | Light armor, medium armor, shields, simple weapons, martial weapons |
| Monk | Simple weapons, shortswords |
| Paladin | Light armor, medium armor, shields, simple weapons, martial weapons |
| Ranger | Light armor, medium armor, shields, simple weapons, martial weapons, one skill from the class’s skill list |
| Rogue | Light armor, one skill from the class’s skill list, thieves’ tools |
| Sorcerer | — |
| Warlock | Light armor, simple weapons |
| Wizard | — |

## Class Features

When you gain a new level in a class, you get its features for that level. You don’t, however, receive the class’s starting equipment, and a few features have additional rules when you’re multiclassing: Channel Divinity, Extra Attack, Unarmored Defense, and Spellcasting.

### Channel Divinity

If you already have the Channel Divinity feature and gain a level in a class that also grants the feature, you gain the Channel Divinity effects granted by that class, but getting the feature again doesn’t give you an additional use of it. You gain additional uses only when you reach a class level that explicitly grants them to you. For example, if you are a cleric 6/paladin 4, you can use Channel Divinity twice between rests because you are high enough level in the cleric class to have more uses. Whenever you use the feature, you can choose any of the Channel Divinity effects available to you from your two classes.

### Extra Attack

If you gain the Extra Attack class feature from more than one class, the features don’t add together. You can’t make more than two attacks with this feature unless it says you do (as the fighter’s version of Extra Attack does). Similarly, the warlock’s eldritch invocation Thirsting Blade doesn’t give you additional attacks if you also have Extra Attack.

### Unarmored Defense

If you already have the Unarmored Defense feature, you can’t gain it again from another class.

## Spellcasting

Your capacity for spellcasting depends partly on your combined levels in all your spellcasting classes and partly on your individual levels in those classes. Once you have the Spellcasting feature from more than one class, use the rules below. If you multiclass but have the Spellcasting feature from only one class, you follow the rules as described in that class.

***Spells Known and Prepared.*** You determine what spells you know and can prepare for each class individually, as if you were a single-classed member of that class. If you are a ranger 4/wizard 3, for example, you know three 1st-level ranger spells based on your levels in the ranger class. As 3rd-level wizard, you know three wizard cantrips, and your spellbook contains ten wizard spells, two of which (the two you gained when you reached 3rd level as a wizard) can be 2nd-level spells. If your Intelligence is 16, you can prepare six wizard spells from your spellbook.

Each spell you know and prepare is associated with one of your classes, and you use the spellcasting ability of that class when you cast the spell. Similarly, a spellcasting focus, such as a holy symbol, can be used only for the spells from the class associated with that focus.

***Spell Slots.*** You determine your available spell slots by adding together all your levels in the bard, cleric, druid, sorcerer, and wizard classes, and half your levels (rounded down) in the paladin and ranger classes. Use this total to determine your spell slots by consulting the Multiclass Spellcaster table.

If you have more than one spellcasting class, this table might give you spell slots of a level that is higher than the spells you know or can prepare. You can use those slots, but only to cast your lower-level spells. If a lower-level spell that you cast, like *burning hands*, has an enhanced effect when cast using a higher-level slot, you can use the enhanced effect, even though you don’t have any spells of that higher level.

For example, if you are the aforementioned ranger 4/wizard 3, you count as a 5th-level character when determining your spell slots: you have four 1st-level slots, three 2nd-level slots, and two 3rd-level slots. However, you don’t know any 3rd-level spells, nor do you know any 2nd-level ranger spells. You can use the spell slots of those levels to cast the spells you do know—and potentially enhance their effects.

***Pact Magic.*** If you have both the Spellcasting class feature and the Pact Magic class feature from the warlock class, you can use the spell slots you gain from the Pact Magic feature to cast spells you know or have prepared from classes with the Spellcasting class feature, and you can use the spell slots you gain from the Spellcasting class feature to cast warlock spells you know.

### Multiclass Spellcaster: Spell Slots per Spell Level

| Lvl. | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1st | 2 | — | — | — | — | — | — | — | — |
| 2nd | 3 | — | — | — | — | — | — | — | — |
| 3rd | 4 | 2 | — | — | — | — | — | — | — |
| 4th | 4 | 3 | — | — | — | — | — | — | — |
| 5th | 4 | 3 | 2 | — | — | — | — | — | — |
| 6th | 4 | 3 | 3 | — | — | — | — | — | — |
| 7th | 4 | 3 | 3 | 1 | — | — | — | — | — |
| 8th | 4 | 3 | 3 | 2 | — | — | — | — | — |
| 9th | 4 | 3 | 3 | 3 | 1 | — | — | — | — |
| 10th | 4 | 3 | 3 | 3 | 2 | — | — | — | — |
| 11th | 4 | 3 | 3 | 3 | 2 | 1 | — | — | — |
| 12th | 4 | 3 | 3 | 3 | 2 | 1 | — | — | — |
| 13th | 4 | 3 | 3 | 3 | 2 | 1 | 1 | — | — |
| 14th | 4 | 3 | 3 | 3 | 2 | 1 | 1 | — | — |
| 15th | 4 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | — |
| 16th | 4 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | — |
| 17th | 4 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | 1 |
| 18th | 4 | 3 | 3 | 3 | 3 | 1 | 1 | 1 | 1 |
| 19th | 4 | 3 | 3 | 3 | 3 | 2 | 1 | 1 | 1 |
| 20th | 4 | 3 | 3 | 3 | 3 | 2 | 2 | 1 | 1 |
`

const alignment = `
# Alignment

A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. Alignment is a combination of two factors: one identifies morality (good, evil, or neutral), and the other describes attitudes toward society and order (lawful, chaotic, or neutral). Thus, nine distinct alignments define the possible combinations.

These brief summaries of the nine alignments describe the typical behavior of a creature with that alignment. Individuals might vary significantly from that typical behavior, and few people are perfectly and consistently faithful to the precepts of their alignment.

**Lawful good** (LG) creatures can be counted on to do the right thing as expected by society. Gold dragons, paladins, and most dwarves are lawful good.

**Neutral good** (NG) folk do the best they can to help others according to their needs. Many celestials, some cloud giants, and most gnomes are neutral good.

**Chaotic good** (CG) creatures act as their conscience directs, with little regard for what others expect. Copper dragons, many elves, and unicorns are chaotic good.

**Lawful neutral** (LN) individuals act in accordance with law, tradition, or personal codes. Many monks and some wizards are lawful neutral.

**Neutral** (N) is the alignment of those who prefer to steer clear of moral questions and don’t take sides, doing what seems best at the time. Lizardfolk, most druids, and many humans are neutral.

**Chaotic neutral** (CN) creatures follow their whims, holding their personal freedom above all else. Many barbarians and rogues, and some bards, are chaotic neutral.

**Lawful evil** (LE) creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order. Devils, blue dragons, and hobgoblins are lawful evil.

**Neutral evil** (NE) is the alignment of those who do whatever they can get away with, without compassion or qualms. Many drow, some cloud giants, and goblins are neutral evil.

**Chaotic evil** (CE) creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust. Demons, red dragons, and orcs are chaotic evil.

## Alignment in the Multiverse

For many thinking creatures, alignment is a moral choice. Humans, dwarves, elves, and other humanoid races can choose whether to follow the paths of good or evil, law or chaos. According to myth, the goodaligned gods who created these races gave them free will to choose their moral paths, knowing that good without free will is slavery.

The evil deities who created other races, though, made those races to serve them. Those races have strong inborn tendencies that match the nature of their gods. Most orcs share the violent, savage nature of the orc gods, and are thus inclined toward evil. Even if an orc chooses a good alignment, it struggles against its innate tendencies for its entire life. (Even half-orcs feel the lingering pull of the orc god’s influence.)

Alignment is an essential part of the nature of celestials and fiends. A devil does not choose to be lawful evil, and it doesn’t tend toward lawful evil, but rather it is lawful evil in its essence. If it somehow ceased to be lawful evil, it would cease to be a devil.

Most creatures that lack the capacity for rational thought do not have alignments—they are **unaligned**. Such a creature is incapable of making a moral or ethical choice and acts according to its bestial nature. Sharks are savage predators, for example, but they are not evil; they have no alignment.
`

const languages = `
# Languages

Your race indicates the languages your character can speak by default, and your background might give you access to one or more additional languages of your choice. Note these languages on your character sheet.

Choose your languages from the Standard Languages table, or choose one that is common in your campaign. With your GM’s permission, you can instead choose a language from the Exotic Languages table or a secret language, such as thieves’ cant or the tongue of druids.

Some of these languages are actually families of languages with many dialects. For example, the Primordial language includes the Auran, Aquan, Ignan, and Terran dialects, one for each of the four elemental planes. Creatures that speak different dialects of the same language can communicate with one another.

### Standard Languages

| Language | Typical Speakers | Script |
| --- | --- | --- |
| Common | Humans | Common |
| Dwarvish | Dwarves | Dwarvish |
| Elvish | Elves | Elvish |
| Giant | Ogres, giants | Dwarvish |
| Gnomish | Gnomes | Dwarvish |
| Goblin | Goblinoids | Dwarvish |
| Halfling | Halflings | Common |
| Orc | Orcs | Dwarvish |

### Standard Languages

| Language | Typical Speakers | Script |
| --- | --- | --- |
| Abyssal | Humans | Infernal |
| Celestial | Dwarves | Celestial |
| Draconic | Elves | Draconic |
| Deep Speech | Ogres, giants | – |
| Infernal | Gnomes | Infernal |
| Primordial | Goblinoids | Dwarvish |
| Sylvan | Halflings | Elvish |
| Undercommon | Orcs | Elvish |
`

const inspiration = `
# Inspiration

Inspiration is a rule the game master can use to reward you for playing your character in a way that’s true to his or her personality traits, ideal, bond, and flaw. By using inspiration, you can draw on your personality trait of compassion for the downtrodden to give you an edge in negotiating with the Beggar Prince. Or inspiration can let you call on your bond to the defense of your home village to push past the effect of a spell that has been laid on you.

## Gaining Inspiration

Your GM can choose to give you inspiration for a variety of reasons. Typically, GMs award it when you play out your personality traits, give in to the drawbacks presented by a flaw or bond, and otherwise portray your character in a compelling way. Your GM will tell you how you can earn inspiration in the game.

You either have inspiration or you don’t—you can’t stockpile multiple “inspirations” for later use.

## Using Inspiration

If you have inspiration, you can expend it when you make an attack roll, saving throw, or ability check. Spending your inspiration gives you advantage on that roll.

Additionally, if you have inspiration, you can reward another player for good roleplaying, clever thinking, or simply doing something exciting in the game. When another player character does something that really contributes to the story in a fun and interesting way, you can give up your inspiration to give that character inspiration.
`

const backgrounds = `
# Backgrounds

Every story has a beginning. Your character’s background reveals where you came from, how you became an adventurer, and your place in the world. Your fighter might have been a courageous knight or a grizzled soldier. Your wizard could have been a sage or an artisan. Your rogue might have gotten by as a guild thief or commanded audiences as a jester.

Choosing a background provides you with important story cues about your character’s identity. The most important question to ask about your background is *what changed*? Why did you stop doing whatever your background describes and start adventuring? Where did you get the money to purchase your starting gear, or, if you come from a wealthy background, why don’t you have *more* money? How did you learn the skills of your class? What sets you apart from ordinary people who share your background?

The sample background presented here provides both concrete benefits (features, proficiencies, and languages) and roleplaying suggestions.

### Proficiencies

Each background gives a character proficiency in two skills (described in “Using Ability Scores”). In addition, most backgrounds give a character proficiency with one or more tools (detailed in “Equipment”).

If a character would gain the same proficiency from two different sources, he or she can choose a different proficiency of the same kind (skill or tool) instead.

## Languages

Some backgrounds also allow characters to learn additional languages beyond those given by race. See “Languages.”

### Equipment

Each background provides a package of starting equipment. If you use the optional rule to spend coin on gear, you do not receive the starting equipment from your background.

### Suggested Characteristics

A background contains suggested personal characteristics based on your background. You can pick characteristics, roll dice to determine them randomly, or use the suggestions as inspiration for characteristics of your own creation.

### Customizing a Background

You might want to tweak some of the features of a background so it better fits your character or the campaign setting. To customize a background, you can replace one feature with any other one, choose any two skills, and choose a total of two tool proficiencies or languages from the sample backgrounds. You can either use the equipment package from your background or spend coin on gear as described in the equipment section. (If you spend coin, you can’t also take the equipment package suggested for your class.) Finally, choose two personality traits, one ideal, one bond, and one flaw. If you can’t find a feature that matches your desired background, work with your GM to create one.

## Acolyte

---

You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.

Choose a god, a pantheon of gods, or some other quasi-divine being from among those listed in "Fantasy-Historical Pantheons" or those specified by your GM, and work with your GM to detail the nature of your religious service. Were you a lesser functionary in a temple, raised from childhood to assist the priests in the sacred rites? Or were you a high priest who suddenly experienced a call to serve your god in a different way? Perhaps you were the leader of a small cult outside of any established temple structure, or even an occult group that served a fiendish master that you now deny.

**Skill Proficiencies:** Insight, Religion

**Languages:** Two of your choice

**Equipment:** A holy symbol (a gift to you when you entered the priesthood), a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a pouch containing 15 gp

### Feature: Shelter of the Faithful

As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle. You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple.

### Suggested Characteristics

Acolytes are shaped by their experience in temples or other religious communities. Their study of the history and tenets of their faith and their relationships to temples, shrines, or hierarchies affect their mannerisms and ideals. Their flaws might be some hidden hypocrisy or heretical idea, or an ideal or bond taken to an extreme.

| d8 | Personality Trait |
| --- | --- |
| 1 | I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example. |
| 2 | I can find common ground between the fiercest enemies, empathizing with them and always working toward peace. |
| 3 | I see omens in every event and action. The gods try to speak to us, we just need to listen |
| 4 | Nothing can shake my optimistic attitude. |
| 5 | I quote (or misquote) sacred texts and proverbs in almost every situation. |
| 6 | I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods. |
| 7 | I’ve enjoyed fine food, drink, and high society among my temple’s elite. Rough living grates on me. |
| 8 | I’ve spent so long in the temple that I have little practical experience dealing with people in the outside world. |

| d6 | Ideal |
| --- | --- |
| 1 | Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful) |
| 2 | Charity. I always try to help those in need, no matter what the personal cost. (Good) |
| 3 | Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic) |
| 4 | Power. I hope to one day rise to the top of my faith’s religious hierarchy. (Lawful) |
| 5 | Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful) |
| 6 | Aspiration. I seek to prove myself worthy of my god’s favor by matching my actions against his or her teachings. (Any) |

| d6 | Bond |
| --- | --- |
| 1 | I would die to recover an ancient relic of my faith that was lost long ago. |
| 2 | I will someday get revenge on the corrupt temple hierarchy who branded me a heretic. |
| 3 | I owe my life to the priest who took me in when my parents died. |
| 4 | Everything I do is for the common people. |
| 5 | I will do anything to protect the temple where I served. |
| 6 | I seek to preserve a sacred text that my enemies consider heretical and seek to destroy. |

| d6 | Flaw |
| --- | --- |
| 1 | I judge others harshly, and myself even more severely. |
| 2 | I put too much trust in those who wield power within my temple’s hierarchy. |
| 3 | My piety sometimes leads me to blindly trust those that profess faith in my god. |
| 4 | I am inflexible in my thinking. |
| 5 | I am suspicious of strangers and expect the worst of them. |
| 6 | Once I pick a goal, I become obsessed with it to the detriment of everything else in my life |
`

const equipment = `
# Equipment

Common coins come in several different denominations based on the relative worth of the metal from which they are made. The three most common coins are the gold piece (gp), the silver piece (sp), and the copper piece (cp).

With one gold piece, a character can buy a bedroll, 50 feet of good rope, or a goat. A skilled (but not exceptional) artisan can earn one gold piece a day. The gold piece is the standard unit of measure for wealth, even if the coin itself is not commonly used. When merchants discuss deals that involve goods or services worth hundreds or thousands of gold pieces, the transactions don’t usually involve the exchange of individual coins. Rather, the gold piece is a standard measure of value, and the actual exchange is in gold bars, letters of credit, or valuable goods.

One gold piece is worth ten silver pieces, the most prevalent coin among commoners. A silver piece buys a laborer’s work for half a day, a flask of lamp oil, or a night’s rest in a poor inn. One silver piece is worth ten copper pieces, which are common among laborers and beggars. A single copper piece buys a candle, a torch, or a piece of chalk.

In addition, unusual coins made of other precious metals sometimes appear in treasure hoards. The electrum piece (ep) and the platinum piece (pp) originate from fallen empires and lost kingdoms, and they sometimes arouse suspicion and skepticism when used in transactions. An electrum piece is worth five silver pieces, and a platinum piece is worth ten gold pieces.

A standard coin weighs about a third of an ounce, so fifty coins weigh a pound.

### Standard Exchange Rates

| Coin | CP | SP | EP | GP | PP |
| --- | --- | --- | --- | --- | --- |
| Copper (cp) | 1 | 1/10 | 1/50 | 1/100 | 1/1000 |
| Silver (sp) | 10 | 1 | 1/5 | 1/10 | 1/100 |
| Electrum (ep) | 50 | 5 | 1 | 1/2 | 1/20 |
| Gold (gp) | 100 | 10 | 2 | 1 | 1/10 |
| Platinum (pp) | 1000 | 100 | 20 | 10 | 1 |
`

const sellingTreasure = `
# Selling Treasure

Opportunities abound to find treasure, equipment, weapons, armor, and more in the dungeons you explore. Normally, you can sell your treasures and trinkets when you return to a town or other settlement, provided that you can find buyers and merchants interested in your loot.

***Arms, Armor, and Other Equipment.*** As a general rule, undamaged weapons, armor, and other equipment fetch half their cost when sold in a market. Weapons and armor used by monsters are rarely in good enough condition to sell.

***Magic Items.*** Selling magic items is problematic. Finding someone to buy a potion or a scroll isn’t too hard, but other items are out of the realm of most but the wealthiest nobles. Likewise, aside from a few common magic items, you won’t normally come across magic items or spells to purchase. The value of magic is far beyond simple gold and should always be treated as such.

***Gems, Jewelry, and Art Objects.*** These items retain their full value in the marketplace, and you can either trade them in for coin or use them as currency for other transactions. For exceptionally valuable treasures, the GM might require you to find a buyer in a large town or larger community first.

***Trade Goods.*** On the borderlands, many people conduct transactions through barter. Like gems and art objects, trade goods—bars of iron, bags of salt, livestock, and so on—retain their full value in the market and can be used as currency.
`

const armor = `
# Armor

Fantasy gaming worlds are a vast tapestry made up of many different cultures, each with its own technology level. For this reason, adventurers have access to a variety of armor types, ranging from leather armor to chain mail to costly plate armor, with several other kinds of armor in between. The Armor table collects the most commonly available types of armor found in the game and separates them into three categories: light armor, medium armor, and heavy armor. Many warriors supplement their armor with a shield.

The Armor table shows the cost, weight, and other properties of the common types of armor worn in fantasy gaming worlds.

***Armor Proficiency.*** Anyone can put on a suit of armor or strap a shield to an arm. Only those proficient in the armor’s use know how to wear it effectively, however. Your class gives you proficiency with certain types of armor. If you wear armor that you lack proficiency with, you have disadvantage on any ability check, saving throw, or attack roll that involves Strength or Dexterity, and you can’t cast spells.

***Armor Class (AC).*** Armor protects its wearer from attacks. The armor (and shield) you wear determines your base Armor Class.

***Heavy Armor.*** Heavier armor interferes with the wearer’s ability to move quickly, stealthily, and freely. If the Armor table shows “Str 13” or “Str 15” in the Strength column for an armor type, the armor reduces the wearer’s speed by 10 feet unless the wearer has a Strength score equal to or higher than the listed score.

***Stealth.*** If the Armor table shows “Disadvantage” in the Stealth column, the wearer has disadvantage on Dexterity (Stealth) checks.

***Shields.*** A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time.

## Light Armor

Made from supple and thin materials, light armor favors agile adventurers since it offers some protection without sacrificing mobility. If you wear light armor, you add your Dexterity modifier to the base number from your armor type to determine your Armor Class.

***Padded.*** Padded armor consists of quilted layers of cloth and batting.

***Leather.*** The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials.

***Studded Leather.*** Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.

## Medium Armor

Medium armor offers more protection than light armor, but it also impairs movement more. If you wear medium armor, you add your Dexterity modifier, to a maximum of +2, to the base number from your armor type to determine your Armor Class.

***Hide.*** This crude armor consists of thick furs and pelts. It is commonly worn by barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor.

***Chain Shirt.*** Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer’s upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers.

***Scale Mail.*** This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets.

***Breastplate.*** This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good protection for the wearer’s vital organs while leaving the wearer relatively unencumbered.

***Half Plate.*** Half plate consists of shaped metal plates that cover most of the wearer’s body. It does not include leg protection beyond simple greaves that are attached with leather straps.

## Heavy Armor

Of all the armor categories, heavy armor offers the best protection. These suits of armor cover the entire body and are designed to stop a wide range of attacks. Only proficient warriors can manage their weight and bulk.

Heavy armor doesn’t let you add your Dexterity modifier to your Armor Class, but it also doesn’t penalize you if your Dexterity modifier is negative.

***Ring Mail.*** This armor is leather armor with heavy rings sewn into it. The rings help reinforce the armor against blows from swords and axes. Ring mail is inferior to chain mail, and it's usually worn only by those who can’t afford better armor.

***Chain Mail.*** Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets.

***Splint.*** This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible chain mail protects the joints.

***Plate.*** Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.

### Armor

| Armor | Cost | Armor Class (AC) | Strength | Stealth | Weight |
| --- | --- | --- | --- | --- | --- |
| ***Light Armor*** |  |  |  |  |  |
| Padded | 5 gp | 11 + Dex modifier | – | Disadvantage | 8 lb. |
| Leather | 10 gp | 11 + Dex modifier | – | – | 10 lb. |
| Studded leather | 45 gp | 12 + Dex modifier | – | – | 13 lb. |
| ***Medium Armor*** |  |  |  |  |  |
| Hide | 10 gp | 12 + Dex modifier (max 2) | – | – | 12 lb. |
| Chain shirt | 50 gp | 13 + Dex modifier (max 2) | – | – | 20 lb. |
| Scale mail | 50 gp | 14 + Dex modifier (max 2) | – | Disadvantage | 45 lb. |
| Breastplate | 400 gp | 14 + Dex modifier (max 2) | – | – | 20 lb. |
| Half plate | 750 gp | 15 + Dex modifier (max 2) | – | Disadvantage | 40 lb. |
| ***Heavy Armor*** |  |  |  |  |  |
| Ring mail | 10 gp | 14 |  | Disadvantage | 40 lb. |
| Chain mail | 75 gp | 16 | Str 13 | Disadvantage | 55 lb. |
| Splint | 200 gp | 17 | Str 15 | Disadvantage | 60 lb. |
| Plate | 1500 gp | 18 | Str 15 | Disadvantage | 65 lb. |
| Shield |  |  |  |  |  |
| Shield | 10 gp | +2 | – | – | 6 lb. |

## Getting Into and Out of Armor

The time it takes to don or doff armor depends on the armor’s category.

***Don.*** This is the time it takes to put on armor. You benefit from the armor’s AC only if you take the full time to don the suit of armor.

***Doff.*** This is the time it takes to take off armor. If you have help, reduce this time by half.

### **************************************************Donning and Doffing Armor**************************************************

| Category | Don | Doff |
| --- | --- | --- |
| Light Armor | 1 minute | 1 minute |
| Medium Armor | 5 minutes | 1 minute |
| Heavy Armor | 10 minutes | 5 minutes |
| Shield | 1 action | 1 action |
`

const weapons = `
# Weapons

Your class grants proficiency in certain weapons, reflecting both the class’s focus and the tools you are most likely to use. Whether you favor a longsword or a longbow, your weapon and your ability to wield it effectively can mean the difference between life and death while adventuring.

The Weapons table shows the most common weapons used in the fantasy gaming worlds, their price and weight, the damage they deal when they hit, and any special properties they possess. Every weapon is classified as either melee or ranged. A **melee weapon** is used to attack a target within 5 feet of you, whereas a **ranged weapon** is used to attack a target at a distance.

## Weapon Proficiency

Your race, class, and feats can grant you proficiency with certain weapons or categories of weapons. The two categories are **simple** and **martial**. Most people can use simple weapons with proficiency. These weapons include clubs, maces, and other weapons often found in the hands of commoners. Martial weapons, including swords, axes, and polearms, require more specialized training to use effectively. Most warriors use martial weapons because these weapons put their fighting style and training to best use.

Proficiency with a weapon allows you to add your proficiency bonus to the attack roll for any attack you make with that weapon. If you make an attack roll using a weapon with which you lack proficiency, you do not add your proficiency bonus to the attack roll.

## Weapon Properties

Many weapons have special properties related to their use, as shown in the Weapons table.

***Ammunition.*** You can use a weapon that has the ammunition property to make a ranged attack only if you have ammunition to fire from the weapon. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammunition by taking a minute to search the battlefield.

If you use a weapon that has the ammunition property to make a melee attack, you treat the weapon as an improvised weapon (see “Improvised Weapons” later in the section). A sling must be loaded to deal any damage when used in this way.

***Finesse.*** When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.

***Heavy.*** Small creatures have disadvantage on attack rolls with heavy weapons. A heavy weapon’s size and bulk make it too large for a Small creature to use effectively.

***Light.*** A light weapon is small and easy to handle, making it ideal for use when fighting with two weapons.

***Loading.*** Because of the time required to load this weapon, you can fire only one piece of ammunition from it when you use an action, bonus action, or reaction to fire it, regardless of the number of attacks you can normally make.

***Range.*** A weapon that can be used to make a ranged attack has a range in parentheses after the ammunition or thrown property. The range lists two numbers. The first is the weapon’s normal range in feet, and the second indicates the weapon’s long range. When attacking a target beyond normal range, you have disadvantage on the attack roll. You can’t attack a target beyond the weapon’s long range.

***Reach.*** This weapon adds 5 feet to your reach when you attack with it, as well as when determining your reach for opportunity attacks with it.

***Special.*** A weapon with the special property has unusual rules governing its use, explained in the weapon’s description (see “Special Weapons” later in this section).

***Thrown.*** If a weapon has the thrown property, you can throw the weapon to make a ranged attack. If the weapon is a melee weapon, you use the same ability modifier for that attack roll and damage roll that you would use for a melee attack with the weapon. For example, if you throw a handaxe, you use your Strength, but if you throw a dagger, you can use either your Strength or your Dexterity, since the dagger has the finesse property.

***Two-Handed.*** This weapon requires two hands when you attack with it.

***Versatile.*** This weapon can be used with one or two hands. A damage value in parentheses appears with the property—the damage when the weapon is used with two hands to make a melee attack.

### Improvised Weapons

Sometimes characters don’t have their weapons and have to attack with whatever is at hand. An improvised weapon includes any object you can wield in one or two hands, such as broken glass, a table leg, a frying pan, a wagon wheel, or a dead goblin.

Often, an improvised weapon is similar to an actual weapon and can be treated as such. For example, a table leg is akin to a club. At the GM’s option, a character proficient with a weapon can use a similar object as if it were that weapon and use his or her proficiency bonus.

An object that bears no resemblance to a weapon deals 1d4 damage (the GM assigns a damage type appropriate to the object). If a character uses a ranged weapon to make a melee attack, or throws a melee weapon that does not have the thrown property, it also deals 1d4 damage. An improvised thrown weapon has a normal range of 20 feet and a long range of 60 feet.

### Silvered Weapons

Some monsters that have immunity or resistance to nonmagical weapons are susceptible to silver weapons, so cautious adventurers invest extra coin to plate their weapons with silver. You can silver a single weapon or ten pieces of ammunition for 100 gp. This cost represents not only the price of the silver, but the time and expertise needed to add silver to the weapon without making it less effective.

### Special Weapons

Weapons with special rules are described here.

***Lance.*** You have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren’t mounted.

***Net.*** A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net.

When you use an action, bonus action, or reaction to attack with a net, you can make only one attack regardless of the number of attacks you can normally make.

### Weapons

| Name | Cost | Damage | Weight | Properties |
| --- | --- | --- | --- | --- |
| ***Simple Melee Weapons*** |  |  |  |  |
| Club | 1 sp | 1d4 bludgeoning | 2 lb. | Light |
| Dagger | 2 gp | 1d4 piercing | 1 lb. | Finesse, light, thrown (range 20/60) |
| Greatclub | 2 sp | 1d8 bludgeoning | 10 lb. | Two-handed |
| Handaxe | 5 gp | 1d6 slashing | 2 lb. | Light, thrown (range 20/60) |
| Javelin | 5 sp | 1d6 piercing | 2 lb. | Thrown (range 30/120) |
| Light hammer | 2 gp | 1d4 bludgeoning | 2 lb. | Light, thrown (range 20/60) |
| Mace | 5 gp | 1d6 bludgeoning | 4 lb. | – |
| Quarterstaff | 2 sp | 1d6 bludgeoning | 4 lb. | Versatile (1d8) |
| Sickle | 1 gp | 1d4 slashing | 2 lb. | Light |
| Spear | 1 gp | 1d6 piercing | 3 lb. | Thrown (range 20/60), versatile (1d8) |
| ***Simple Ranged Weapons*** |  |  |  |  |
| Crossbow, light | 25 gp | 1d8 piercing | 5 lb. | Ammunition (range 80/320), loading, two-handed |
| Dart | 5 cp | 1d4 piercing | 1/4 lb. | Finesse, thrown (range 20/60) |
| Shortbow | 25 gp | 1d6 piercing | 2 lb. | Ammunition (range 80/320), two-handed |
| Sling | 1 sp | 1d4 bludgeoning | – | Ammunition (range 30/120) |
| ***Martial Melee Weapons*** |  |  |  |  |
| Battleaxe | 10 gp | 1d8 slashing | 4 lb. | Versatile (1d10) |
| Flail | 10 gp | 1d8 bludgeoning | 2 lb. | – |
| Glaive | 20 gp | 1d10 slashing | 6 lb. | Heavy, reach, two-handed |
| Greataxe | 30 gp | 1d12 slashing | 7 lb. | Heavy, two-handed |
| Greatsword | 50 gp | 2s6 slashing | 6 lb. | Heavy, two-handed |
| Halberd | 20 gp | 1d10 slashing | 6 lb. | Heavy, reach, two-handed |
| Lance | 10 gp | 1d12 piercing | 6 lb. | Reach, special |
| Longsword | 15 gp | 1d8 slashing | 3 lb. | Versatile (1d10) |
| Maul | 10 gp | 2d6 bludgeoning | 10 lb. | Heavy, two-handed |
| Morningstar | 15 gp | 1d8 piercing | 4 lb. | – |
| Pike | 5 gp | 1d10 piercing | 18 lb. | Heavy, reach, two-handed |
| Rapier | 25 gp | 1d8 piercing | 2 lb. | Finesse |
| Scimitar | 25 gp | 1d6 slashing | 3 lb. | Finesse, light |
| Shortsword | 10 gp | 1d6 piercing | 2 lb. | Finesse, light |
| Trident | 5 gp | 1d6 piercing | 4 lb. | Thrown (range 20/60), versatile (1d8) |
| War pick | 5 gp | 1d8 piercing | 2 lb. | – |
| Warhammer | 15 gp | 1d8 bludgeoning | 2 lb. | Versatile (1d10) |
| Whip | 2 gp | 1d4 slashing | 3 lb. | Finesse, reach |
| ***Martial Ranged Weapons*** |  |  |  |  |
| Blowgun | 10 gp | 1 piercing | 1 lb. | Ammunition (range 25/100), loading |
| Crossbow, hand | 75 gp | 1d6 piercing | 3 lb. | Ammunition (range 30/120), light, loading |
| Crossbow, heavy | 50 gp | 1d10 piercing | 18 lb. | Ammunition (range 100/400), heavy, loading, two-handed |
| Longbow | 50 gp | 1d8 piercing | 2 lb. | Ammunition (range 150/600), heavy, two-handed |
| Net | 1 gp | – | 3 lb. | Special, thrown (range 5/15) |
`

const feats = `
# Feats

A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies training, experience, and abilities beyond what a class provides.

At certain levels, your class gives you the Ability Score Improvement feature. Using the optional feats rule, you can forgo taking that feature to take a feat of your choice instead. You can take each feat only once, unless the feat’s description says otherwise.

You must meet any prerequisite specified in a feat to take that feat. If you ever lose a feat’s prerequisite, you can’t use that feat until you regain the prerequisite. For example, the Grappler feat requires you to have a Strength of 13 or higher. If your Strength is reduced below 13 somehow—perhaps by a withering curse—you can’t benefit from the Grappler feat until your Strength is restored.

## Grappler

---

*Prerequisite: Strength 13 or higher*

You’ve developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:

- You have advantage on attack rolls against a creature you are grappling.
- You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.
`

const time = `
# Time

In situations where keeping track of the passage of time is important, the GM determines the time a task requires. The GM might use a different time scale depending on the context of the situation at hand. In a dungeon environment, the adventurers’ movement happens on a scale of **minutes**. It takes them about a minute to creep down a long hallway, another minute to check for traps on the door at the end of the hall, and a good ten minutes to search the chamber beyond for anything interesting or valuable. 

In a city or wilderness, a scale of **hours** is often more appropriate. Adventurers eager to reach the lonely tower at the heart of the forest hurry across those fifteen miles in just under four hours’ time. 

For long journeys, a scale of **days** works best. Following the road from Baldur’s Gate to Waterdeep, the adventurers spend four uneventful days before a goblin ambush interrupts their journey. 

In combat and other fast-paced situations, the game relies on **rounds**, a 6-second span of time.
`

const damageAndHealing = `
# Damage and Healing

Injury and the risk of death are constant companions of those who explore fantasy gaming worlds. The thrust of a sword, a well-placed arrow, or a blast of flame from a fireball spell all have the potential to damage, or even kill, the hardiest of creatures.

## Hit Points

---

Hit points represent a combination of physical and mental durability, the will to live, and luck. Creatures with more hit points are more difficult to kill. Those with fewer hit points are more fragile.

A creature’s current hit points (usually just called hit points) can be any number from the creature’s hit point maximum down to 0. This number changes frequently as a creature takes damage or receives healing.

Whenever a creature takes damage, that damage is subtracted from its hit points. The loss of hit points has no effect on a creature’s capabilities until the creature drops to 0 hit points.

## Damage Rolls

---

Each weapon, spell, and harmful monster ability specifies the damage it deals. You roll the damage die or dice, add any modifiers, and apply the damage to your target. Magic weapons, special abilities, and other factors can grant a bonus to damage. With a penalty, it is possible to deal 0 damage, but never negative damage.

When attacking with a **weapon**, you add your ability modifier—the same modifier used for the attack roll—to the damage. A **spell** tells you which dice to roll for damage and whether to add any modifiers.

If a spell or other effect deals damage to **more than one target** at the same time, roll the damage once for all of them. For example, when a wizard casts *fireball* or a cleric casts *flame* strike, the spell’s damage is rolled once for all creatures caught in the blast.

### Critical Hits

When you score a critical hit, you get to roll extra dice for the attack’s damage against the target. Roll all of the attack’s damage dice twice and add them together. Then add any relevant modifiers as normal. To speed up play, you can roll all the damage dice at once.

For example, if you score a critical hit with a dagger, roll 2d4 for the damage, rather than 1d4, and then add your relevant ability modifier. If the attack involves other damage dice, such as from the rogue’s Sneak Attack feature, you roll those dice twice as well.

### Damage Types

Different attacks, damaging spells, and other harmful effects deal different types of damage. Damage types have no rules of their own, but other rules, such as damage resistance, rely on the types.

The damage types follow, with examples to help a GM assign a damage type to a new effect.

***Acid.*** The corrosive spray of a black dragon’s breath and the dissolving enzymes secreted by a black pudding deal acid damage.

***Bludgeoning.*** Blunt force attacks—hammers, falling, constriction, and the like—deal bludgeoning damage.

***Cold.*** The infernal chill radiating from an ice devil’s spear and the frigid blast of a white dragon’s breath deal cold damage.

***Fire.*** Red dragons breathe fire, and many spells conjure flames to deal fire damage.

***Force.*** Force is pure magical energy focused into a damaging form. Most effects that deal force damage are spells, including *magic missile* and *spiritual weapon*.

***Lightning.*** A *lightning bolt* spell and a blue dragon’s breath deal lightning damage.

***Necrotic.*** Necrotic damage, dealt by certain undead and a spell such as *chill touch*, withers matter and even the soul.

***Piercing.*** Puncturing and impaling attacks, including spears and monsters’ bites, deal piercing damage.

***Poison.*** Venomous stings and the toxic gas of a green dragon’s breath deal poison damage.

***Psychic.*** Mental abilities such as a mind flayer’s psionic blast deal psychic damage.

***Radiant.*** Radiant damage, dealt by a cleric’s *flame strike* spell or an angel’s smiting weapon, sears the flesh like fire and overloads the spirit with power.

***Slashing.*** Swords, axes, and monsters’ claws deal slashing damage.

***Thunder.*** A concussive burst of sound, such as the effect of the *thunderwave spell*, deals thunder damage.

### Damage Resistance and Vulnerability

---

Some creatures and objects are exceedingly difficult or unusually easy to hurt with certain types of damage.

If a creature or an object has **resistance** to a damage type, damage of that type is halved against it. If a creature or an object has **vulnerability** to a damage type, damage of that type is doubled against it.

Resistance and then vulnerability are applied after all other modifiers to damage. For example, a creature has resistance to bludgeoning damage and is hit by an attack that deals 25 bludgeoning damage. The creature is also within a magical aura that reduces all damage by 5. The 25 damage is first reduced by 5 and then halved, so the creature takes 10 damage.

Multiple instances of resistance or vulnerability that affect the same damage type count as only one instance. For example, if a creature has resistance to fire damage as well as resistance to all nonmagical damage, the damage of a nonmagical fire is reduced by half against the creature, not reduced by threequarters.

## Healing

---

Unless it results in death, damage isn’t permanent. Even death is reversible through powerful magic. Rest can restore a creature’s hit points, and magical methods such as a cure wounds spell or a *potion of healing* can remove damage in an instant.

When a creature receives healing of any kind, hit points regained are added to its current hit points. A creature’s hit points can’t exceed its hit point maximum, so any hit points regained in excess of this number are lost. For example, a druid grants a ranger 8 hit points of healing. If the ranger has 14 current hit points and has a hit point maximum of 20, the ranger regains 6 hit points from the druid, not 8.

A creature that has died can’t regain hit points until magic such as the *revivify* spell has restored it to life.

## Dropping to 0 Hit Points

---

When you drop to 0 hit points, you either die outright or fall unconscious, as explained in the following sections.

### Instant Death

Massive damage can kill you instantly. When damage reduces you to 0 hit points and there is damage remaining, you die if the remaining damage equals or exceeds your hit point maximum.

For example, a cleric with a maximum of 12 hit points currently has 6 hit points. If she takes 18 damage from an attack, she is reduced to 0 hit points, but 12 damage remains. Because the remaining damage equals her hit point maximum, the cleric dies.

### Falling Unconscious

If damage reduces you to 0 hit points and fails to kill you, you fall unconscious (see appendix PH-A). This unconsciousness ends if you regain any hit points.

### Death Saving Throws

Whenever you start your turn with 0 hit points, you must make a special saving throw, called a death saving throw, to determine whether you creep closer to death or hang onto life. Unlike other saving throws, this one isn’t tied to any ability score. You are in the hands of fate now, aided only by spells and features that improve your chances of succeeding on a saving throw.

Roll a d20. If the roll is 10 or higher, you succeed. Otherwise, you fail. A success or failure has no effect by itself. On your third success, you become stable (see below). On your third failure, you die. The successes and failures don’t need to be consecutive; keep track of both until you collect three of a kind. The number of both is reset to zero when you regain any hit points or become stable.

***Rolling 1 or 20.*** When you make a death saving throw and roll a 1 on the d20, it counts as two failures. If you roll a 20 on the d20, you regain 1 hit point.

***Damage at 0 Hit Points.*** If you take any damage while you have 0 hit points, you suffer a death saving throw failure. If the damage is from a critical hit, you suffer two failures instead. If the damage equals or exceeds your hit point maximum, you suffer instant death.

### Stabilizing a Creature

The best way to save a creature with 0 hit points is to heal it. If healing is unavailable, the creature can at least be stabilized so that it isn’t killed by a failed death saving throw.

You can use your action to administer first aid to an unconscious creature and attempt to stabilize it, which requires a successful DC 10 Wisdom (Medicine) check.

A **stable** creature doesn’t make death saving throws, even though it has 0 hit points, but it does remain unconscious. The creature stops being stable, and must start making death saving throws again, if it takes any damage. A stable creature that isn’t healed regains 1 hit point after 1d4 hours.

### Monsters and Death

Most GMs have a monster die the instant it drops to 0 hit points, rather than having it fall unconscious and make death saving throws.

Mighty villains and special nonplayer characters are common exceptions; the GM might have them fall unconscious and follow the same rules as player characters.

## Knocking a Creature Out

---

Sometimes an attacker wants to incapacitate a foe, rather than deal a killing blow. When an attacker reduces a creature to 0 hit points with a melee attack, the attacker can knock the creature out. The attacker can make this choice the instant the damage is dealt. The creature falls unconscious and is stable.

## Temporary Hit Points

---

Some spells and special abilities confer temporary hit points to a creature. Temporary hit points aren’t actual hit points; they are a buffer against damage, a pool of hit points that protect you from injury.

When you have temporary hit points and take damage, the temporary hit points are lost first, and any leftover damage carries over to your normal hit points. For example, if you have 5 temporary hit points and take 7 damage, you lose the temporary hit points and then take 2 damage.

Because temporary hit points are separate from your actual hit points, they can exceed your hit point maximum. A character can, therefore, be at full hit points and receive temporary hit points.

Healing can’t restore temporary hit points, and they can’t be added together. If you have temporary hit points and receive more of them, you decide whether to keep the ones you have or to gain the new ones. For example, if a spell grants you 12 temporary hit points when you already have 10, you can have 12 or 10, not 22.

If you have 0 hit points, receiving temporary hit points doesn’t restore you to consciousness or stabilize you. They can still absorb damage directed at you while you’re in that state, but only true healing can save you.

Unless a feature that grants you temporary hit points has a duration, they last until they’re depleted or you finish a long rest.
`

const pages = {
  races,
  // Races A-Z
  // Classes -- note this does not exist
  // Classes A-Z
  "beyond-1st-level": beyond1stLevel,
  multiclassing,
  alignment,
  languages,
  inspiration,
  backgrounds,
  equipment,
  "selling-treasure": sellingTreasure,
  armor,
  weapons,
  // Adventuring Gear
  // Tools
  // Mounts and Vehicles
  // Trade Goods
  // Expenses
  feats,
  // Using Ability Scores
  time,
  // Movement
  // The Environment
  // Resting
  // Between Adventures
  // The Order of Combat
  // Movement and Position
  // Actions in Combat
  // Making an Attack
  // Cover
  "damage-and-healing": damageAndHealing,
  // Mounted Combat
  // Underwater Combat
  // Spellcasting
  // Spell Lists
  // Spells A-Z
  // Traps
  // Diseases
  // Madness
  // Objects
  // Poisons
  // Magic Items
  // Magic Items A-Z
  // Monsters
  // Monsters A-Z
  // Appendix PH-A: Conditions
  // Appendix PH-B: Fantasy-Historical Pantheons
  // Appendix PH-C: The Planes of Existence
  // Appendix MM-A: Miscellaneous Creatures
  // Appendix MM-B: Nonplayer Characters
}

const pageIds: Array<keyof typeof pages> = [
  "races",
  "beyond-1st-level",
  "multiclassing",
  "alignment",
  "languages",
  "inspiration",
  "backgrounds",
  "equipment",
  "selling-treasure",
  "armor",
  "weapons",
  "feats",
  "time",
  "damage-and-healing",
]

const index: Record<keyof typeof pages, string> = {
  races: "Races",
  "beyond-1st-level": "Beyond First Level",
  multiclassing: "Multiclassing",
  alignment: "Alignment",
  languages: "Languages",
  inspiration: "Inspiration",
  backgrounds: "Backgrounds",
  equipment: "Equipment",
  "selling-treasure": "Selling Treasure",
  armor: "Armor",
  weapons: "Weapons",
  feats: "Feats",
  time: "Time",
  "damage-and-healing": "Damage and Healing",
}

type RulebookProps = {
  defaultPage?: keyof typeof pages
  hasBack?: boolean
  onClose: () => void
}

// TODO: add a global rulebook modal which can be triggerd globally (index), or
// by a specific section related to the character sheet. Use a query parameter
// `?rulebook='page'` to handle navigation
export function Rulebook({
  defaultPage,
  hasBack = true,
  onClose,
}: RulebookProps) {
  const [page, setPage] = useState<keyof typeof pages | "index">(
    defaultPage ?? "index",
  )

  return (
    <React.Fragment>
      <header className="flex items-center justify-between">
        {page === "index" ? (
          <span />
        ) : hasBack ? (
          <LinkButton onClick={() => setPage("index")}>Back</LinkButton>
        ) : null}
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
      </header>
      {page !== "index" ? (
        <Markdown>{pages[page]}</Markdown>
      ) : (
        <React.Fragment>
          <h1 className="my-4 text-2xl font-bold">Rulebook</h1>
          <ul>
            {pageIds.map((pageId) => (
              <List key={pageId} style="disc">
                <LinkButton onClick={() => setPage(pageId)}>
                  {index[pageId]}
                </LinkButton>
              </List>
            ))}
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
