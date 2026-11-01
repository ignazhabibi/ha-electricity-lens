# Energy Payback: product concept

A Home Assistant package of three parts: an integration that computes the
household's energy costs and savings, a set of flexible cards that show them,
and a dashboard strategy that puts the cards together into a ready-made
energy dashboard. It answers what Home Assistant's energy dashboard does not:
what the energy cost, where the money went, what a PV plant, a heat pump, and
an electric car have saved, and whether and when they pay off.

This is a product concept: it describes what the product does and how it feels
to use, not the technical design. First revised on 2026-10-31 after the first
test in a real household as an MVP for the payback. Revised on 2026-11-01 to
the target picture: the package replaces the energy dashboard, combining
Home Assistant's energy cards with costs, savings, and key figures, in the
spirit of evcc's energy page but entirely in Home Assistant's look.
`onboarding-flow.html` shows the setup dialogs of the payback part with their
texts. The card designs live on the canvas "Kartenset Entwürfe".

The name "Energy Payback" covers only part of the target picture. A new name
is open (section 13).

## 1. The problem

Many households electrified step by step: a PV plant, then a heat pump
instead of a gas or oil heating, then an electric car instead of a combustion
car. Many have a dynamic electricity tariff. Home Assistant's energy dashboard
shows what was consumed, produced, and paid at the grid. It does not answer
the questions these households actually ask:

- What did each device cost me, including the solar power it used?
- How much of my grid power did I buy in cheap hours?
- What has each investment saved so far, compared with the alternative it replaced?
- Has it paid for itself yet? If not, roughly when?
- Is the whole electrification in the plus already?

Answering this today takes spreadsheets, hand-written template sensors and
cards, or a second tool such as evcc next to Home Assistant. All are fragile
or split the picture, and need knowledge most users do not have.

## 2. Who it is for

Home Assistant users with a configured energy dashboard: grid import with an
electricity price. The household part is useful to all of them; the savings
part to those who own a PV plant, a heat pump, or an electric car charged at
home. They are not expected to write YAML, create helpers, or understand
statistics.

The first user is the developer's own household. Everything must still be
understandable and usable for others.

## 3. What the product does

### 3.1 Three parts

| Part | Does | Depends on |
|---|---|---|
| Integration | Computes costs, mix, savings, and key figures and keeps them as statistics | The energy dashboard and the setup |
| Cards | Show these statistics, on any dashboard | The integration |
| Dashboard strategy | Builds a finished energy dashboard from the cards | Integration and cards |

The rule that separates them: **what changes a number belongs to the
integration; what only changes how it is shown belongs to the card; which card
goes where is decided by the strategy.**

### 3.2 The household

The household is always computed, with or without the categories of 3.3. From
the energy dashboard's meters and prices the integration derives, for every
hour:

- **Consumption** of the household and of each device in the energy dashboard,
  plus "Other" for what no device measures.
- **Mix** of each of them: solar power, and grid power in up to three price
  levels, cheap, normal, and expensive.
- **Costs** of each of them (3.5).
- **Household costs:** grid import minus feed-in compensation, plus the
  standing charge if one is entered.
- **Solar forecast** from the energy dashboard, shown as it is.

### 3.3 Three categories for savings

Each category compares reality with the alternative it replaced. The card and
the setup name the categories by what saves the money; the setup asks for the
meters that measure it.

| Category | Measured by | Saving | Compared with |
|---|---|---|---|
| PV plant | The energy dashboard's solar, grid, and battery meters | Solar power used in the house, valued at the electricity price of that hour, plus the feed-in compensation received | No PV plant: all electricity from the grid, no feed-in |
| Heat pump | Its electricity meters, and heat meters if there are any | What the former gas or oil heating would have cost for the same heat, minus what the heat pump's electricity cost | A gas or oil heating |
| Electric car | The meters of the wallbox (or charging points) | What fuel would have cost for the same distance, minus what the charging electricity cost | A combustion car |

