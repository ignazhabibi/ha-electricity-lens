"""Write custom_components/electricity_lens/translations/*.json.

Custom integrations ship finished translation files; Home Assistant's
strings.json references are not resolved for them. Many forms share fields and
appear in the first setup as well as when adding or changing a category, so
the texts are written once here and put together per step.

Run: python scripts/translations.py
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

OUT = Path(__file__).parent.parent / "custom_components/electricity_lens/translations"

TEXTS: dict[str, dict[str, Any]] = {
    "en": {
        "categories": {
            "pv": "PV plant",
            "heat_pump": "Heat pump",
            "wallbox": "Electric car",
        },
        "add": {
            "pv": "Add PV plant",
            "heat_pump": "Add heat pump",
            "wallbox": "Add electric car",
        },
        "overview": {
            "title": "Electricity Lens",
            "description": "Computes the consumption, electricity mix, and costs of your household and of each device. If you like, also what your PV plant, heat pump, and electric car have saved, and when they pay for themselves.\n\nFrom your energy dashboard:\n{grid} Grid import with electricity price\n{export} Feed-in\n{compensation} Feed-in compensation\n✓ Solar: {solar} sources\n{battery} Battery\n✓ Individual devices: {devices}",
            "no_devices": "Heat pump and electric car need individual devices in the [energy dashboard](/config/energy).",
            "no_solar": "The PV plant needs solar production in the [energy dashboard](/config/energy).",
            "household_only": "Without solar production and individual devices in the [energy dashboard](/config/energy), only the household is computed.",
            "categories": "Which savings should be evaluated? (optional)",
        },
        "household": {
            "title": "Household",
            "description": "All optional. The standing charge is added to the grid costs. With price levels you see how much grid power you drew in cheap and in expensive hours.",
        },
        "options": {
            "title": "What do you want to change?",
            "household": "Standing charge and price levels",
            "household_description": "A new standing charge applies from the next full hour. New price levels sort the whole past again.",
            "recompute": "Computes everything again with the current data: the household and all savings. For example after you corrected a wrong reading in the statistics. Your values stay as they are.",
        },
        "statistics": {
            "household": "Household",
            "other": "Other",
            "area_grid": "Grid",
            "area_solar": "Solar",
            "energy": "consumption",
            "solar": "solar power",
            "cost": "costs",
            "solar_cost": "solar power costs",
            "cheap": "cheap grid power",
            "cheap_cost": "cheap grid power costs",
            "expensive": "expensive grid power",
            "expensive_cost": "expensive grid power costs",
            "grid_cost": "Grid costs",
            "grid_import_cost": "Grid import costs",
            "grid_feed_in": "Feed-in compensation",
            "grid_standing_charge": "Standing charge",
            "grid_cheap_saving": "Saving from cheap hours",
            "heat": "heat",
            "distance": "distance",
            "alternative_cost": "comparison costs",
            "solar_saving": "saving by solar power",
            "saving": "saving",
        },
        "pv": {
            "description": "Counted from {since}, when Home Assistant's solar data begins. Production, feed-in, battery, and electricity prices come from the energy dashboard.",
            "no_export": "**The energy dashboard has no feed-in.** All solar power then counts as used in the house.",
        },
        "heat_pump": "Compares the heat pump with your former heating.",
        "wallbox": "Compares the electric car with a combustion car. What is charged at the wallbox is measured.",
        "values": {
            "title": "Average since {since}",
            "gas": "For the time since {since}, Home Assistant does not know your gas prices. Enter averages. They also apply from now on, until you change them.",
            "oil": "For the time since {since}, Home Assistant does not know your heating oil prices. Enter averages. They also apply from now on, until you change them.",
            "wallbox": "For the time since {since}, Home Assistant knows neither fuel prices nor consumptions. Enter averages. They also apply from now on, until you change them.",
        },
        "now": {
            "title": "Values from now on",
            "description": "New values apply from the next full hour. What was computed stays.",
        },
        "before": {
            "title": "Before the setup",
            "description": "Averages for {since} to {until}. If you change them, this period is computed again.",
        },
        "meters": {
            "title": "Meters and extra cost",
            "description": "Other meters or another former heating compute everything again. The extra cost applies at once.",
        },
        "investment": {"title": "Purchase cost"},
        "recompute": {
            "title": "Recompute",
            "pv": "Computes the PV plant again with the current data, for example after you corrected a wrong reading in the statistics. Your values stay as they are.",
            "heat_pump": "Computes the heat pump again with the current data, for example after you corrected a wrong reading in the statistics. Your values stay as they are.",
            "wallbox": "Computes the electric car again with the current data, for example after you corrected a wrong reading in the statistics. Your values stay as they are.",
        },
        "menu": {
            "title": "What do you want to change?",
            "now": "Values from now on",
            "before": "Averages before the setup",
            "meters": "Meters and extra cost",
            "investment": "Purchase cost",
            "recompute": "Recompute",
        },
        "fields": {
            "investment": ("Purchase cost (optional)", "For the payback"),
            "standing_charge": (
                "Standing charge per month (optional)",
                "As on the electricity bill; shared evenly over the hours of the month",
            ),
            "cheap_until": (
                "Cheap up to (optional)",
                "Grid power at this price or below counts as cheap, if a higher price occurred within the last 24 hours",
            ),
            "expensive_from": (
                "Expensive from (optional)",
                "Grid power at this price or above counts as expensive, if a lower price occurred within the last 24 hours",
            ),
            "meters": (
                "Electricity consumption",
                "Total meter, or heating and hot water separately",
            ),
            "heat_meters": (
                "Produced heat (optional)",
                "Heat meters for the same parts as the electricity consumption",
            ),
            "heating": ("Former heating", None),
            "gas_price": ("Gas price", "Unit price on the gas bill"),
            "oil_price": ("Heating oil price", "Average price per litre"),
            "fuel_price": ("Fuel price", None),
            "scop": (
                "Seasonal COP",
                "Estimates the heat from the electricity consumption",
            ),
            "tariff": (
                "Own electricity tariff (optional)",
                "Only with a separate heat pump tariff; otherwise the energy dashboard's price counts",
            ),
            "gas_price_entity": (
                "Gas price sensor (optional)",
                "Replaces the average from now on",
            ),
            "oil_price_entity": (
                "Heating oil price sensor (optional)",
                "Replaces the average from now on",
            ),
            "fuel_price_entity": (
                "Fuel price sensor (optional)",
                "Replaces the average from now on",
            ),
            "ev_consumption": (
                "Electric car consumption",
                "At the wallbox with charging losses, usually 10–15 % above the car's display. With several cars, their average.",
            ),
            "combustion_consumption": (
                "Combustion car consumption",
                "What a comparable combustion car would have used",
            ),
        },
        "overrides": {
            "heat_pump_investment": (
                "Extra cost (optional)",
                "Extra purchase cost over a gas or oil heating. For the payback.",
            ),
            "wallbox_investment": (
                "Extra cost (optional)",
                "Extra purchase cost over a combustion car. For the payback.",
            ),
            "wallbox_meters": ("Charging meters", "Wallbox or charging points"),
            "wallbox_tariff": (
                "Own electricity tariff (optional)",
                "Only with a separate tariff for the car; otherwise the energy dashboard's price counts",
            ),
            "scop_until": (
                "Seasonal COP",
                "Estimates the heat until {heat_until}; there are no readings before",
            ),
            "scop_before": (
                "Seasonal COP",
                "Estimates the heat where none was measured",
            ),
            "now_gas_price_entity": (
                "Gas price sensor (optional)",
                "Replaces the gas price",
            ),
            "now_oil_price_entity": (
                "Heating oil price sensor (optional)",
                "Replaces the heating oil price",
            ),
            "now_fuel_price_entity": (
                "Fuel price sensor (optional)",
                "Replaces the fuel price",
            ),
        },
        "heating": {"gas": "Gas", "oil": "Oil"},
        "errors": {
            "levels_order": "Expensive must be above cheap.",
            "meters_required": "Choose at least one meter.",
            "heating_required": "Choose the former heating.",
            "value_required": "Enter a value above 0.",
            "scop_range": "Enter a seasonal COP between 1 and 10.",
        },
        "aborts": {
            "no_energy_dashboard": "First set up the grid import with an electricity price in the [energy dashboard](/config/energy). Then you can add Electricity Lens.",
            "energy_interface": "The energy dashboard cannot be read. This version of Home Assistant is not supported yet; please look for an update of Electricity Lens.",
            "single_instance_allowed": "Electricity Lens is already set up. Add more on its integration page.",
            "already_configured": "This is already set up. You can change it with Reconfigure.",
            "not_available": "The energy dashboard does not provide the data for this. The PV plant needs solar production, heat pump and electric car need individual devices.",
            "values_from": "The new values apply from {time}.",
            "recomputing": "It is being computed again. This usually takes less than a minute.",
            "investment_saved": "Saved. The purchase cost applies at once.",
            "household_saved": "Saved. The standing charge applies from {time}.",
            "recomputing_all": "Everything is being computed again. With several years of data this can take a few minutes.",
        },
        "create_entry": 'The past is now being computed; with several years of data this can take a few minutes. You find the card "Electricity Lens" under "Add card" when editing a dashboard.',
        "devices": {"total": "Electricity Lens"},
        "entities": {
            "saving": "Saving",
            "payback": "Paid back",
            "saving_per_year": "Saving per year",
            "annual_return": "Return per year",
            "balance": "Balance",
        },
        "attributes": {
            "category": "Category",
            "calculating": "Calculating",
            "counting_since": "Counted since",
            "investment": "Investment",
            "balance": "Balance",
            "yearly_from": "Yearly figures from",
            "price": "Price",
            "heating": "Former heating",
            "heat_estimated": "Heat partly estimated",
        },
        "figure_attributes": {
            "payback": {"investment": "Investment", "years_left": "Years left"},
            "annual_return": {
                "surplus": "Beyond the investment",
                "surplus_percent": "Beyond the investment (percent)",
            },
            "balance": {
                "saved": "Saved",
                "invested": "Invested",
                "per_year": "Saving per year",
            },
        },
        "exceptions": {
            "energy_interface": "Cannot read the energy dashboard: {error}",
        },
        "issues": {
            "energy_interface": (
                "Electricity Lens cannot read the energy dashboard",
                "This version of Home Assistant stores the energy dashboard or its statistics in a way Electricity Lens does not understand. The savings are unavailable until Electricity Lens is updated.",
            ),
            "no_grid_price": (
                "Electricity Lens is missing the electricity price",
                "The energy dashboard has no grid import with an electricity price anymore. The savings keep their last values until it is set up again in the [energy dashboard](/config/energy).",
            ),
            "missing_meter": (
                "{category}: meter missing in the energy dashboard",
                "The energy dashboard no longer has: {meters}. {category} keeps its last figures until this is fixed. Add the meter back in the [energy dashboard](/config/energy), or choose other meters with Reconfigure on the integration page of Electricity Lens.",
            ),
            "missing_price_entity": (
                "{category}: price sensor missing",
                "The price sensor {entity} no longer exists. Until it is replaced, its last value counts. Choose another one, or none, under Reconfigure › Values from now on on the integration page of Electricity Lens.",
            ),
        },
    },
    "de": {
        "categories": {
            "pv": "PV-Anlage",
            "heat_pump": "Wärmepumpe",
            "wallbox": "E-Auto",
        },
        "add": {
            "pv": "PV-Anlage hinzufügen",
            "heat_pump": "Wärmepumpe hinzufügen",
            "wallbox": "E-Auto hinzufügen",
        },
        "overview": {
            "title": "Electricity Lens",
            "description": "Berechnet Verbrauch, Strommix und Kosten deines Haushalts und jedes Geräts. Wenn du möchtest, auch was PV-Anlage, Wärmepumpe und E-Auto gespart haben und wann sie sich bezahlt machen.\n\nAus deinem Energie-Dashboard:\n{grid} Netzbezug mit Strompreis\n{export} Einspeisung\n{compensation} Einspeisevergütung\n✓ Solar: {solar} Quellen\n{battery} Batterie\n✓ Einzelne Geräte: {devices}",
            "no_devices": "Für Wärmepumpe und E-Auto fehlen einzelne Geräte im [Energie-Dashboard](/config/energy).",
            "no_solar": "Für die PV-Anlage fehlt Solar im [Energie-Dashboard](/config/energy).",
            "household_only": "Ohne Solar und einzelne Geräte im [Energie-Dashboard](/config/energy) wird nur der Haushalt berechnet.",
            "categories": "Welche Ersparnisse sollen ausgewertet werden? (optional)",
        },
        "household": {
            "title": "Haushalt",
            "description": "Alles optional. Der Grundpreis kommt zu den Netzkosten dazu. Mit Preisstufen siehst du, wie viel Netzstrom du in günstigen und in teuren Stunden bezogen hast.",
        },
        "options": {
            "title": "Was möchtest du ändern?",
            "household": "Grundpreis und Preisstufen",
            "household_description": "Ein neuer Grundpreis gilt ab der nächsten vollen Stunde. Neue Preisstufen ordnen die ganze Vergangenheit neu ein.",
            "recompute": "Rechnet alles mit den aktuellen Messdaten neu: den Haushalt und alle Ersparnisse. Zum Beispiel nachdem du einen falschen Messwert in den Statistiken korrigiert hast. Deine Werte bleiben, wie sie sind.",
        },
        "statistics": {
            "household": "Haushalt",
            "other": "Sonstiges",
            "area_grid": "Netz",
            "area_solar": "Solar",
            "energy": "Verbrauch",
            "solar": "Solarstrom",
            "cost": "Kosten",
            "solar_cost": "Solarstrom-Kosten",
            "cheap": "günstiger Netzstrom",
            "cheap_cost": "Kosten günstiger Netzstrom",
            "expensive": "teurer Netzstrom",
            "expensive_cost": "Kosten teurer Netzstrom",
            "grid_cost": "Netzkosten",
            "grid_import_cost": "Kosten Netzbezug",
            "grid_feed_in": "Einspeisevergütung",
            "grid_standing_charge": "Grundpreis",
            "grid_cheap_saving": "Ersparnis durch günstige Zeiten",
            "heat": "Wärme",
            "distance": "Strecke",
            "alternative_cost": "Vergleichskosten",
            "solar_saving": "Ersparnis durch PV-Strom",
            "saving": "Ersparnis",
        },
        "pv": {
            "description": "Gerechnet wird ab dem {since}, seitdem hat Home Assistant Solardaten. Erzeugung, Einspeisung, Batterie und Strompreise kommen aus dem Energie-Dashboard.",
            "no_export": "**Im Energie-Dashboard ist keine Einspeisung erfasst.** Dann zählt der ganze Solarstrom als selbst verbraucht.",
        },
        "heat_pump": "Vergleicht die Wärmepumpe mit deiner früheren Heizung.",
        "wallbox": "Vergleicht das E-Auto mit einem Verbrenner. Gemessen wird, was an der Wallbox geladen wird.",
        "values": {
            "title": "Durchschnitt seit {since}",
            "gas": "Für die Zeit seit dem {since} kennt Home Assistant deine Gaspreise nicht. Trage Durchschnittswerte ein. Sie gelten auch ab jetzt, bis du sie änderst.",
            "oil": "Für die Zeit seit dem {since} kennt Home Assistant deine Heizölpreise nicht. Trage Durchschnittswerte ein. Sie gelten auch ab jetzt, bis du sie änderst.",
            "wallbox": "Für die Zeit seit dem {since} kennt Home Assistant weder Spritpreise noch Verbräuche. Trage Durchschnittswerte ein. Sie gelten auch ab jetzt, bis du sie änderst.",
        },
        "now": {
            "title": "Werte ab jetzt",
            "description": "Neue Werte gelten ab der nächsten vollen Stunde. Bisher Berechnetes bleibt.",
        },
        "before": {
            "title": "Vor der Einrichtung",
            "description": "Durchschnittswerte für den {since} bis {until}. Änderst du sie, wird dieser Zeitraum neu berechnet.",
        },
        "meters": {
            "title": "Zähler und Mehrkosten",
            "description": "Andere Zähler oder eine andere frühere Heizung berechnen alles neu. Mehrkosten gelten sofort.",
        },
        "investment": {"title": "Anschaffungskosten"},
        "recompute": {
            "title": "Neu berechnen",
            "pv": "Rechnet die PV-Anlage mit den aktuellen Messdaten neu, zum Beispiel nachdem du einen falschen Messwert in den Statistiken korrigiert hast. Deine Werte bleiben, wie sie sind.",
            "heat_pump": "Rechnet die Wärmepumpe mit den aktuellen Messdaten neu, zum Beispiel nachdem du einen falschen Messwert in den Statistiken korrigiert hast. Deine Werte bleiben, wie sie sind.",
            "wallbox": "Rechnet das E-Auto mit den aktuellen Messdaten neu, zum Beispiel nachdem du einen falschen Messwert in den Statistiken korrigiert hast. Deine Werte bleiben, wie sie sind.",
        },
        "menu": {
            "title": "Was möchtest du ändern?",
            "now": "Werte ab jetzt",
            "before": "Durchschnittswerte vor der Einrichtung",
            "meters": "Zähler und Mehrkosten",
            "investment": "Anschaffungskosten",
            "recompute": "Neu berechnen",
        },
        "fields": {
            "investment": ("Anschaffungskosten (optional)", "Für die Amortisation"),
            "standing_charge": (
                "Grundpreis pro Monat (optional)",
                "Laut Stromrechnung; wird gleichmäßig auf die Stunden des Monats verteilt",
            ),
            "cheap_until": (
                "Günstig bis (optional)",
                "Netzstrom zu diesem Preis oder darunter zählt als günstig, wenn es in den letzten 24 Stunden einen höheren Preis gab",
            ),
            "expensive_from": (
                "Teuer ab (optional)",
                "Netzstrom zu diesem Preis oder darüber zählt als teuer, wenn es in den letzten 24 Stunden einen niedrigeren Preis gab",
            ),
            "meters": (
                "Stromverbrauch",
                "Gesamtzähler, oder Heizung und Warmwasser einzeln",
            ),
            "heat_meters": (
                "Erzeugte Wärme (optional)",
                "Wärmemengenzähler für dieselben Teile wie der Stromverbrauch",
            ),
            "heating": ("Frühere Heizung", None),
            "gas_price": ("Gaspreis", "Arbeitspreis laut Gasrechnung"),
            "oil_price": ("Heizölpreis", "Durchschnittlicher Literpreis"),
            "fuel_price": ("Spritpreis", None),
            "scop": (
                "Jahresarbeitszahl (JAZ)",
                "Schätzt die Wärme aus dem Stromverbrauch",
            ),
            "tariff": (
                "Eigener Stromtarif (optional)",
                "Nur bei eigenem Wärmepumpentarif, sonst gilt der Preis aus dem Energie-Dashboard",
            ),
            "gas_price_entity": (
                "Gaspreis-Sensor (optional)",
                "Ersetzt den Durchschnitt ab jetzt",
            ),
            "oil_price_entity": (
                "Heizölpreis-Sensor (optional)",
                "Ersetzt den Durchschnitt ab jetzt",
            ),
            "fuel_price_entity": (
                "Spritpreis-Sensor (optional)",
                "Ersetzt den Durchschnitt ab jetzt",
            ),
            "ev_consumption": (
                "Verbrauch E-Auto",
                "Ab Wallbox mit Ladeverlusten, meist 10–15 % über der Anzeige im Auto. Bei mehreren Autos der Durchschnitt.",
            ),
            "combustion_consumption": (
                "Verbrauch Verbrenner",
                "Was ein vergleichbarer Verbrenner gebraucht hätte",
            ),
        },
        "overrides": {
            "heat_pump_investment": (
                "Mehrkosten (optional)",
                "Mehrkosten der Anschaffung gegenüber einer Gas- oder Ölheizung. Für die Amortisation.",
            ),
            "wallbox_investment": (
                "Mehrkosten (optional)",
                "Mehrkosten der Anschaffung gegenüber einem Verbrenner. Für die Amortisation.",
            ),
            "wallbox_meters": ("Ladezähler", "Wallbox oder Ladepunkte"),
            "wallbox_tariff": (
                "Eigener Stromtarif (optional)",
                "Nur bei eigenem Autostromtarif, sonst gilt der Preis aus dem Energie-Dashboard",
            ),
            "scop_until": (
                "Jahresarbeitszahl (JAZ)",
                "Schätzt die Wärme bis {heat_until}, dafür fehlen Messwerte",
            ),
            "scop_before": (
                "Jahresarbeitszahl (JAZ)",
                "Schätzt die Wärme, wo keine gemessen wurde",
            ),
            "now_gas_price_entity": (
                "Gaspreis-Sensor (optional)",
                "Ersetzt den Gaspreis",
            ),
            "now_oil_price_entity": (
                "Heizölpreis-Sensor (optional)",
                "Ersetzt den Heizölpreis",
            ),
            "now_fuel_price_entity": (
                "Spritpreis-Sensor (optional)",
                "Ersetzt den Spritpreis",
            ),
        },
        "heating": {"gas": "Gas", "oil": "Öl"},
        "errors": {
            "levels_order": "Teuer muss über günstig liegen.",
            "meters_required": "Wähle mindestens einen Zähler.",
            "heating_required": "Wähle die frühere Heizung.",
            "value_required": "Gib einen Wert über 0 an.",
            "scop_range": "Gib eine JAZ zwischen 1 und 10 an.",
        },
        "aborts": {
            "no_energy_dashboard": "Richte zuerst im [Energie-Dashboard](/config/energy) den Netzbezug mit Strompreis ein. Danach kannst du Electricity Lens hinzufügen.",
            "energy_interface": "Das Energie-Dashboard lässt sich nicht lesen. Diese Version von Home Assistant wird noch nicht unterstützt; bitte sieh nach, ob es ein Update von Electricity Lens gibt.",
            "single_instance_allowed": "Electricity Lens ist schon eingerichtet. Weitere Auswertungen fügst du auf der Integrationsseite hinzu.",
            "already_configured": "Das ist schon eingerichtet. Ändern kannst du es über »Neu konfigurieren«.",
            "not_available": "Das Energie-Dashboard liefert die Daten dafür nicht. Die PV-Anlage braucht Solar, Wärmepumpe und E-Auto brauchen einzelne Geräte.",
            "values_from": "Die neuen Werte gelten ab {time} Uhr.",
            "recomputing": "Wird neu berechnet. Das dauert meist unter einer Minute.",
            "investment_saved": "Gespeichert. Die Anschaffungskosten gelten sofort.",
            "household_saved": "Gespeichert. Der Grundpreis gilt ab {time} Uhr.",
            "recomputing_all": "Alles wird neu berechnet. Bei mehreren Jahren an Daten kann das ein paar Minuten dauern.",
        },
        "create_entry": "Die Vergangenheit wird jetzt nachgerechnet, bei mehreren Jahren an Daten kann das ein paar Minuten dauern. Die Karte »Electricity Lens« findest du im Dashboard unter »Karte hinzufügen«.",
        "devices": {"total": "Electricity Lens"},
        "entities": {
            "saving": "Ersparnis",
            "payback": "Amortisiert",
            "saving_per_year": "Ersparnis pro Jahr",
            "annual_return": "Rendite pro Jahr",
            "balance": "Bilanz",
        },
        "attributes": {
            "category": "Kategorie",
            "calculating": "Wird berechnet",
            "counting_since": "Gezählt seit",
            "investment": "Investition",
            "balance": "Bilanz",
            "yearly_from": "Jahreswerte ab",
            "price": "Preis",
            "heating": "Frühere Heizung",
            "heat_estimated": "Wärme teilweise geschätzt",
        },
        "figure_attributes": {
            "payback": {"investment": "Investition", "years_left": "Restliche Jahre"},
            "annual_return": {
                "surplus": "Über die Investition hinaus",
                "surplus_percent": "Über die Investition hinaus (Prozent)",
            },
            "balance": {
                "saved": "Gespart",
                "invested": "Investiert",
                "per_year": "Ersparnis pro Jahr",
            },
        },
        "exceptions": {
            "energy_interface": "Das Energie-Dashboard kann nicht gelesen werden: {error}",
        },
        "issues": {
            "energy_interface": (
                "Electricity Lens kann das Energie-Dashboard nicht lesen",
                "Diese Home-Assistant-Version speichert das Energie-Dashboard oder seine Statistiken so, wie Electricity Lens es nicht versteht. Die Ersparnisse sind nicht verfügbar, bis Electricity Lens aktualisiert ist.",
            ),
            "no_grid_price": (
                "Electricity Lens fehlt der Strompreis",
                "Im Energie-Dashboard gibt es keinen Netzbezug mit Strompreis mehr. Die Ersparnisse behalten ihre letzten Werte, bis er im [Energie-Dashboard](/config/energy) wieder eingerichtet ist.",
            ),
            "missing_meter": (
                "{category}: Zähler fehlt im Energie-Dashboard",
                "Im Energie-Dashboard fehlt: {meters}. {category} behält die letzten Werte, bis das behoben ist. Trag den Zähler im [Energie-Dashboard](/config/energy) wieder ein, oder wähle mit »Neu konfigurieren« auf der Integrationsseite von Electricity Lens andere Zähler.",
            ),
            "missing_price_entity": (
                "{category}: Preis-Sensor fehlt",
                "Den Preis-Sensor {entity} gibt es nicht mehr. Bis er ersetzt ist, gilt sein letzter Wert. Wähle auf der Integrationsseite von Electricity Lens unter »Neu konfigurieren › Werte ab jetzt« einen anderen oder keinen.",
            ),
        },
    },
}


def fields(
    t: dict[str, Any], keys: list[str], overrides: dict[str, str] | None = None
) -> dict[str, Any]:
    """Return the labels and hints of these fields.

    overrides maps a field to another entry of "overrides" whose texts it uses.
    """
    overrides = overrides or {}
    data: dict[str, str] = {}
    hints: dict[str, str] = {}
    for key in keys:
        name, hint = (
            t["overrides"][overrides[key]] if key in overrides else t["fields"][key]
        )
        data[key] = name
        if hint:
            hints[key] = hint
    result: dict[str, Any] = {"data": data}
    if hints:
        result["data_description"] = hints
    return result


def form(title: str, description: str | None, block: dict[str, Any]) -> dict[str, Any]:
    """Return one step."""
    step: dict[str, Any] = {"title": title}
    if description:
        step["description"] = description
    return {**step, **block}


def overview_steps(t: dict[str, Any]) -> dict[str, Any]:
    """Return the overview and its variants that name what is missing."""
    o = t["overview"]
    block = {"data": {"categories": o["categories"]}}
    return {
        "user": form(o["title"], o["description"], block),
        "user_no_devices": form(
            o["title"], f"{o['description']}\n\n{o['no_devices']}", block
        ),
        "user_no_solar": form(
            o["title"], f"{o['description']}\n\n{o['no_solar']}", block
        ),
        "user_household_only": form(
            o["title"], f"{o['description']}\n\n{o['household_only']}", {}
        ),
    }


def household_step(t: dict[str, Any], title: str, description: str) -> dict[str, Any]:
    """Return the household's form."""
    return form(
        title,
        description,
        fields(t, ["standing_charge", "cheap_until", "expensive_from"]),
    )


