# Context: words and space

The words Electricity Lens uses on its cards, in the card editors, in the setup
and options, and for its entities and statistics. One thing has one name
everywhere, and a name fits the place it stands in. `card/test/wording.test.ts`
and `tests/test_translations.py` check the rules that can be checked.

## Terms

| German | English | Means | Never for |
|---|---|---|---|
| Energie | Energy | An amount in kWh, where no more specific word fits, such as a column of mixed amounts | Power in kW |
| Verbrauch | Consumption | The kWh the household, Other, or a device draws | kW; the electric car's kWh (see below) |
| Erzeugung | Production | The kWh the PV plant produces | |
| Eigenverbrauch | Self-consumption | PV power used in the house | |
| Einspeisung | Feed-in | PV power sent to the grid, and its compensation | |
| Netzbezug | Grid import | The kWh drawn from the grid | |
| Leistung | Power | What flows right now, in W or kW | Amounts |
| Strom | Electricity | The medium, in compounds: Netzstrom, PV-Strom, Strompreis, Stromkosten, Stromrechnung, Strommix | The name of an amount, except next to Wärme (see below) |
| PV | PV | The plant and its power: PV-Anlage, PV-Strom, PV-Erzeugung, PV-Anteil | |
| Solar | – | Not used: it also means solar thermal | Anything of ours |
| Kosten | Costs | Grid power at its price plus PV power at the lost feed-in compensation | What the supplier bills |
| Stromrechnung | Electricity bill | What the supplier bills: grid power, standing charge; the feed-in compensation is apart | |
| Ø Netzpreis | Average grid price | Grid costs per kWh of grid import | |
| Ø Strompreis | Average price | Costs per kWh of consumption: grid and PV power together; "inkl. PV" / "incl. PV" where there is a PV plant | |
| Netz günstig / normal / teuer | Grid cheap / normal / expensive | Grid power by the price levels of the options | |
| Strommix | Electricity mix | The shares of PV power and grid power in a consumption | |
| Ersparnis | Saving | What an area saves against its comparison, in money | Energy |
| Vergleich | Comparison | What a heat pump or car is compared with: the former heating, a combustion car | |
| Investition | Investment | Purchase cost or extra cost of an area | |
| Bilanz | Balance | Savings minus investments | |
| Amortisation, amortisiert | Payback, paid back | The share of the investment the savings have covered | |
| Rendite | Return | What the savings earn a year beyond the investment | |
| Gerät | Device | An individual device of the energy dashboard | "Verbraucher", "consumer" |
| Sonstiges | Other | Consumption without a device of its own | |
| Bereich | Area | What a figure belongs to: household, grid, PV, heat pump, car, a device | "Kategorie" on cards, in editors, setup, and entities |
| Gesamt | Total | The row of sums under a table, and the total of a chart | "Summe" |
| Verlauf | – | Figures over time, as bars per hour, day, month, or year | |
| Verteilung | – | The shares of a whole in one period, as a ring or bars | |
| Fluss | Flow | From where to where: power right now, energy in a period | |

## Terms by area

Amounts are named as people know them from their device.

| Area | Its kWh | Its costs | Careful |
|---|---|---|---|
| Household, Other, devices | Verbrauch / Consumption | Kosten / Costs | |
| PV plant | Erzeugung / Production, Eigenverbrauch, Einspeisung | – | |
| Heat pump | Stromverbrauch / Electricity; next to Wärme / Heat just Strom / Electricity, since JAZ = Wärme ÷ Strom | Stromkosten / Electricity costs | "Verbrauch" alone means gas or oil for a heating |
| Electric car | Geladene Energie / Charged energy | Ladekosten / Charging costs | "Verbrauch" means kWh per 100 km, as the setup asks for it |
| Former heating, combustion car | – | Kosten Gasheizung … / Gas heating costs …, Kosten Verbrenner / Combustion car costs | |

JAZ / Seasonal COP stays for every period, though strictly it is a yearly
figure: it is the word people know.

## Space

Measured in Roboto, the font of Home Assistant, in the dashboard at a browser
width of 1400 px; the phone's widths follow from its 375 px. A text longer
than its budget wraps, or ends in an ellipsis and shows whole as a tooltip.
`card/test/wording.test.ts` lists the texts of each place and fills their
placeholders with typical long values.

| Place | Font | Desktop | Phone | Budget |
|---|---|---|---|---|
| Card title | 24 px | 371 px in the sidebar | 311 px | 280 px |
| Name of a table row next to two or three numbers | 14 px | about 180 px | about 150 px | 150 px |
| Name of a table row next to one number | 14 px | 314 px | about 240 px | 230 px |
| Title of a key figure | 16 px, medium | 165 px | 135 px | 135 px |
| Title of a key figure with an info icon | 16 px, medium | 141 px | 111 px | 111 px |
| Line under a key figure | 12 px | 165 px | 135 px | 160 px; on a phone it may end in an ellipsis |
| Name of a gauge | 15 px | – | – | 120 px |

## Titles

- **Verlauf**: the figure only, such as "Wärme" or "Ladekosten". "nach Quelle"
  or "nach Gerät" follows only where a view has the same figure twice.
- **Verteilung**: by source "Strommix", by device "‹figure›verteilung", such as
  "Kostenverteilung".
- **Fluss**: "Leistungsfluss" for the power right now, "Energiefluss" for a
  period.
- A figure of an area is named "‹figure› ‹area›" in German and "‹area›
  ‹figure›" in English, from one translated text with placeholders, never by
  joining words in code. In the area's own view the area is left out.
- No title comes from the household's data, such as the names of devices.
- Where a card needs more words, they go into its info, not into its title or
  rows.

## Info

A card whose numbers need a rule to be understood has an info icon next to its
title, as Home Assistant's self-sufficiency gauge has. Its text says in two to
four short sentences what the numbers count, how they are valued, and what is
left out. It uses the terms above and names the comparison, such as "Was die
Gasheizung für dieselbe Wärme gekostet hätte".