Each category exists once. A household with two cars has one category
"Electric car"; its consumption is the average of the cars.

### 3.4 Payback

For payback, the user may enter per category:

- the PV plant: its purchase cost;
- the heat pump: the extra purchase cost over a gas or oil heating;
- the electric car: the extra purchase cost over a combustion car.

From that, the product shows:

- how much of the investment the savings have covered;
- the average saving per year;
- roughly how many years remain until it has paid off;
- once paid off, the annual return;
- across all categories: the overall balance (savings minus investments) and roughly from when the household is in the plus.

### 3.5 Two questions, two numbers

A device's costs and an investment's saving answer different questions, so
they value solar power differently. The product says so where it shows them.

| Question | Where | Solar power counts at |
|---|---|---|
| What did this device really cost me? | Costs, mix, costs per consumer | The feed-in compensation it did not earn, as evcc does |
| What did the investment save? | Savings, balance, history | The electricity price of that hour, because the benefit of solar power belongs to the PV plant |

- In each hour, the solar power used in the house is shared among the
  consumers of that hour in proportion to their consumption.
- Grid power counts at the electricity price of that hour, or at the
  category's own tariff where one is entered.
- A device's saving can be shown split in two, for example "412 € compared
  with diesel, of which 318 € by the car and 94 € by solar power (in the
  balance with the PV plant)". The balance stays free of double counting.

### 3.6 Results in Home Assistant

- **Statistics** hold every time series Home Assistant has none for: costs,
  mix, the household's and "Other"'s consumption, heat, the alternative's
  costs, and savings. What Home Assistant already keeps,
  such as a device's consumption, is not copied; cards read it from there.
  The statistics belong to the integration alone, so it can compute the past
  and compute it again after corrections. They appear in Home Assistant's
  statistics pickers and cards like any other statistic.
- **Sensors** hold current values for automations: per category saving,
  paid back (%), and saving per year; a device "Balance" with the overall
  balance. For example, a notification when the heat pump has paid off.
- The saving sensor shows since when the category counts and which values it
  currently uses.

### 3.7 The cards

Four cards, each flexible instead of one card per figure. They follow the
energy date selection on the same dashboard, or show a fixed period such as
"this month" or "last month", so they work on any dashboard. Each is set up in
Home Assistant's card editor, with lists to choose from, no YAML needed.

| Card | Shows | Options |
|---|---|---|
| Key figure | One or several tiles for the period, each with a line below such as "19.0 instead of 27.0 ct/kWh" | Title, period, columns; per tile its source |
| History | Bars per hour, day, month, or year, optionally a line | Title, period, source, stacking (by source, device, or not), line, further lines from statistics |
| Breakdown | Shares as a ring or as bars | Title, period, source, split by source or by consumer, energy or costs, ring or bars, bars colored by source |
| Balance | The payback of all categories | None |

Each source is one of two kinds:

- **Energy data** of the integration: an area (household, grid, solar, heat
  pump, electric car, or a device) and a figure (for example costs, average
  price, solar saving, self-sufficiency, share of cheap power, seasonal COP,
  heat price, € per 100 km). The card knows what it shows: colors, stacking,
  units, and the line below.
- **Any statistic or entity** of Home Assistant. The card computes nothing
  with it; it shows the sum over the period, the mean, minimum, maximum, or
  the current value. Examples: outside temperature as a line over the heat,
  the heat for heating and hot water from the heat pump's own sensors.

Cards never compute prices, costs, or savings. Nothing in a card changes a
number, so two cards always agree.

### 3.8 The dashboard strategy

- Picked when adding a dashboard, under "Community dashboards".
- Builds a finished energy dashboard from Home Assistant's energy cards (date
  selection, usage, solar, devices, gauges) and the product's cards.
- Has no settings. It reads from the integration which categories, devices,
  price levels, and forecast exist, and shows only what fits: no heat pump
  view without a heat pump.
- Whoever wants more takes control of the dashboard and builds on with the
  same cards.

