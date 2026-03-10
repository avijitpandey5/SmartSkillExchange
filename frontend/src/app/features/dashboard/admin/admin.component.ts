import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in space-y-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">HR & Admin Management Panel</h2>
          <p class="text-gray-500 mt-1">Monitor platform activity, users, and skill distribution.</p>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <span class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Users</span>
            <span class="text-4xl font-bold text-gray-800 mt-2">1,248</span>
         </div>
         <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <span class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Active Sessions</span>
            <span class="text-4xl font-bold text-primary mt-2">342</span>
         </div>
         <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <span class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Credits Flowing</span>
            <span class="text-4xl font-bold text-green-500 mt-2">12,400 ♦</span>
         </div>
         <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <span class="text-sm text-gray-500 font-semibold uppercase tracking-wider">Reported Issues</span>
            <span class="text-4xl font-bold text-red-500 mt-2">3</span>
         </div>
      </div>
      
      <!-- User List Mockup -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
         <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-gray-800 text-lg">System Users</h3>
            <button class="text-sm text-primary font-medium bg-blue-50 px-4 py-2 rounded shadow-sm hover:bg-primary hover:text-white transition">Export CSV</button>
         </div>
         <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
               <thead>
                  <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                     <th class="p-4 border-b font-medium">Name</th>
                     <th class="p-4 border-b font-medium">Role</th>
                     <th class="p-4 border-b font-medium text-center">Credits</th>
                     <th class="p-4 border-b font-medium text-center">Status</th>
                     <th class="p-4 border-b font-medium text-right">Actions</th>
                  </tr>
               </thead>
               <tbody class="text-sm">
                  <tr class="hover:bg-gray-50 transition border-b border-gray-100">
                     <td class="p-4 font-semibold text-gray-800">John Doe</td>
                     <td class="p-4"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">LEARNER</span></td>
                     <td class="p-4 text-center font-bold">5</td>
                     <td class="p-4 text-center"><span class="w-3 h-3 bg-green-500 rounded-full inline-block"></span> Active</td>
                     <td class="p-4 text-right">
                        <button class="text-gray-400 hover:text-primary mr-3">Edit</button>
                        <button class="text-red-400 hover:text-red-600">Suspend</button>
                     </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition border-b border-gray-100">
                     <td class="p-4 font-semibold text-gray-800">Alice Expert</td>
                     <td class="p-4"><span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">MENTOR</span></td>
                     <td class="p-4 text-center font-bold">24</td>
                     <td class="p-4 text-center"><span class="w-3 h-3 bg-green-500 rounded-full inline-block"></span> Active</td>
                     <td class="p-4 text-right">
                        <button class="text-gray-400 hover:text-primary mr-3">Edit</button>
                        <button class="text-red-400 hover:text-red-600">Suspend</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
