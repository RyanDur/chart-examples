/*
 * BOEING PROPRIETARY - Copyright (c) 2019. All rights reserved.
 */

export interface DataModel {
  name: string;
  value: number;
}

export interface MultiDatModel {
  name: string;
  shift: string;
  series: DataModel[];
}

export interface Shift {
  APG: number;
  COMNAV: number;
  ELEN: number;
  HYDRO: number;
  IFCS: number;
  JETS: number;
  LEAVE: number;
}

export interface DayModel {
  day: string;
  nightShift: Shift;
  dayShift: Shift;
}
