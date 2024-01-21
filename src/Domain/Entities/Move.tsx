export interface Move {
    accuracy:             null;
    contest_combos:       null;
    contest_effect:       null;
    contest_type:         null;
    damage_class:         DamageClass;
    effect_chance:        null;
    effect_changes:       any[];
    effect_entries:       EffectEntry[];
    flavor_text_entries:  FlavorTextEntry[];
    generation:           DamageClass;
    id:                   number;
    learned_by_pokemon:   DamageClass[];
    machines:             MachineElement[];
    meta:                 Meta;
    name:                 string;
    names:                Name[];
    past_values:          any[];
    power:                null;
    pp:                   number;
    priority:             number;
    stat_changes:         StatChange[];
    super_contest_effect: null;
    target:               DamageClass;
    type:                 DamageClass;
}

export interface DamageClass {
    name: string;
    url:  string;
}

export interface EffectEntry {
    effect:       string;
    language:     DamageClass;
    short_effect: string;
}

export interface FlavorTextEntry {
    flavor_text:   string;
    language:      DamageClass;
    version_group: DamageClass;
}

export interface MachineElement {
    machine:       MachineMachine;
    version_group: DamageClass;
}

export interface MachineMachine {
    url: string;
}

export interface Meta {
    ailment:        DamageClass;
    ailment_chance: number;
    category:       DamageClass;
    crit_rate:      number;
    drain:          number;
    flinch_chance:  number;
    healing:        number;
    max_hits:       null;
    max_turns:      null;
    min_hits:       null;
    min_turns:      null;
    stat_chance:    number;
}

export interface Name {
    language: DamageClass;
    name:     string;
}

export interface StatChange {
    change: number;
    stat:   DamageClass;
}