### 3.9 One install

- Integration, cards, and strategy come together in one installation via HACS.
- There is no separate dashboard resource to add, and nothing to bump after an update.

## 4. Principles

- **The integration computes, the cards show.** Every figure is computed once,
  hour by hour, and kept as a statistic. Cards and strategy only read.
- **What changes a number belongs to the integration.** Price levels, the
  standing charge, own tariffs: set once, the same in every card.
- **Three phases, one rule each** (section 5). Before Home Assistant nothing counts; until the setup, averages count; from the setup, current values count.
- **Measurements are facts.** The product computes with the data as Home Assistant recorded it. It never corrects or filters readings. Bad readings are fixed in Home Assistant's statistics tools, which also fixes the energy dashboard; then the product is recomputed.
- **Use what Home Assistant knows.** Grid, electricity prices, feed-in, solar, battery, device meters, power sensors, and the solar forecast come from the energy dashboard. The user is asked only for what Home Assistant cannot know.
- **Follow the energy dashboard.** When the user changes something there, the product uses the new setup without being set up again. A new device there gets its costs and mix by itself.
- **No double counting in the balance.** The three savings add up to the household's total saving. The benefit of solar power belongs to the PV plant alone. In the savings, the heat pump and the car pay for all their electricity at the price of that hour, even when the sun delivered it.
- **Two questions, two numbers, said openly** (3.5).
- **Ask little, and say what is fixed.**
  - A field appears only when it is needed for this household.
  - Nothing is preselected that the user did not choose. Nothing is folded away.
  - Values almost nobody knows are fixed and described in the documentation: the former heating's efficiency is 92 %, and heating oil has 10 kWh per litre.
- **Short and clear.** Each dialog explains itself in one or two sentences, each field in at most one line. Terms are the ones users know from their bills and devices.
- **Works without helpers.** Every value can be typed in. A price sensor is an option, never a requirement.
- **Honest numbers.** Savings can be negative for a while, and the product shows that. There is no yearly average from a few months, because seasons distort it. Estimated heat is called an estimate.
- **Robust.** Figures have no gaps when Home Assistant was restarted or switched off for a while.
- **Feels like Home Assistant.**
  - Set up and changed entirely in the UI, in Home Assistant's usual dialogs.
  - The cards look like Home Assistant's own energy cards, in light and dark themes, on phones and desktops.
  - Everything is reachable by keyboard and screen reader, with sufficient contrast.

## 5. Three phases

The phases apply to the categories, whose values have averages for the time
before the setup. The household has no averages: its values apply from the
beginning (section 6.1).

### 5.1 The phases

| Phase | Period | What counts |
|---|---|---|
| 1. Before Home Assistant | Before the first data of a category | Nothing. There is no data and no starting value. The card says "since 27 Jul 2023". |
| 2. Before the setup | From the first data to the setup of the category | One average per value, entered in the setup |
| 3. From the setup | From the setup on | The averages as starting values. Changes and a price sensor apply from the next full hour. |

Each category has its own phases. Its phase 2 begins with the first data of
its meters: solar for the PV plant, the electricity meters for the heat pump,
the charging meters for the car.

### 5.2 What applies when

| Value | Phase 2 | Phase 3 |
|---|---|---|
| Measurements | Recorded data | Recorded data |
| Electricity price and feed-in compensation | What the energy dashboard used for each hour | The same |
| Gas, oil, or fuel price | The average | The current value, or the sensor if one is chosen |
| Consumption of both cars, seasonal COP, own electricity tariff | The average | The current value |
| Investments | The current value always counts. They are totals, not rates. | The same |

- **Electricity price of an hour:** with several tariffs, such as day and night, it is the average of that hour. Before the energy dashboard has costs, its first known price applies.
- **A price sensor** counts only in phase 3. Its history from before the setup is not used, so phase 2 follows one rule without exceptions. While the sensor is unavailable, its last value applies.
- **Changes in phase 3** apply from the next full hour. Hours already computed keep their values.