def pv_steps(t: dict[str, Any]) -> dict[str, Any]:
    """Return the PV step and its variant without feed-in."""
    title = t["categories"]["pv"]
    block = fields(t, ["investment"])
    return {
        "pv": form(title, t["pv"]["description"], block),
        "pv_no_export": form(
            title, f"{t['pv']['no_export']}\n\n{t['pv']['description']}", block
        ),
    }


def meters_block(t: dict[str, Any], category: str) -> dict[str, Any]:
    """Return the fields of the first step of heat pump or electric car."""
    if category == "heat_pump":
        return fields(
            t,
            ["meters", "heat_meters", "heating", "investment"],
            {"investment": "heat_pump_investment"},
        )
    return fields(
        t,
        ["meters", "investment"],
        {"meters": "wallbox_meters", "investment": "wallbox_investment"},
    )


def heat_pump_values_steps(t: dict[str, Any], prefix: str) -> dict[str, Any]:
    """Return the values forms of the heat pump for gas and oil.

    prefix is heat_pump_values (setup), now, or before. The setup has variants
    with and without the seasonal COP, and with the date until which it
    estimates the heat.
    """
    steps: dict[str, Any] = {}
    for heating in ("gas", "oil"):
        price, entity = f"{heating}_price", f"{heating}_price_entity"
        if prefix == "heat_pump_values":
            variants = {
                "": [price, "tariff", entity],
                "_scop": [price, "scop", "tariff", entity],
                "_scop_until": [price, "scop", "tariff", entity],
            }
            title, description = t["values"]["title"], t["values"][heating]
        else:
            keys = [price, "scop", "tariff"]
            variants = {"": [*keys, entity] if prefix == "now" else keys}
            title, description = t[prefix]["title"], t[prefix]["description"]
        for suffix, keys in variants.items():
            overrides: dict[str, str] = {}
            if suffix == "_scop_until":
                overrides["scop"] = "scop_until"
            if prefix == "before":
                overrides["scop"] = "scop_before"
            if prefix == "now":
                overrides[entity] = f"now_{entity}"
            steps[f"{prefix}_{heating}{suffix}"] = form(
                title, description, fields(t, keys, overrides)
            )
    return steps


