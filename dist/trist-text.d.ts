declare type IdFactory = (n: number) => string;
declare type Splitted = {
    id: string;
    leader: string;
};
declare namespace TristText {
    function textToChain(text: string, fnNextId: (index: number) => string): Trist.Chain;
}
