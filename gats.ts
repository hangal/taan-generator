export enum Raags {
    GujriTodi,
    Bairagi,
    Bhairav,
    Bhoop,
    Durga,
    Bageshree,
    Multani,
    MianMalhar,
    AhirBhairav,
    BrindavaniSarang
}

export const gats = new Map([
[Raags.GujriTodi, `
H:Gujri Todi
B:16
S:9
H: sthayi
ddmd_mgm+SNd_mgrS
grdm+g+r{+S+r}{+g+r}{+SN}{dN}{+S+r}{+g+r}{SN}{dm}{gr}S
H: antara
{N+S}{dN}{md}{gm}{rg}{Sr}{gm}{dN}+S_Ndmd+S_
{md}{+g+r}{SN}{md}{+r+S}{Nd}{md}+S_N_d_m_g
`],

[Raags.Bairagi, `
H: Bairagi Bhairav
B: 16
S: 14
H: sthayi
{rS}{-nS}{rP}M__PMrrMSr-NS_
-P-n-P-nS_rSSrSrM_PMPnPn+S_+R_{+S+r}{Sn}{Pn}{PM}{rM}{Pn}{PM}{rS}
{rS}{-nS}{rP}M__PMrrS_
H: antara
{+S+r}{+Sn}{Pn}M{PP}nP+S__+r+S+rn+S_
+S+r+P+M+r+SSrPMrS_rMrMPMPnPn+Sn+S+R{+S+r}{Sn}{Pn}{PM}{rM}{Pn}{PM}{rS}_
`],

[Raags.Bhairav, `
H:Bhairav
B:16
S:9
H: sthayi
GMd_P_dMP_{MP}{dP}M_Gr
GGMrGMPPMGMGr_S_
SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG
H: antara
M_MMPPddPd+S_+SN+r+S
d_dN_N+S+SN_+S+r{+S+r}{+SN}dP}
GGMrGMPPMGMGr_S_
SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG
`],

[Raags.Bhoop, `
H:Bhoop (teentaal)
B:16
S:9
H:sthayi
D+SDPGRSRG_GRGPD_
GGGRGPD_+S_DPGRS_
H: antara
G_G_P_D_+S_+S_+S+R+S_
+G+R+SD+R+SDP+S_DPGRS_
H:Bhoop (ektaal)
B:12
S:1
H: sthayi
GRG_R_S-D-P-DSR
GRG_{GP}{DP}GRSDS_
-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}
H: antara
GGGPDPD+SD+S_+S
DDD+S+R+R{+S+R}+G+R{+S+R}{+SD}P
D{D+S}DPG{GP}GRS{SR}{S-D}{SR}
`],

[Raags.Durga, `
H:Durga gat number 1 (teentaal)
B:16
S:9
H: sthayi
SRRPPMPDD_MPMRS_
SRSRS-DS_D+SDPMRS_
H: antara
MMPD+SD+S_D+S+R+SDPM_
+M_+R+SDPMPDSDPMRS_
H:Durga gat number 2 (teentaal)
H: sthayi
SDPD_M_PD_MPMRS_
SRMPRMPD+S{DP}D{PM}P{MR}M{RS}
H: antara
MMPD+SD+S_D+S+R+S{D+S}{DP}M_
+M+R+SD+R+S+DP+S{DP}D{PM}P{MP}M{RS}
`],

[Raags.Bageshree, `
H:Bageshree gat number 1 (teentaal)
B:16
S:9
H: sthayi
MgRS-nS-D-nS_M_gRS_
-nSgMDnD_MPDMgRS_
H: antara
gMDnS_S_Dn+S+M+g+R+S_
+M+g+R+SDnDMMPDMgRS_
`],

[Raags.Multani, `
H:Multani (ektaal)
B:12
S:9
H: sthayi
mgmP{mP}{dP}mgrS_S
-N_Sg_mP_{Sg}{mP}{mg}{rS}
H: antara
PmPgmmPNN+S_+S
PN+S+g+r+SN+SNdPm
gmPN+SN{PN}{+SN}{dP}{mg}{rS}{-nS}
L:0.5
g_m_P_N_+S_N_PN+SNdPmgrS-nSPN+SNdPmgrS-nSPN+SNdPmgrS-nS
`],

[Raags.MianMalhar, `
H:Mian ki Malhar (mattataal)
B:9
S:7
H: sthayi
{-n-M}{-P-n}{-D-N}S{RR}P{gM}R{-nS}
{MR}{PM}{Pn}D{DN+S_}{nP}{nPMP}{gM}{RS}
H: antara
{MP}{MP}{DN}+S_{DN+S+R}{N+S}{Dn}{MP}
{+S+M+g+M}{+R+S}{DN}P{MPDN}+S{NP}{gM}{RS}
`],

[Raags.AhirBhairav, `
H:Ahir Bhairav (mattataal)
B:9
S:7
H: sthayi
{Gr}{Sn}{Sr}G{GMP_}M{GM}rS
{Sr}{GM}{PD}nD{+Sn}{DP}{MG}{rS}
H: antara
{DM}{PD}{n+r}+S{nD}{PM}{GMPM}{PDPD}{nDn+S}
{DN}{+S+S}{+r+G}{+G+r}{+S+S}{nD}{P+S}{nD}{PM}
H:Ahir Bhairav
B:16
S:6
H: sthayi
{rS}{-nS}{Gr}{Sr}{MG}{rG}{PM}{Gr}{S-n}{D-n}{Sr}G_GrS
{rS}{-nS}{Gr}{Sr}{MG}{rG}{PM}{Gr}{S-n}{D-n}{Sr}G_{D-n}{Sr}G{Sr}{GM}P{GM}{PD}n{PD}{n+S}+r{+r+S}n{nD}P{PM}G{Gr}S{Sn}D{DN}{Sr}G{DN}{Sr}G{DN}{Sr}G_GrS
H: antara
{rS}{-nS}{Gr}{Sr}{MG}{rG}{PM}{Gr}{S-n}{D-n}{Sr}GMPDn+R+S{nS}{Dn}{PD}{MP}{GM}{Sr}{GM}{PD}{n+R}+S_nDn+rS{Dn}{+Sr}+G{GM}{PD}n{Sr}{GM}P{-D-n}{Sr}{Gr}{Sr}G_{-D-n}{Sr}{Gr}{Sr}G_{-D-n}{Sr}{Gr}{Sr}G_GrS
`],

[Raags.BrindavaniSarang, `
H:Brindavani Sarang
B:10
S:1
H:sthayi
NNSS{N+S+R+S}n{PM}PR{MP}
MM{RM}{Pn}{MP}M_R-NS
M_{RS}{NS}{RM}P_nMP
MPN+SR{+S+R+Sn}{PnPM}{RMRS}{-nSRM}{PN+S+R}
H:antara
MMP{nP}N+S_{+RN}+S+S
N_+S_+R+S_NP{NP}
+R_+R_+M+R_N+S+S
MPN+S+RN+SnMP
MPN+S+R{+S+R+Sn}{PnPM}{RMRS}{-nSRM}{PN+S+R}
`]]);