def wallbox_values_block(
    t: dict[str, Any], *, entity: bool, now: bool
) -> dict[str, Any]:
    """Return the fields of the car's values forms."""
    keys = ["ev_consumption", "combustion_consumption", "fuel_price", "tariff"]
    if entity:
        keys.append("fuel_price_entity")
    overrides = {"tariff": "wallbox_tariff"}
    if now:
        overrides["fuel_price_entity"] = "now_fuel_price_entity"
    return fields(t, keys, overrides)


def wallbox_values_step(t: dict[str, Any]) -> dict[str, Any]:
    """Return the car's values form of the setup."""
    return form(
        t["values"]["title"],
        t["values"]["wallbox"],
        wallbox_values_block(t, entity=True, now=False),
    )


def config_steps(t: dict[str, Any]) -> dict[str, Any]:
    """Return the steps of the first setup."""
    return {
        **overview_steps(t),
        "household": household_step(
            t, t["household"]["title"], t["household"]["description"]
        ),
        **pv_steps(t),
        "heat_pump": form(
            t["categories"]["heat_pump"], t["heat_pump"], meters_block(t, "heat_pump")
        ),
        **heat_pump_values_steps(t, "heat_pump_values"),
        "wallbox": form(
            t["categories"]["wallbox"], t["wallbox"], meters_block(t, "wallbox")
        ),
        "wallbox_values": wallbox_values_step(t),
    }


