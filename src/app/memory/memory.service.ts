import { Injectable } from '@angular/core';
import { MemoryManagamentContiguous } from '@memory-logic/Strategy/classes/MemoryManagamentCon.class';

import { Program } from '@memory-logic/interfaces/Program.interface';
import { Process } from '@interfaces/Process.interface';

import { FixedPartitioning } from '@memory-logic/Strategy/classes/Contiguous/Fixed.class';
import { NoCompaction } from '@memory-logic/Strategy/classes/Contiguous/NoCompaction.class';
import { Compaction } from '@memory-logic/Strategy/classes/Contiguous/Compaction.class';

import { first_fit, worst_fit } from '@memory-logic/Strategy/common/common_functions';
import { dynamic_no_compaction, static_memory, variable_memory } from '@memory-logic/Strategy/common/memory_array';

import info from "./programas.json"

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  constructor() { }
  
  private _memoryContiguousManagament= new MemoryManagamentContiguous();
  private _currentTypePartition: string = '';
  private _inputRequired: boolean = false;
  private _currentPrograms: Program[] = info;
  private _currentFixedPartitions: number[] = [];
  private _currentName: string = '';
  private _currentSizePartition: number= 0;
  private _addNewProgram: boolean = true;

  chooseStrategy(): void{
    switch (this._currentTypePartition) {
      case '/static':
        if(this._currentSizePartition !== 0){
          const data_static: [Process[], number[]] = static_memory(this._currentSizePartition);
          this._currentFixedPartitions = data_static[1];
          this._memoryContiguousManagament.setTotalMemory();
          this._memoryContiguousManagament.setInitialMemory(data_static[0]);
          this._memoryContiguousManagament.setStrategies(new FixedPartitioning(first_fit,data_static[1]));
        }

        break;
      case '/variable/first-fit':
        const data_variable_ff: [Process[], number[]] = variable_memory();
        this._currentFixedPartitions = data_variable_ff[1];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setInitialMemory(data_variable_ff[0]);
        this._memoryContiguousManagament.setStrategies(new FixedPartitioning(first_fit,data_variable_ff[1]));

        break;
      case '/variable/worst-fit':
        const data_variable_wf: [Process[], number[]] = variable_memory();
        this._currentFixedPartitions = data_variable_wf[1];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setInitialMemory(data_variable_wf[0]);
        this._memoryContiguousManagament.setStrategies(new FixedPartitioning(worst_fit,data_variable_wf[1]));

        break;
      case '/variable/best-fit':
        const data_variable_bf: [Process[], number[]] = variable_memory();
        this._currentFixedPartitions = data_variable_bf[1];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setInitialMemory(data_variable_bf[0]);
        this._memoryContiguousManagament.setStrategies(new FixedPartitioning(worst_fit,data_variable_bf[1]));

        break;
      case '/dynamic-no-compaction/first-fit':
        const data_dynamic_ff: Process[] = dynamic_no_compaction();
        this._currentFixedPartitions = [];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setInitialMemory(data_dynamic_ff);
        this._memoryContiguousManagament.setStrategies(new NoCompaction(first_fit));

        break;
      case '/dynamic-no-compaction/worst-fit':
        const data_dynamic_wf: Process[] = dynamic_no_compaction();
        this._currentFixedPartitions = [];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setInitialMemory(data_dynamic_wf);
        this._memoryContiguousManagament.setStrategies(new NoCompaction(worst_fit));

        break;
      case '/dynamic-no-compaction/best-fit':
        const data_dynamic_bf: Process[] = dynamic_no_compaction();
        this._currentFixedPartitions = [];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setInitialMemory(data_dynamic_bf);
        this._memoryContiguousManagament.setStrategies(new NoCompaction(first_fit));

        break;

      case '/dynamic-compaction':
        this._memoryContiguousManagament.setInitialMemory(dynamic_no_compaction());
        this._currentFixedPartitions = [];
        this._memoryContiguousManagament.setTotalMemory();
        this._memoryContiguousManagament.setStrategies(new Compaction());
        break;

      default:
        break;
    }
  }


  setTypePartition(newTypePartition: string){
    this._currentTypePartition = newTypePartition;
    this.chooseStrategy();
  }

  setCurrentName(newName:string){
    this._currentName = newName;
  }

  setInputRequired(isRequired:boolean): void{
    this._inputRequired = isRequired;
  }

  setCurrentSizePartition(newSize: number):void{
    this._currentSizePartition = newSize;
  }
  
  setAddNewProgram(isAdding: boolean):void{
    this._addNewProgram = isAdding;
  }

  addProgramToChoose(newProgram: Program): void{
    this.Programs.push(newProgram);
  }

  addProgram(newProgram: Program): void{
    this._memoryContiguousManagament.addProgram(newProgram);
  }

  removeProcess(idProcess: string):void{
    this._memoryContiguousManagament.removeProcess(idProcess);
  }

  get Programs(): Program[]{
    return this._currentPrograms;
  }

  get Processes(): Process[]{
    return this._memoryContiguousManagament.Memory;
  }

  get Partitions(): number[]{
    return [...this._currentFixedPartitions];
  }

  get currentPartition(): string{
    return this._currentTypePartition;
  }

  get currentName(): string{
    return this._currentName;
  }

  get inputRequired(): boolean{
    return this._inputRequired;
  }

  get currentSizePartition(): number{
    return this._currentSizePartition;
  }

  get addNewProgram(): boolean{
    return this._addNewProgram;
}
}