### 5.3 Corrections

| What changes | What is computed again |
|---|---|
| Averages before the setup | Phase 2 of the category only |
| Meters, or gas instead of oil | The whole category; averages and current values stay |
| The energy dashboard, for example a second solar source or a new device | The household and every category it affects |
| Price levels | The mix of the whole household, from the beginning |
| Standing charge | Nothing; the new value applies from the next full hour |
| "Neu berechnen" after fixing readings in Home Assistant | Everything with the current data; all values stay |
| Investments | Nothing; the new value counts at once |

## 6. In detail

The prerequisite for everything is an energy dashboard with grid import and
an electricity price. Without it, setup ends with a short explanation.

### 6.1 Household

| Input | Required | Source |
|---|---|---|
| Grid import and export with prices | yes | Energy dashboard |
| Solar, battery, devices, solar forecast | no, used if present | Energy dashboard |
| Standing charge per month | no | Setup |
| Cheap up to … per kWh | no | Setup |
| Expensive from … per kWh | no | Setup |

- The standing charge is shared evenly over the hours of its month. Its first value applies from the beginning; a change applies from the next full hour.
- An hour's grid power is cheap when its price is at most the first threshold, expensive when it is at least the second, otherwise normal. Without thresholds there are no levels, only solar and grid.
- With a device and one of its sub-devices (as nested in the energy dashboard), only the outer one counts, so nothing is counted twice; "Other" is what the household used beyond all outer devices.

### 6.2 PV plant

| Input | Required | Source |
|---|---|---|
| Solar production (all solar sources together) | yes | Energy dashboard |
| Grid import with electricity price | yes | Energy dashboard |
| Grid export | yes, if the plant feeds in | Energy dashboard |
| Feed-in compensation | no | Energy dashboard |
| Home battery | no, counted automatically if present | Energy dashboard |
| Purchase cost | no; for the payback | Setup |

- Solar power used in the house is production minus export, plus battery discharge minus battery charge.
- Without a grid export meter the product counts all solar power as used in the house. The setup says so as a warning.

### 6.3 Heat pump

| Input | Required | Source |
|---|---|---|
| Electricity meters (1 or more) | yes | Energy dashboard, individual devices |
| Heat meters (0 or more) | no | Any energy sensor |
| Former heating: gas or oil | yes | Setup |
| Extra purchase cost | no; for the payback | Setup |
| Gas or oil price | yes | Setup: average, optionally a sensor from now on |
| Seasonal COP | only when heat data is missing | Setup: average |
| Own electricity tariff | no; without it the energy dashboard's price counts | Setup: average |

- **Totals, or parts that add up to them.** The user chooses the meter for the whole heat pump if there is one, otherwise the separate meters for heating and hot water; they are added. Heat meters cover the same parts as the electricity meters.
- **One seasonal COP** for heating and hot water together.
- **Measured heat first.**
  - An hour counts as measured when every chosen heat meter has data for it.
  - Otherwise its heat is estimated from the electricity and the seasonal COP.
- **When the setup asks for the COP:**
  - Without heat meters: always, in phase 2 and phase 3.
  - When the electricity data begins before the heat data: in phase 2, with the period named, for example "Schätzt die Wärme bis 02.02.2026".
  - Otherwise never. Should heat data be missing later, those hours use the COP measured until then.
- **Fuel for the same heat:** heat divided by 92 %. Gas is priced per kWh, oil per litre at 10 kWh.
- **The own tariff** also prices the heat pump's costs (3.5), not only its saving.

### 6.4 Electric car

| Input | Required | Source |
|---|---|---|
| Charging meters (1 or more) | yes | Energy dashboard, individual devices |
| Extra purchase cost | no; for the payback | Setup |
| Electric car consumption, kWh/100 km | yes | Setup: average |
| Combustion car consumption, l/100 km | yes | Setup: average |
| Fuel price per litre | yes | Setup: average, optionally a sensor from now on |
| Own electricity tariff | no; without it the energy dashboard's price counts | Setup: average |