def menu(t: dict[str, Any], options: list[str]) -> dict[str, Any]:
    """Return the reconfigure menu."""
    return {
        "title": t["menu"]["title"],
        "menu_options": {option: t["menu"][option] for option in options},
    }


def subentry_steps(t: dict[str, Any], category: str) -> dict[str, Any]:
    """Return the steps of adding and changing a category."""
    recompute = form(t["recompute"]["title"], t["recompute"][category], {})
    if category == "pv":
        return {
            **pv_steps(t),
            "reconfigure": menu(t, ["investment", "recompute"]),
            "investment": form(
                t["investment"]["title"], None, fields(t, ["investment"])
            ),
            "recompute": recompute,
        }
    steps = {
        "user": form(t["categories"][category], t[category], meters_block(t, category)),
        "reconfigure": menu(t, ["now", "before", "meters", "recompute"]),
        "meters": form(
            t["meters"]["title"],
            t["meters"]["description"],
            meters_block(t, category),
        ),
        "recompute": recompute,
    }
    if category == "heat_pump":
        for prefix in ("heat_pump_values", "now", "before"):
            steps |= heat_pump_values_steps(t, prefix)
    else:
        steps["wallbox_values"] = wallbox_values_step(t)
        steps["now"] = form(
            t["now"]["title"],
            t["now"]["description"],
            wallbox_values_block(t, entity=True, now=True),
        )
        steps["before"] = form(
            t["before"]["title"],
            t["before"]["description"],
            wallbox_values_block(t, entity=False, now=False),
        )
    return steps


