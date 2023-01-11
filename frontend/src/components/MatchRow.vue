
<template>
    <table class="w-full border-collapse border p-2 text-lg ">
        <tbody>
            <tr v-for="(job_alias, index) in Jobs"
            class="bg-white even:bg-gray-100 italic">
                <td class="py-3 pl-2">{{job_alias.organization}}</td>
                <td class="max-sm:hidden">{{job_alias.detail.category}}</td>
                <td class="max-sm:hidden">{{job_alias.detail.type}}</td>
                <td class="max-sm:hidden">{{job_alias.detail.shift}}</td>
                <td class="max-sm:hidden">{{job_alias.county}}</td>
                <td><button class="text-sm hover:text-sky-700"
                    @click="OpenPopup()">More Info</button></td>
                <td><button class="text-sm hover:text-red-700"
                    @click="RemoveRow(index)">Delete</button></td>
            </tr>
        
        </tbody>
    </table>    
    
    <div v-if="isOpen">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <div class="px-7 py-3">
                        <p class="text-sm text-gray-500">
                            More Info
                        </p>
                    </div>
                    <div class="items-center px-4 py-3">
                        <button class="bg-green-500 text-white rounded-md px-2 py-2 text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                        Edit
                        </button>
                    </div>
                    <div class="items-center px-4 py-3">
                        <button @click="ClosePopup()" class="bg-green-500 text-white rounded-md px-2 py-2 text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default{    
        methods: {
            OpenPopup(){
                this.isOpen = true;
            },
            ClosePopup(){
                this.isOpen = false;
            },
            RemoveRow(index){
                if (index > -1)
                    this.Jobs.splice(index, 1); 
            }
        },
        data() {
            return {
            isOpen: false,
            Jobs: [
                {
                    "id": 12345,
                    "organization": "Ross1",
                    "detail": {
                        "category": "Delivery",
                        "type": "Full-Time",
                        "shift": "Morning",
                        "pay": 20.0,
                        "benefits": "Paid time off",
                        "notes": "n/a",
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