- The distance follows from the charged energy and the electric car's consumption. The fuel follows from the distance and the combustion car's consumption.
- The electric car's consumption is the one measured at the wallbox, including charging losses. That is usually 10–15 % more than the car shows. The field says so.
- **The own tariff** also prices the car's charging costs (3.5).

### 6.5 Device choice

- Heat pump and electric car offer the individual devices of the energy dashboard.
- Nothing is preselected.
- A device chosen in one category is not offered in the other.
- If a device and one of its sub-devices (as nested in the energy dashboard) are both chosen, only the outer one counts, so nothing is counted twice.

## 7. Setup and changes

`onboarding-flow.html` has the dialogs of the categories with their texts,
hints, and errors. The texts are German; the English translation follows the
same wording.

### 7.1 First setup

1. **Overview:** what comes from the energy dashboard (✓ or –). The household is always computed; below it, which categories to evaluate. No category is ticked; only possible categories are offered.
2. **Household:** standing charge and price levels, all optional.
3. **PV plant:** since when it counts, and the purchase cost.
4. **Heat pump:** electricity meters, heat meters, former heating, extra purchase cost.
5. **Heat pump, "Durchschnitt seit 01.10.2024":** the averages for phase 2, which also start phase 3; an optional price sensor for phase 3.
6. **Electric car:** charging meters, extra purchase cost.
7. **Electric car, "Durchschnitt seit …":** as step 5.
8. **Done:** the past is being computed; where to find the dashboard and the cards.

Only the chosen categories appear. Steps 5 and 7 are separate because their
date follows from the meters chosen just before.

### 7.2 Later

- **Integration page:** the household is changed with "Configure"; each category is listed with "Reconfigure". There are buttons to add the missing categories; they lead through the same steps as the first setup.
- **Household:** standing charge, price levels, and "Neu berechnen".
- **Reconfigure** of a category opens a menu:
  - **Werte ab jetzt:** current values and price sensor (phase 3).
  - **Durchschnittswerte vor der Einrichtung:** the averages (phase 2).
  - **Zähler und Mehrkosten:** meters, former heating, extra purchase cost.
  - **Neu berechnen:** after fixing readings in Home Assistant.
  - The PV plant has only "Anschaffungskosten" and "Neu berechnen".
- Each dialog says in one sentence what the change does (section 5.3), and confirms it afterwards, for example "Die neuen Werte gelten ab 15:00 Uhr."
- **Removing a category** removes its device, its sensors, its statistics, its row in the balance, and its values. Adding it again starts with a new phase 2.

## 8. The balance card's states

- **a. Just set up:** the past is being computed. This takes seconds, not hours.
- **b. Total view:** savings, investments, progress per category, overall balance.
- **c. Per-year view:** yearly averages, years to payback, the expected date for the plus.
- **d. Only a few months of data:** no yearly figures yet. The card says from when there will be some.
- **e. Partly estimated:** a heat pump with estimated heat says so in its row: "Wärme teilweise geschätzt".

The other cards show "is being computed" while the past is computed, and
"no data for this period" when there is none.

## 9. When something is wrong

- **A meter disappears** from the energy dashboard: a repair notice. The category keeps its last figures until it is fixed.
- **The energy dashboard loses its electricity price:** a repair notice. All figures stay as they are.
- **A price sensor is removed** from Home Assistant: a repair notice that leads to "Werte ab jetzt". Until then its last value applies.
- **Bad readings:** no notice. The figures use the data as it is; the documentation explains how to fix readings and recompute.

## 10. Not part of the first version