def build(t: dict[str, Any]) -> dict[str, Any]:
    """Return a complete translation file."""
    categories = ["pv", "heat_pump", "wallbox"]
    errors = t["errors"]
    aborts = t["aborts"]
    attributes = {key: {"name": name} for key, name in t["attributes"].items()}
    attributes["heating"]["state"] = t["heating"]
    return {
        "config": {
            "step": config_steps(t),
            "error": errors,
            "abort": {
                key: aborts[key]
                for key in (
                    "no_energy_dashboard",
                    "energy_interface",
                    "single_instance_allowed",
                )
            },
            "create_entry": {"default": t["create_entry"]},
        },
        "options": {
            "step": {
                "init": {
                    "title": t["options"]["title"],
                    "menu_options": {
                        "household": t["options"]["household"],
                        "recompute": t["recompute"]["title"],
                    },
                },
                "household": household_step(
                    t, t["options"]["household"], t["options"]["household_description"]
                ),
                "recompute": form(
                    t["recompute"]["title"], t["options"]["recompute"], {}
                ),
            },
            "error": {"levels_order": errors["levels_order"]},
            "abort": {
                "household_saved": aborts["household_saved"],
                "recomputing": aborts["recomputing_all"],
            },
        },
        "config_subentries": {
            category: {
                "entry_type": t["categories"][category],
                "initiate_flow": {"user": t["add"][category]},
                "step": subentry_steps(t, category),
                "error": errors,
                "abort": {
                    key: aborts[key]
                    for key in (
                        "energy_interface",
                        "already_configured",
                        "not_available",
                        "values_from",
                        "recomputing",
                        "investment_saved",
                    )
                },
            }
            for category in categories
        },
        "device": {
            "total": {"name": t["devices"]["total"]},
            **{
                category: {"name": t["categories"][category]} for category in categories
            },
        },
        "entity": {
            "sensor": {
                "saving": {
                    "name": t["entities"]["saving"],
                    "state_attributes": attributes,
                },
                "saving_per_year": {"name": t["entities"]["saving_per_year"]},
                **{
                    key: {
                        "name": t["entities"][key],
                        "state_attributes": {
                            attribute: {"name": name}
                            for attribute, name in names.items()
                        },
                    }
                    for key, names in t["figure_attributes"].items()
                },
            }
        },
        "exceptions": {
            key: {"message": message} for key, message in t["exceptions"].items()
        },
        "issues": {
            key: {"title": title, "description": description}
            for key, (title, description) in t["issues"].items()
        },
        "selector": {
            "categories": {"options": t["categories"]},
            "heating": {"options": t["heating"]},
            "statistics": {"options": t["statistics"]},
        },
    }


def main() -> None:
    """Write all translation files."""
    OUT.mkdir(parents=True, exist_ok=True)
    for language, texts in TEXTS.items():
        path = OUT / f"{language}.json"
        path.write_text(
            json.dumps(build(texts), ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )


if __name__ == "__main__":
    main()
