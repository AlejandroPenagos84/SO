import { MemoryManagamentContiguous } from "@app/MemoryManagmentLogic/Strategy/classes/MemoryManagamentCon.class"
import { MemoryManagamentDiscontiguous } from "@app/MemoryManagmentLogic/Strategy/classes/MemoryManagmentDis.class";

import { Program } from "@interfaces/Program.interface";
import { Process } from "@interfaces/Process.interface";

import { first_fit, worst_fit, best_fit } from "./Strategy/common/common_functions";

import { dynamic_no_compaction, paging_memory, segmentation_memory, static_memory, variable_memory } from "@app/MemoryManagmentLogic/memory_array";

import { FixedPartitioning } from "@app/MemoryManagmentLogic/Strategy/classes/Contiguous/Fixed.class";
import { NoCompaction } from "@app/MemoryManagmentLogic/Strategy/classes/Contiguous/NoCompaction.class";
import { Compaction } from "./Strategy/classes/Contiguous/Compaction.class";
import { Segmentation } from "./Strategy/classes/Discontiguous/Segmentation.class";
import { UnitMemory } from "./interfaces/UnitMemory.interface";
import { Paging } from "./Strategy/classes/Discontiguous/Paging.class";



export class FacadeMemory{
    private memoryContiguousManagement = new MemoryManagamentContiguous();
    private memoryDiscontiguousManagement = new MemoryManagamentDiscontiguous();

    public addProcessContigousMemory(newProgram: Program): boolean{
        return this.memoryContiguousManagement.addProgram(newProgram);
    }

    public addProcessDiscontigousMemory(newProgram: Program): boolean{
        return this.memoryDiscontiguousManagement.addProgram(newProgram);
    }

    public removeProcessContigousMemory(idProcess: string): boolean{
        return this.memoryContiguousManagement.removeProcess(idProcess);
    }

    public removeProcessDiscontigousMemory(idUnitMemory: string): boolean{
        return this.memoryDiscontiguousManagement.removeProcess(idUnitMemory);
    }

    public getContigousMemory(): Process[]{
        return this.memoryContiguousManagement.Memory;
    }

    public getDiscontigousMemory(): UnitMemory[]{
        return this.memoryDiscontiguousManagement.Memory;
    }

    public getFixedPartitions(): number[]{
        return this.memoryContiguousManagement.getCurrentFixedPartitions();
    }

    public getNumberPagingArray(): number[]{
        return this.memoryDiscontiguousManagement.getNumberPagingArray();
    }

    public configure(curretTypePartition: string, sizePartition: number) {
        // Obtener el diccionario de acciones
        const actions = this.getPartitionActions(sizePartition);
        
        // Ejecutar la acción correspondiente
        if (actions[curretTypePartition]) {
            actions[curretTypePartition]();  // Invoca la función correspondiente
        } else {
            console.log("Tipo de partición no reconocido");
        }
    }

    private getPartitionActions(sizePartition: number): { [key: string]: () => void } {
        return {
            'static': () => this.setStaticStrategy(sizePartition),
            'variable_first-fit': () => this.setVariableStrategy(first_fit),
            'variable_worst-fit': () => this.setVariableStrategy(worst_fit),
            'variable_best-fit': () => this.setVariableStrategy(best_fit),
            'no-compaction_first-fit': () => this.setNoCompactionStrategy(first_fit),
            'no-compaction_worst-fit': () => this.setNoCompactionStrategy(worst_fit),
            'no-compaction_best-fit': () => this.setNoCompactionStrategy(best_fit),
            'compaction': () => this.setCompactionStrategy(),
            'segmentation_first-fit': () => this.setSegmentationStrategy(first_fit, sizePartition),
            'segmentation_worst-fit': () => this.setSegmentationStrategy(worst_fit, sizePartition),
            'segmentation_best-fit': () => this.setSegmentationStrategy(best_fit, sizePartition),
            'paging': () => this.setPagingStrategy(sizePartition)
        };
    }

    private setStaticStrategy(sizePartition: number):void{
        const[memory, fixedPartition] = static_memory(sizePartition);
        this.memoryContiguousManagement.setInitialMemory(memory);
        this.memoryContiguousManagement.setStrategies(new FixedPartitioning(first_fit,fixedPartition));
        this.memoryContiguousManagement.setTotalMemory();
        this.memoryContiguousManagement.setCurrextFixedPartitions(fixedPartition);
    }

    private setVariableStrategy(fit: (memory: Process[], memory_process: number) => number):void{
        const[memory, fixedPartition] = variable_memory();
        this.memoryContiguousManagement.setInitialMemory(memory);
        this.memoryContiguousManagement.setTotalMemory();
        this.memoryContiguousManagement.setStrategies(new FixedPartitioning(fit,fixedPartition));
        this.memoryContiguousManagement.setCurrextFixedPartitions(fixedPartition);
    }

    private setNoCompactionStrategy(fit: (memory: Process[], memory_process: number) => number):void{
        this.memoryContiguousManagement.setInitialMemory(dynamic_no_compaction());
        this.memoryContiguousManagement.setTotalMemory();
        this.memoryContiguousManagement.setStrategies(new NoCompaction(fit));
    }

    private setCompactionStrategy(){
        this.memoryContiguousManagement.setInitialMemory(dynamic_no_compaction());
        this.memoryContiguousManagement.setTotalMemory();
        this.memoryContiguousManagement.setStrategies(new Compaction);
    }

    private setSegmentationStrategy(fit: (memory: UnitMemory[], memory_process: number) => number,offset: number){;
        this.memoryDiscontiguousManagement.setInitialMemory(segmentation_memory());
        this.memoryDiscontiguousManagement.setTotalMemory(15728640);
        this.memoryDiscontiguousManagement.setStrategies(new Segmentation(fit));
        this.memoryDiscontiguousManagement.setOffset(offset);
    }

    private setPagingStrategy(offset: number):void{
        const[memory, numberPagingArray] = paging_memory(offset);
        this.memoryDiscontiguousManagement.setInitialMemory(memory);
        this.memoryDiscontiguousManagement.setTotalMemory(16777216);
        this.memoryDiscontiguousManagement.setStrategies(new Paging(numberPagingArray));
        this.memoryDiscontiguousManagement.setOffset(offset);
        this.memoryDiscontiguousManagement.setNumberPagingArray(numberPagingArray);

        const SO: Program = {
            id: 'SO',
            key:999,
            name: 'SO',
            bss: 0,
            data: 0,
            txt: 1048576
          }

          this.memoryDiscontiguousManagement.addProgram(SO);
    }
}