 
<template>
    <!--Rows-->
    <table class="w-full border-collapse border p-2 text-xl max-md:text-lg">
        <tbody>
            <tr v-for= "(row, index) in Jobs"
            class="bg-white even:bg-gray-100 italic text-center">
                <td class="py-4 pl-2">{{row.organization}}</td>
                <td class="max-md:hidden">{{row.detail.category}}</td>
                <td class="max-md:hidden">{{row.detail.type}}</td>
                <td class="max-md:hidden">{{row.detail.shift}}</td>
                <td class="max-md:hidden">{{row.county}}</td>
                
                <td><button class="text-sm bg-accentLight text-white rounded-md px-1 py-1 
                hover:bg-accentDark focus:outline-none focus:ring-2 focus:ring-purple-300"
                @click="OpenPopupMI(row)">More Info</button></td>
                
                <td><button class="text-sm bg-red-500 text-white rounded-md px-1 py-1 
                hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                @click="OpenPopupDEL(index)">Delete</button></td>
            </tr>
        </tbody>
    </table>

    <!--More Info Popup-->    
    <modal v-if="IsOpenMI">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <div class="mt-2 px-7 py-3">
                        <p class="text-xl text-gray-500">
                            More Information:
                        </p>
                            <div class="bg-white text-left italic font-bold text-gray-700">
                                <p class="pt-2">Organization: <span class="font-normal">{{SelectedJob.organization}}</span></p>
                                <p class="">Category: <span class="font-normal">{{SelectedJob.detail.category}}</span></p>
                                <p class="">Type: <span class="font-normal">{{SelectedJob.detail.type}}</span></p>
                                <p class="">Shift: <span class="font-normal">{{SelectedJob.detail.shift}}</span></p>
                                <p class="">Pay: <span class="font-normal">{{SelectedJob.detail.pay}}</span></p>
                                <p class="">Benefits: <span class="font-normal">{{SelectedJob.detail.benefits}}</span></p>
                                <p class="">Notes: <span class="font-normal">{{SelectedJob.detail.notes}}</span></p>
                                <p class="">Address: <span class="font-normal">{{SelectedJob.address}}</span></p>
                                <p class="">City: <span class="font-normal">{{SelectedJob.city}}</span></p>
                                <p class="">County: <span class="font-normal">{{SelectedJob.county}}</span></p>
                            </div>
                    </div>
                    <div class="items-center px-4 py-3">
                        <button @click="ClosePopupMI()" class="bg-accentLight text-white rounded-md px-2 py-2 text-sm hover:bg-accentDark focus:outline-none focus:ring-2 focus:ring-purple-300">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </modal>

    <!--Delete Popup-->    
    <modal v-if="IsOpenDEL">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <div class="mt-2 px-7 py-3">
                        <p class="text-xl text-gray-500">
                            Delete this row?
                        </p>
                    </div>
                    <div class="flex justify-center">
                        <div class="items-center px-4 py-3">
                            <button @click="RemoveRow()" 
                            class="bg-red-500 text-white rounded-md px-2 py-2 text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                            Delete
                            </button>
                        </div>
                        <div class="items-center px-4 py-3">
                            <button @click="ClosePopupDEL()" 
                            class="bg-accentLight text-white rounded-md px-2 py-2 text-sm hover:bg-gaccentDark focus:outline-none focus:ring-2 focus:ring-purple-300">
                            Close
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </modal>
</template>
 
<script>
    export default{    
        methods: {
            OpenPopupMI(item){
                this.IsOpenMI = true;
                this.SelectedJob = item;
            },
            ClosePopupMI(){
                this.IsOpenMI = false;
            },
            OpenPopupDEL(index){
                this.SelectedIndex = index
                this.IsOpenDEL = true;
            },
            ClosePopupDEL(){
                this.IsOpenDEL = false;
            },
            RemoveRow(){
                console.log(this.SelectedIndex);
                this.IsOpenDEL = false;
                if (this.SelectedIndex > -1)
                    this.Jobs.splice(this.SelectedIndex, 1);
            }
        },
        data() {
            return {
            IsOpenMI: false,
            IsOpenDEL: false,
            SelectedJob: {},
            SelectedIndex: -1,
            Jobs: [
                //for testing
                {
                    "id": 12345,
                    "organization": "Ross1",
                    "detail": {
                        "category": "Delivery",
                        "type": "Full-Time",
                        "shift": "Morning",
                        "pay": 20.0,
                        "benefits": "Paid time off",
                        "notes": "a brief record of something written down to assist the memory or for future reference. notes, a record or outline of a speech, statement, testimony, etc.",
                    },
                    "address": "123 Main st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
                {
                    "id": 54321,
                    "organization": "Vet Test2",
                    "detail": {
                        "category": "Clerk",
                        "type": "Part-Time",
                        "shift": "Afternoon",
                        "pay": 18.0,
                        "benefits": "Health insurance",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Hillsboro",
                    "county": "Washington",
                },
                {
                    "id": 1,
                    "organization": "Store Test3",
                    "detail": {
                        "category": "Sales",
                        "type": "Part-Time",
                        "shift": "Evening",
                        "pay": 15.75,
                        "benefits": "",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
                {
                    "id": 1,
                    "organization": "Store Test4",
                    "detail": {
                        "category": "Sales",
                        "type": "Part-Time",
                        "shift": "Evening",
                        "pay": 15.75,
                        "benefits": "",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
                {
                    "id": 1,
                    "organization": "Store Test5",
                    "detail": {
                        "category": "Sales",
                        "type": "Part-Time",
                        "shift": "Evening",
                        "pay": 15.75,
                        "benefits": "",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
                {
                    "id": 1,
                    "organization": "Store Test6",
                    "detail": {
                        "category": "Sales",
                        "type": "Part-Time",
                        "shift": "Evening",
                        "pay": 15.75,
                        "benefits": "",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
            ]
        }
    },
}
</script>
 
<style>
</style>