- **The flow card** (live flows between solar, grid, house, and devices). Designed, but set aside until it looks right.
- **Settings of the strategy**, such as hiding or reordering views.
- **Investments from a helper** (only typed-in values).
- **A price sensor's history** from before the setup.
- **A notice about implausible readings**, such as a meter going backwards.
- **Importing history** from before the Home Assistant data, for example savings kept in a spreadsheet.
- **Fetching prices** from online services. Existing integrations do that; their sensors can be used.
- **Other categories:** solar thermal, a battery of its own.
- **Other alternatives** than a gas or oil heating and a combustion car.
- **Comparing with the previous year** in the history card.
- **CO₂ figures.**
- **Recording the solar forecast** to show its accuracy. The cards show the live forecast of the energy dashboard.

## 11. Decisions

| Question | Decision |
|---|---|
| Target picture | Replace the energy dashboard: integration, cards, and strategy in one package |
| Household | Always computed, with or without categories |
| Costs of devices | Solar power at the lost feed-in compensation, grid power at the hour's price or own tariff |
| Savings and balance | Solar power's benefit belongs to the PV plant; no double counting |
| Price levels | Optional thresholds for cheap and expensive, set in the integration; a change reclassifies the past |
| Standing charge | Optional, per month, shared over its hours |
| Devices with costs | Every device of the energy dashboard, plus "Other" |
| Time series | Statistics owned by the integration, not entities' statistics; only what Home Assistant has no statistic for |
| Sensors | Current values: saving, paid back (%), saving per year, overall balance |
| Cards | Key figure, history, breakdown, balance; generic, usable on any dashboard |
| Sources in cards | Energy data of the integration, or any statistic or entity shown as it is |
| Strategy | No settings in the first version |
| Start of counting | The first hour with data, per category. No date to enter, no starting value. |
| The past | One average per value for the time before the setup |
| Changing values | From the next full hour. The averages before the setup are corrected separately. |
| Bad readings | Fixed in Home Assistant's statistics, then "Neu berechnen". Never filtered. |
| Several of a kind | One category each. Heat pump and electric car add up several meters. Several cars share an average consumption. |
| Heating and hot water | One seasonal COP for both |
| Former heating | Gas or oil; efficiency fixed at 92 % |
| Own tariffs | Optional own electricity price for the heat pump and the car; prices their costs and their savings |
| Investments | Purchase cost for PV, extra purchase cost for heat pump and car; optional, for the payback |
| Battery storage | Part of the PV plant |
| Units and currency | Per kWh, per litre, and totals, in Home Assistant's currency |
| Distribution | One repository, one HACS entry |

## 12. Steps

Each step is a release that works on its own.

1. **Statistics owned by the integration.** The savings move to statistics of their own; the saving sensors keep only the current value. The history card reads the new statistics. Done in 0.4.0.
2. **Household.** The setup's household part; consumption, mix, and costs per device and for the household, as statistics.
3. **Key figure card.** The forecast tiles show the energy dashboard's live forecast; recording it to show its accuracy later is set aside (section 10).
4. **History card**, replacing the current one, with sources and lines.
5. **Breakdown card.**
6. **Heat pump and car figures:** heat, the alternative's costs, seasonal COP, heat price, € per 100 km, the split saving (3.5).
7. **Dashboard strategy.**
8. **New name**, before the strategy is published.

## 13. Open

- **Name.** Candidates: Energy Lens, Energy Studio, Energy Deck, Energy Pro.
- **Views of the strategy.** Proposed: overview, electricity, solar, heating, charging, balance; under discussion.
- `clean-install-mockup.html` shows the earlier journey and card states. `onboarding-flow.html` replaces its setup part; the household step is still to be added there.

## 14. Quality expectations

- **Home Assistant guidelines:** follow the developer guidelines at contributors.home-assistant.io and come as close to Platinum on the integration quality scale as a custom integration can.
- **Languages:** English and German.
- **Interfaces:** prefer public Home Assistant interfaces. Where none exists, isolate the dependency, document it, and fail with a clear repair notice instead of wrong numbers.
- **Verification of the cards:** check them in light and dark themes, at phone and desktop widths, with keyboard and screen reader.
- **Performance:** computing the past must not slow Home Assistant down noticeably, even with several years of data.
